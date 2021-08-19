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
import SandpaperLetters from './src/activity/SandpaperLetters';
import LargeMoveableAlphabet from './src/activity/LargeMoveableAlphabet'
import ObjectMoveableAlphabet from './src/activity/ObjectMoveableAlphabet';
import MoveableAlphabet from './src/components/MoveableAlphabet'
import ReadingWords from './src/activity/ReadingWords';

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
          <Stack.Screen name="Library" component={Library} />
          <Stack.Screen name="EbookReader" component={EbookReader} />
          <Stack.Screen name="SandpaperLetters" component={SandpaperLetters} />
          <Stack.Screen name="LargeMoveableAlphabet" component={LargeMoveableAlphabet} />
          <Stack.Screen name="ObjectMoveableAlphabet" component={ObjectMoveableAlphabet} />
          <Stack.Screen name="MoveableAlphabet" component={MoveableAlphabet} />
          <Stack.Screen name="ReadingWords" component={ReadingWords} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} /> 
    </Provider>
  );
}
