import { View, Text, ScrollView, Dimensions,Image,TouchableOpacity } from 'react-native'
import React from 'react'
const { width } = Dimensions.get("screen")

const values = [{id:1,text:"Headache",img:require('../assets/images/doctor.png')},{id:2,text:"Vomit",img:require("../assets/images/doctor.png")},{id:3,text:"Fatigue",img:require('../assets/images/doctor.png')}];

 const ServiceCard =(props) =>{

  return(
    
    <View style={{marginTop:20,backgroundColor:"#DDDDDD",padding:30}}>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <Text style={{fontWeight:"bold"}}>Symptoms</Text>

         
    <TouchableOpacity 
         onPress={() => {props.callSymptomsScreen()}}
    >
    <Text style={{fontWeight:"bold",color:"#F99417",fontStyle: "italic"}}>View more</Text>
    </TouchableOpacity>
    </View>


    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>

    {values.map((val,idx) => <ServicesContainer key={idx} text={val.text} img={val.img}/>)}
  
    </View>

  
  </View>
  
  );

}

export default ServiceCard;
const ServicesContainer =(props) =>{
  
  return(
    <View style={{alignItems:"center"}}>
    

    
                <View style={{padding:8,backgroundColor:"#ECF9FF",borderRadius:15,marginBottom:5}}>
                <Image source={props.img} style={{width: 35,height: 35}}/>
                </View>
                

                <View>
                <Text>{props.text}</Text>
                </View>
                </View>

  )
}