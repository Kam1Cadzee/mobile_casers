/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import MainStack from './src/Stack/MainStack';
import {NavigationNativeContainer} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {changeSnackbar, getTransportData} from './src/redux-data/transport';

const App = () => {
  const snackbar = useSelector(getTransportData).snackbar;
  const dispatch = useDispatch();

  return (
    <NavigationNativeContainer>
      <MainStack />
      <Snackbar
        visible={snackbar !== ''}
        onDismiss={() => dispatch(changeSnackbar(''))}
        duration={5000}>
        {snackbar}
      </Snackbar>
    </NavigationNativeContainer>
  );
};

export default App;
