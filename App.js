import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';  // หน้า Home
import OTPScreen from './screens/OTPScreen';    // หน้า OTP
import LoginScreen from './screens/LoginScreen'; // หน้า Login
import RegisterScreen from './screens/RegisterScreen'; // หน้า Register
import INsideHomeScreen from './screens/INsideHomeScreen'; // หน้าอื่นๆ
import MainProjectScreen from './screens/MainProjectScreen';
import DetailsScreen from './screens/DetailsScreen';


const Stack = createStackNavigator();  

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Home2" component={INsideHomeScreen} />
        <Stack.Screen name="MainProject" component={MainProjectScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
