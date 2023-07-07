import React from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import STYLES from '../styles/index';
import {useNavigation} from '@react-navigation/native';


const OTPVerification = () => {

  const navigation = useNavigation();
  
  const [otp1, setOTP1] = React.useState('');
  const [otp2, setOTP2] = React.useState('');
  const [otp3, setOTP3] = React.useState('');
  const [otp4, setOTP4] = React.useState('');
  const [otp5, setOTP5] = React.useState('');
  const [otp6, setOTP6] = React.useState('');
  const otp2Ref = React.useRef(null);
  const otp3Ref = React.useRef(null);
  const otp4Ref = React.useRef(null);
  const otp5Ref = React.useRef(null);
  const otp6Ref = React.useRef(null);

  



  return (
    
    <View style={{flex: 1, padding: 20,backgroundColor:'#fff',paddingTop:100}}>
    <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={{fontSize: 20, marginBottom: 20}}>Back</Text>
    </TouchableOpacity>
    <View style={{paddingTop:100}}>
    <View style={{flexDirection: 'row', marginTop: 40,}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: '#000'}}>
            Brain
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: '#64beff'}}>
            Care
          </Text>
    </View>
      
      <View style={{
        justifyContent:'flex-start'}}>
        <Text style={{
          fontSize: 27, 
          marginBottom: 20,
          fontWeight:"bold"
          }}>OTP Verification
        </Text>
      </View>
      </View>
      
      <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        keyboardType="number-pad"
        onSubmitEditing={() => otp2Ref.current.focus()}
        maxLength={1}
        onChangeText={text => {setOTP1(text);otp2Ref.current.focus()}}
        value={otp1}
      />
      <TextInput
        ref={otp2Ref}
        style={styles.inputBox}
        keyboardType="number-pad"
        onSubmitEditing={() => otp3Ref.current.focus()}
        maxLength={1}
        onChangeText={text => {setOTP2(text);otp3Ref.current.focus()}}
        value={otp2}
      />
      <TextInput
        ref={otp3Ref}
        style={styles.inputBox}
        keyboardType="number-pad"
        onSubmitEditing={() => otp4Ref.current.focus()}
        maxLength={1}
        onChangeText={text => {setOTP3(text);otp4Ref.current.focus()}}
        value={otp3}
      />
      <TextInput
        ref = {otp4Ref}
        style={styles.inputBox}
        keyboardType="number-pad"
        onSubmitEditing={() => otp5Ref.current.focus()}
        maxLength={1}
        onChangeText={text => {setOTP4(text);otp5Ref.current.focus()}}
        value={otp4}
      />
      <TextInput
        ref={otp5Ref}
        style={styles.inputBox}
        keyboardType="number-pad"
        onSubmitEditing={() => otp6Ref.current.focus()}
        maxLength={1}
        onChangeText={text => {setOTP5(text);otp6Ref.current.focus()}}
        value={otp5}
      />
      <TextInput
        ref={otp6Ref}
        style={styles.inputBox}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => setOTP6(text)}
        onSubmitEditing={() => otp6Ref.current.focus()}
        value={otp6}
      />
    </View>

    <View>
      <TouchableOpacity
        style={{...STYLES.btnPrimary}}
        onPress={()=>navigation.navigate('Login')}>
        <Text style={{color: 'white'}}>Verify</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 40,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
});


export default OTPVerification;
