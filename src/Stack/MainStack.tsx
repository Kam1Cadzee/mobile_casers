import React from 'react';
import MainScreen from '../Screens/MainScreen';
import ListScreen from '../Screens/ListScreen';
import CreateScreen from '../Screens/CreateScreen';
import {createStackNavigator} from 'react-navigation-stack';

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    List: {
      screen: ListScreen,
      navigationOptions: {
        title: 'Транспортнi засоби',
      },
    },

    Create: {
      screen: CreateScreen,
      navigationOptions: {
        title: 'Прибуття ТЗ',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0277bd',
      },
      headerTintColor: '#fff',
    },
  },
);

export default MainStack;
