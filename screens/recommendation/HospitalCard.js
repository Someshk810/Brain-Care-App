import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {

  Button,
  View,
  Image,
  TouchableOpacity,

  Text,
  Alert,
} from 'react-native';

const HospitalCard = (props)=>{

  return(
    <View style={{padding:8}}>
      <TouchableOpacity style={{padding:15,flexDirection:"row",justifyContent:"space-between",alignItems:"center",alignContent:"center",backgroundColor:"#DAEAF1",borderRadius:10,shadowColor: '#748DA6',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3}} onPress={()=>props.navigation.navigate("HospitalView",{currentHospital:props.currentHospital,hospitals:props.hospitals})}>
    <View style={{alignItems:"center",justifyContent:"center",width:75}}> 

      <View  style={{backgroundColor:"#ECF9FF",borderRadius:15,justifyContent:"center",height:50,width:50,alignItems:"center"}}>
      <Image source={{uri:props.image}} style={{height:60,width:60}}/>
      </View>
    </View> 

      <View style={{width:"70%",justifyContent:"center",alignItems:"center"}}> 
      
<Text style={{fontWeight:"bold",marginBottom:5,fontSize:18,color:"black"}}>{props.title}</Text>

  <View>
  <Text style={{fontSize:15}}>Location: {props.location.toUpperCase()}</Text>
  <Text style={{fontSize:15,marginTop:5}}>Rating: {props.rating}★</Text>
  </View>
      </View>

      
      </TouchableOpacity>
    </View>
  );

}

export default HospitalCard;