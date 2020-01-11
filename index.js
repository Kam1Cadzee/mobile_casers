/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from './src/redux-data/store';
import {useNetInfo} from '@react-native-community/netinfo';
import asyncStorage from './src/services/asyncStorage';

const store = configureStore();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0277bd',
    accent: '#ffa000',
  },
};

export default function Main() {
  const {isInternetReachable} = useNetInfo();

  useEffect(() => {
    if (isInternetReachable) {
      const save = async () => {
        await asyncStorage.fetchData(store.dispatch);
      };
      save();
    }
  }, [isInternetReachable]);

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </ReduxProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
