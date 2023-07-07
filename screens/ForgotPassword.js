
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import STYLES from '../styles/index';

import Icon from 'react-native-vector-icons/FontAwesome';


const ForgotPassword = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, padding: 20,backgroundColor:'#fff',paddingTop:100}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <View style={{justifyContent:'flex-start'}}>
          <Text style={{fontSize: 27, marginBottom: 20,fontWeight:"bold"}}>Forgot Password</Text>
      </View>
      </View>


       <View style={{flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#ededed',
          width:'95%',
          borderRadius:10,
          height:60,
          paddingLeft:20}} >

          <Icon name="envelope-o" size={22} color="#818181"/>
            <TextInput
              
              style={{...STYLES.input,placeholderTextColor: '#a5a5a5',fontWeight:'bold'}}                    
              placeholder="Enter Email" 
              placeholderTextColor="#818181"/>

        </View>
        
      <TouchableOpacity
        style={STYLES.btnPrimary}
        onPress={()=>navigation.navigate('OtpVerfication')}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default ForgotPassword;
