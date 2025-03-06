/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import {View} from 'react-native';
import {store} from './src/redux/Store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <AppNavigator />
      </View>
    </Provider>
  );
}

export default App;
