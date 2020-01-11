import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import {MainScreenProp} from '../typings/NavigatorTypes';

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  button: {
    width: '80%',
    marginBottom: 16,
  },
});

const MainScreen = ({navigation}: MainScreenProp) => {
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={'#0277bd'} />
      <Button
        icon="view-list"
        style={styles.button}
        onPress={() => navigation.navigate('List')}>
        Транспортні засоби
      </Button>

      <Button
        icon="car"
        style={styles.button}
        onPress={() => navigation.navigate('Create')}>
        Новий ТЗ
      </Button>
    </View>
  );
};

export default MainScreen;
