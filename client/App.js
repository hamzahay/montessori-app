import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import store from './src/store'
import WelcomePage from './src/screens/WelcomePage'
import Home from './src/screens/Home'
import ShelfDetail from './src/screens/ShelfDetail'
import Classroom from './src/screens/Classroom'
import ParentRoom from './src/screens/ParentRoom'
import Auth from './src/screens/Auth'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShelfDetail" component={ShelfDetail} />
          <Stack.Screen name="Classroom" component={Classroom} />
          <Stack.Screen name="ParentRoom" component={ParentRoom} />
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
