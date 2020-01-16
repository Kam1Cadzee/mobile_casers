import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {CreateScreenProp} from '../typings/NavigatorTypes';
import {IDevice, ITransport} from '../typings/ITransport';
import {useForm, Controller} from 'react-hook-form';
import service from '../services/service';
import {
  Button,
  TextInput,
  Switch,
  IconButton,
  Title,
  Subheading,
  useTheme,
} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import asyncStorage from '../services/asyncStorage';
import {useDispatch} from 'react-redux';
import {changeSnackbar} from '../redux-data/transport';

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
  const [id, setId] = useState(
    navigation.state && navigation.state.params && navigation.state.params.id,
  );
  const dispatch = useDispatch();
  const [number_transport, setNumber_transport] = useState('');
  const [number_trailer, setNumber_trailer] = useState('');
  const [driver, setDriver] = useState('');

  const [devices, setDevices] = useState([] as IDevice[]);

  const onSubmit = async () => {
    if (!validate()) return;

    const obj = {
      status: 'arrived',
      devices: devices.filter(device => device.number.trim() !== ''),
      number_transport,
      number_trailer,
      driver,
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

  const onBlur = async () => {
    if (number_transport) {
      const res = await service.getTransportByNumber(number_transport);
      if (res) {
        setData(res);
      }
    }
  };

  const validate = () => {
    const device = devices.reduce(
      (previousValue, currentValue) => previousValue + currentValue.number,
      '',
    );

    if (
      device === '' ||
      number_trailer === '' ||
      number_transport === '' ||
      driver === ''
    ) {
      dispatch(changeSnackbar('Заповніть всі дані'));
      return false;
    }

    return true;
  };
  const setData = (res: ITransport) => {
    setNumber_transport(res.number_transport);
    setNumber_trailer(res.number_trailer);
    setDriver(res.driver);
    setDevices(res.devices);
    setId(res.id);
  };

  useEffect(() => {
    if (id) {
      service.getTransport(id).then((res: ITransport) => {
        setData(res);
      });
    }
  }, []);

  return (
    <View style={styles.con}>
      <ScrollView>
        <TextInput
          label={'Номер ТЗ'}
          style={styles.textInput}
          disabled={!!id}
          onBlur={onBlur}
          onChangeText={text => setNumber_transport(text)}
          value={number_transport}
        />
        <TextInput
          label={'Номер Причiпа'}
          style={styles.textInput}
          disabled={!!id}
          onChangeText={text => setNumber_trailer(text)}
          value={number_trailer}
        />
        <TextInput
          label={'Водiй'}
          style={styles.textInput}
          disabled={!!id}
          onChangeText={text => setDriver(text)}
          value={driver}
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
                      color={colors.primary}
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
        <Button mode="contained" onPress={onSubmit}>
          Вiдправити
        </Button>
      </ScrollView>
    </View>
  );
};

export default CreateScreen;
