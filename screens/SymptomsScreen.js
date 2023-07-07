import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'



const { width } = Dimensions.get("screen")


const imgurl = require("../assets/images/doctor.png");

const Symptoms = (props) =>{
  return(
    <View style={{padding:8}}>
      <View style={{padding:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center",alignContent:"center",backgroundColor:"#DAEAF1",borderRadius:10,shadowColor: '#748DA6',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,}}>
    <View style={{alignItems:"center",justifyContent:"center",width:75}}> 
      <View>
      <Text style={{fontWeight:"bold",marginBottom:5,fontSize:16,color:"#3C84AB"}}>{props.title}</Text>
      </View>
      <View  style={{backgroundColor:"#ECF9FF",borderRadius:15,justifyContent:"center",height:50,width:50,alignItems:"center"}}>
      <Image source={props.img} style={{height:40,width:40}}/>
      </View>
    </View> 

      <View style={{width:"70%"}}> 
      <Text style={{fontSize:11,color:"#205E61"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</Text>
      </View>

      
      </View>
    </View>
  );
}

const SymptomsScreen = () => {
  const values= [{id:1,title:"Headache",img:require('../assets/images/doctor.png')},
  {id:2,title:"Fatigue",img:require('../assets/images/doctor.png')},
  {id:3,title:"Vomit",img:require('../assets/images/doctor.png')},
  {id:4,title:"Headache",img:require('../assets/images/doctor.png')}]
  
  return (
    <>
    {values.map((val,idx)=> <Symptoms key={idx} title={val.title} img={val.img}/>)}
    </>
    
  );
}

export default SymptomsScreen;

