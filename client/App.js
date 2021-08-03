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
import Library from './src/screens/Library'
import EbookReader from './src/screens/EbookReader'
import SandpaperLetter from './src/activity/SandpaperLetters';
import A1p1 from './src/activity/phase/A1p1'
import A1p2 from './src/activity/phase/A1p2'
import A1p3 from './src/activity/phase/A1p3'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="A1p3" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShelfDetail" component={ShelfDetail} />
          <Stack.Screen name="Classroom" component={Classroom} />
          <Stack.Screen name="ParentRoom" component={ParentRoom} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Library" component={Library} />
          <Stack.Screen name="EbookReader" component={EbookReader} />
          <Stack.Screen name="SandpaperLetters" component={SandpaperLetter} />
          <Stack.Screen name="A1p1" component={A1p1} />
          <Stack.Screen name="A1p2" component={A1p2} />
          <Stack.Screen name="A1p3" component={A1p3} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} /> 
    </Provider>
  );
}
