import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MainContainer from '../navigation/MainContainer';
import SideMenu from './SideMenu';


function First({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
        </View>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();




const EntryScreen = ({navigation}) => {

  

  return (
    <>
     <Drawer.Navigator useLegacyImplementation={true} drawerContent={ props => <SideMenu {...props} />} initialRouteName="Brain Care App" >
          <Drawer.Screen name="Brain Care App" options={{
        headerShown: true,
        headerTitle: ' ',
        headerLeft: ()=> ( 
          
          <View style={{flexDirection: 'row',}}>
            <View style={{marginLeft: 10,justifyContent:'center',alignItem:'center'}}>
            <TouchableOpacity style={{}}  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Icon name="menu" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 10,flexDirection: 'row',}}>
              <Text style={{fontWeight: 'bold', fontSize: 35, color: '#000'}}>
                Brain
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 35, color: '#64beff'}}>
                Care
              </Text>
              </View>
            </View>
            )
      }} component={MainContainer} />
      </Drawer.Navigator>
    </>
  )
}

export default EntryScreen;




// const LoginScreen = () => {
  
//   const navigation = useNavigation()

  

//     return unsubscribe
//   }, [])

  
//   const handleLogin = () => {
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .then(userCredentials => {
//         const user = userCredentials.user;
//         console.log('Logged in with:', user.email);
//       })
//       .catch(error => alert(error.message))
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior="padding"
//     >
     
      
//     </KeyboardAvoidingView>
//   )
// }

// export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})