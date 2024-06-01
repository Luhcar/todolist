import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { getData } from './storages/localStorage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplash, setSplash] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2500);

    getData('auth').then(async res => {
      if (res) {
        setIsLogin(true);
      }
    });
  });

  return (
    <NavigationContainer initialRouteName="SplashScreen">
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
