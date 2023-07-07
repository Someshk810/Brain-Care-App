// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';

import './polyfills';

import Constants from 'expo-constants';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryScreen from './screens/EntryScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
// import TumorDetectionScreen from './screens/TumorDetectionScreen';
import ChatBot from './chatBot/index'
import Splash from './screens/Splash'
import Onboarding from './screens/Onboarding'
import Login from './screens/Login'
import SignUpScreen from './screens/SignUpScreen'
import ForgotPassword from './screens/ForgotPassword'
import OtpVerification from './screens/OtpVerfication'
import TumorDetectionScreen from './screens/TumorDetectionScreen';
import SymptomsScreen from './screens/SymptomsScreen';
import FAQScreen from './screens/FAQScreen';

// import Splash from './'
// import Ok from './screens/Ok';
// You can import from local files
import AssetExample from './components/AssetExample';
import MainContainer from './navigation/MainContainer'
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import ProfileScreen from './screens/ProfileScreen';
import HospitalFilterScreen from './screens/recommendation/HospitalFilterScreen';
import Hospitalview from './screens/recommendation/hospitalscreen/hospitalView';
const Stack = createNativeStackNavigator();
import './ignoreWarnings';


export default function App() {
  return (
    <>
    
   <NavigationContainer>
   
     
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="EntryScreen" component={EntryScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Aboutus" component={AboutUsScreen} options={{
        headerShown: true,
        headerTitle: 'About Us',
        
      }} />
        <Stack.Screen name="chatbot" component={ChatBot} />

        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
        headerShown: true,
        headerTitle: 'Profile',
        
      }}/>
        <Stack.Screen name="HospitalFilterScreen" component={HospitalFilterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="HospitalView" component={Hospitalview} options={{headerShown: false}}/>
        
        <Stack.Screen name="SymptomsScreen" component={SymptomsScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpVerfication" component={OtpVerification} />

        <Stack.Screen name="FAQScreen" component={FAQScreen} />

        <Stack.Screen name="TumorDetection" component={TumorDetectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
    </>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
