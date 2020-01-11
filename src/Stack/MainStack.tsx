import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../Screens/MainScreen';
import ListScreen from '../Screens/ListScreen';
import CreateScreen from '../Screens/CreateScreen';
import {RootTabParam} from '../typings/NavigatorTypes';

const {Navigator, Screen} = createStackNavigator<RootTabParam>();

const MainStack = () => {
  return (
    <Navigator>
      <Screen
        name={'Main'}
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name={'List'}
        options={{
          title: 'Транспортнi засоби',
        }}
        component={ListScreen}
      />
      <Screen
        name={'Create'}
        options={{
          title: 'Прибуття ТЗ',
        }}
        component={CreateScreen}
      />
    </Navigator>
  );
};

export default MainStack;
