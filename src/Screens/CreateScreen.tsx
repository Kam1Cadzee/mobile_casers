import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {CreateScreenProp} from '../typings/NavigatorTypes';
import {IDevice, ITransport} from '../typings/ITransport';
import {useForm, Controller} from 'react-hook-form';
import service from '../services/service';
import {
  Button,
  TextInput,
  Text,
  Switch,
  Paragraph,
  IconButton,
  Colors,
  Title,
  Subheading,
  useTheme,
} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import asyncStorage from '../services/asyncStorage';
import {useDispatch} from 'react-redux';
import {changeSnackbar} from '../redux-data/transport';

const PButton: any = Button;

const styles = StyleSheet.create({
  con: {
    padding: 8 * 2,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  textInput: {
    marginBottom: 8,
  },
  devices: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },

  device: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  input: {
    flexGrow: 1,
    marginBottom: 8,
    marginLeft: 16,
  },
  switch: {
    marginLeft: 16,
    marginRight: 16,
  },
  icon: {
    position: 'absolute',
    right: 80,
    zIndex: 100,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
  },
});
const CreateScreen = ({navigation}: any) => {
  const {colors} = useTheme();
  const id =
    navigation.state && navigation.state.params && navigation.state.params.id;
  const dispatch = useDispatch();
  const [data, setData] = useState(null as ITransport | null);
  const [devices, setDevices] = useState([] as IDevice[]);
  const {handleSubmit, control} = useForm<ITransport>();

  const onSubmit = async (values: ITransport) => {
    const obj: ITransport = {
      status: 'arrived',
      devices: devices.filter(device => device.number.trim() !== ''),
      ...values,
    };

    navigation.navigate('Main');

    const res = await NetInfo.fetch();
    let isInternet = true;

    if (res.isInternetReachable) {
      try {
        if (id) {
          await service.updateTransport(id, obj);
        } else {
          await service.addTransport(obj);
        }
      } catch (e) {
        isInternet = false;
      }
    } else {
      isInternet = false;
    }

    if (isInternet) {
      dispatch(
        changeSnackbar(
          `Дані по транспорту ${obj.number_transport} відправленні`,
        ),
      );
    } else {
      await asyncStorage.saveData(id, obj);
      return dispatch(
        changeSnackbar(
          'Дані будуть відправленні, коли пристрій буде підключено до мережі',
        ),
      );
    }
  };

  const onAddDevice = () => {
    setDevices([
      ...devices,
      {
        number: '',
        damaged: false,
      },
    ]);
  };

  const onDeleteDevice = (index: number) => {
    setDevices(devices.filter((item, i) => i !== index));
  };

  const onChange = (args: any) => {
    return {
      value: args[0].nativeEvent.text || args[0].nativeEvent.value,
    };
  };

  useEffect(() => {
    if (id) {
      service.getTransport(id).then((res: ITransport) => {
        setData(res);
        setDevices(res.devices);
      });
    } else {
      setData({} as any);
    }
  }, [id]);

  if (!data) {
    return <View />;
  }
  return (
    <View style={styles.con}>
      <ScrollView>
        <Controller
          as={
            <TextInput
              label={'Номер ТЗ'}
              style={styles.textInput}
              disabled={!!id}
            />
          }
          control={control}
          name="number_transport"
          onChange={onChange}
          rules={{required: true}}
          defaultValue={data.number_transport}
        />
        <Controller
          as={
            <TextInput
              label={'Номер Причiпа'}
              style={styles.textInput}
              disabled={!!id}
            />
          }
          control={control}
          name="number_trailer"
          onChange={onChange}
          rules={{required: true}}
          defaultValue={data.number_trailer}
        />

        <Controller
          as={
            <TextInput
              label={'Водiй'}
              style={styles.textInput}
              disabled={!!id}
            />
          }
          control={control}
          name="driver"
          onChange={onChange}
          rules={{required: true}}
          defaultValue={data.driver}
        />
        <View style={styles.devices}>
          <Title>{id ? 'Пошкодження' : 'Добавити ЗПУ'}</Title>
          {devices.map((device, index) => {
            return (
              <View style={styles.device}>
                {id ? (
                  <Subheading style={styles.input}>{device.number}</Subheading>
                ) : (
                  <>
                    <TextInput
                      style={styles.input}
                      label={`ЗПУ №${index + 1}`}
                      value={device.number}
                      onChangeText={text => {
                        devices[index].number = text;
                        setDevices([...devices]);
                      }}
                    />
                    <IconButton
                      style={styles.icon}
                      icon="delete-circle"
                      size={34}
                      onPress={() => onDeleteDevice(index)}
                    />
                  </>
                )}
                <Switch
                  style={styles.switch}
                  value={!device.damaged}
                  onValueChange={() => {
                    devices[index].damaged = !devices[index].damaged;
                    setDevices([...devices]);
                  }}
                />
              </View>
            );
          })}
          {!id && (
            <IconButton
              icon="plus"
              size={28}
              color={colors.accent}
              onPress={onAddDevice}
            />
          )}
        </View>
        <PButton mode="contained" onPress={handleSubmit(onSubmit)}>
          Вiдправити
        </PButton>
      </ScrollView>
    </View>
  );
};

export default CreateScreen;
