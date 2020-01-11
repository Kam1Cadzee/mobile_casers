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
import {Snackbar, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {changeSnackbar, getTransportData} from './src/redux-data/transport';
import {createAppContainer} from 'react-navigation';

const NavigationContainer = createAppContainer(MainStack);

const App = () => {
  const {colors} = useTheme();
  const snackbar = useSelector(getTransportData).snackbar;
  const dispatch = useDispatch();

  return (
    <>
      <NavigationContainer />
      <Snackbar
        style={{
          backgroundColor: colors.primary,
        }}
        visible={snackbar !== ''}
        onDismiss={() => dispatch(changeSnackbar(''))}
        duration={5000}>
        {snackbar}
      </Snackbar>
    </>
  );
};

export default App;
