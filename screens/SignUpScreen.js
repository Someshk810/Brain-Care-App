import 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import {SafeAreaView, View, Text, TextInput, Image, Alert, TouchableOpacity,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constant/color1';
import STYLES from '../styles/index';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import db from '../firebase';
import { getDatabase, ref, onValue,set} from "firebase/database";

const SignUpScreen = ({navigation}) => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [passone,setPassone] = useState("");
  const [passtwo,setPasstwo] = useState("");

  const clearInput = ()=>{
    setName("");
    setEmail("");
    setPassone("");
    setPasstwo("");
  }
 

  const handleSignUp = async ()=>{
    if(!name){
      Alert.alert("Error","Please fill the name field!!");
      return;
    }
    if(!email){
      Alert.alert("Error","Please fill the email field!!");
      return;
    }
      // console.log(name,email);
      if(passone !== passtwo  || !passone){
        setPassone("");
        setPasstwo("");
        Alert.alert("Error","Passwords do not match!!");
        return;
      }
      if(passone.length < 6){
        Alert.alert("Error","Password should be of aleast 6 characters!!");
        return;
      }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,passone).then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // console.log(user);
          // ...
          Alert.alert( "Successfull", "You have been successfully Registered");
          
          // Alert.alert(
          //   "You have been successfully Registered",
          //    'My Alert Msg',
          //      [
          //        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          //        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          //        {text: 'OK', onPress: () => console.log('OK Pressed')},
          //      ]
          //    )
          return user;
        }).then((user)=>{
          // console.log(user.email);
          set(ref(db,'Profile/'+user.uid+""),{
            name,
            email
            });
          navigation.navigate('Login');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if('auth/invalid-email' === errorCode){
            Alert.alert("Error","Please entry proper mail id!!");
          }else{
            
            clearInput();
          }
         
        })

      
        
  }

  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white,paddingTop:100}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            Brain
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
            Care
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            Welcome Back,
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
            Sign up to continue
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="person-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="Name" value={name} onChangeText={(value)=>{setName(value)}} style={STYLES.input} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="mail-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput placeholder="Email" value={email} onChangeText={(value)=>{setEmail(value)}}  style={STYLES.input} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Password"
              style={STYLES.input}
              value={passone}
              onChangeText={(value)=>{setPassone(value)}}
              secureTextEntry
            />
            
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="re-enter password"
              style={STYLES.input}
              value={passtwo}
              onChangeText={(value)=>{setPasstwo(value)}}
              secureTextEntry
            />
            
          </View>

          <TouchableOpacity onPress={()=>{handleSignUp()}} style={{...styles.social_btn,backgroundColor:'#28388f'}} >
              <Text style={{width:'80%',textAlign:'center',fontSize:18,fontWeight: 'bold',color:'#fff'}} >Sign Up</Text>
              </TouchableOpacity>
         
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            
           
            
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}>
          <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
              {" Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  
  social_btn:{
      height:55,
      width:'100%',
      borderWidth:1,
      borderRadius:10,
      borderColor:'#ddd',
      flexDirection:'row',
      alignItems:'center',
      marginTop:30,
      justifyContent:"center"
  },
  
  
});

  
                  