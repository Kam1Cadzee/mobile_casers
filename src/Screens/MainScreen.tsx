import React from 'react';
import {View, StyleSheet} from 'react-native';
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
      <Button
        style={styles.button}
        icon="view-list"
        mode="contained"
        onPress={() => navigation.navigate('List')}>
        Транспортні засоби
      </Button>

      <Button
        style={styles.button}
        icon="car"
        mode="contained"
        onPress={() => navigation.navigate('Create')}>
        Новий ТЗ
      </Button>
    </View>
  );
};

export default MainScreen;
