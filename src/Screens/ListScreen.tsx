import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, ActivityIndicator} from 'react-native';
import {IconButton, List, Searchbar, Title, useTheme} from 'react-native-paper';
import {ListScreenProp} from '../typings/NavigatorTypes';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {getTransportData, getTransportsFetch} from '../redux-data/transport';

const styles = StyleSheet.create({
  con: {
    position: 'relative',
    flexGrow: 1,
  },
  btn: {
    position: 'absolute',
    right: 0,
    zIndex: 100,
  },
});

const NoInternet = () => {
  const netInfo = useNetInfo();
  const {error} = useSelector(getTransportData);

  if (!netInfo.isInternetReachable) {
    return (
      <Title style={{textAlign: 'center'}}>Немає підключення до мережі</Title>
    );
  } else if (error) {
    return <Title style={{textAlign: 'center'}}>{error}</Title>;
  } else {
    return null;
  }
};

const ListScreen = ({navigation}: ListScreenProp) => {
  const {colors} = useTheme();
  const {data: items, isLoading} = useSelector(getTransportData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isInternetReachable) {
      dispatch(getTransportsFetch());
    }
  }, [dispatch, netInfo.isInternetReachable]);

  const filterData = items.filter(
    item =>
      item.number_transport.toLowerCase().indexOf(search.toLowerCase()) !== -1,
  );

  const handlePress = (id: string | null) => {
    navigation.navigate('Create', {
      id,
    });
  };

  return (
    <View style={styles.con}>
      <Searchbar
        iconColor={colors.primary}
        placeholder="Пошук"
        onChangeText={query => setSearch(query)}
        value={search}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        items.length === 0 && <NoInternet />
      )}
      <ScrollView style={{flexGrow: 1}}>
        {filterData.length > 0 &&
          filterData.map(item => {
            const desc = `Driver: ${item.driver}, Trailer: ${
              item.number_trailer
            }, К-сть ЗПУ: ${item.devices.length}`;

            return (
              <List.Item
                key={item.id}
                onPress={() => handlePress(item.id)}
                title={item.number_transport}
                description={desc}
                left={() => <List.Icon icon="car" color={colors.primary} />}
              />
            );
          })}
      </ScrollView>

      <IconButton
        color={colors.accent}
        style={{...styles.btn, bottom: 0}}
        icon="plus-circle"
        size={60}
        onPress={() => handlePress(null)}
      />
    </View>
  );
};

export default ListScreen;
