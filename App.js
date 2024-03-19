import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {store} from './store';
import {Provider} from 'react-redux';

import Home from './src/Home';
import Results from './src/Results';
import colors from './config/colors';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false, animationEnabled: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Results" component={Results} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
