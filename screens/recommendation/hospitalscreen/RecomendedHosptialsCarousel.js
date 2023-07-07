// import React from 'react'

// function RecomendedHosptialsCarousel() {
//   return (
//     <div>RecomendedHosptialsCarousel</div>
//   )
// }

// export default RecomendedHosptialsCarousel


import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import Constants from 'expo-constants';

import { Linking } from 'react-native';



// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';






// const data =[{name:"Dr.Shivam Kumar",drimg:require("../../../assets/hospitalscreenimages/doctors.png"),address:" A/105, Blue Garden, Blue Road, Mumbai-17 ",experience:15, recommended:"yes",patientsTreated:100,phoneNo:`tel:${7506183558}`},

// {name:"Dr.Mathew Fernandes",drimg:require("../../../assets/hospitalscreenimages/doctors.png"),address:" A/105, ABC Street, Mumbai-70 ",experience:25, recommended:"no",patientsTreated:20,phoneNo:`tel:${7506183558}`},

// {name:"Dr. Raj Singh",drimg:require("../../../assets/hospitalscreenimages/doctors.png"),address:" A/105, Blue Garden, Blue Road, Mumbai-17 ",experience:10, recommended:"yes",patientsTreated:150,phoneNo:`tel:${7506183558}`},

// ]



const {width} = Dimensions.get('screen');







 const HospitalCard =(props)=>{
    return(
      <View style={{padding:8,width:350,height:150}}>
          <TouchableOpacity style={{padding:0,flexDirection:"row",alignItems:"center",alignContent:"center",backgroundColor:"#EDF1D6",shadowColor: 'black',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,height:170,marginTop:20,borderRadius:30}}  onPress={()=>{props.navigation.replace("HospitalView",{currentHospital:props.currentHospital,hospitals:props.hospitals})}}>
           

              <View  style={{backgroundColor:"#ECF9FF",borderRadius:15,justifyContent:"center",height:50,width:50,alignItems:"center"}}>
              <Image source={{uri:props.image}} style={{height:170,width:140,borderRadius:30,marginLeft:90,marginTop:0}}/>
              </View>
           

              <View style={{width:180,justifyContent:"center",height:150,marginLeft:100}}> 
              
        <Text style={{fontWeight:"bold",fontSize:15,color:"black",width:150}}>{props.title}</Text>

          <View>
          <Text style={{fontSize:12,width:170}}>Location: {props.location.toUpperCase()}</Text>
          <Text style={{fontSize:12,marginTop:5,width:170}}>Rating: {props.rating}★</Text>
          <Text style={{fontSize:12,marginTop:5,width:170}}>Type: {props.type}</Text>
          </View>
              </View>
      </TouchableOpacity>

        </View>

      );
 }
 
 
export default function RecomendedHosptialsCarousel({navigation,hospitals}) {

  return(
   <View style={{flex:1,alignItems:"center",justifyContent:"center",margin:0}}>
   <View style={{justifyContent:"center",alignItems:"center",height:'100%'}}>
     <FlatList
          snapToInterval={width-40}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 15,paddingRight: 15, paddingVertical: 5}}
          horizontal
          data={hospitals}
          renderItem={({item}) => <HospitalCard style={styles.shadowProp} key={item} navigation={navigation} type={item.type} title={item.name} image={item.imgUrl} location={item.city} rating={item.rating} currentHospital={item} hospitals={hospitals} />}
          />

         
      </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    
    paddingHorizontal: 8,
    alignItems:"center",
  
    
  },
  doctorContainer:{
    width:width-40,
    height:180,
    flexDirection:"column",
    
   borderWidth:1,
    borderRadius:10,
    alignItems:"center",
    justifyContent:"flex-start",
    // backgroundColor:"red",
    paddingHorizontal:10,
    paddingBottom:6,


    
  },

  

  

  doctorimg:{
    alignItems:"center",
    justifyContent:'center',
    width:80,
    height:80,
    borderWidth:2,
    borderRadius:7,
   
    
    backgroundColor:"#0F6292"
  },
   drDataContainer :{
      // backgroundColor:"green",
    flexDirection:"column",
    alignItem:"flex-start",
    justifyContent:"flex-start",
    
    paddingHorizontal:10
    
   
  },
  doctorData:{
     maxWidth:228,
   
    flexDirection:"row",
    marginTop:10,
    justifyContent:"flex-start",
    // paddingHorizontal:10
  },
  doctorText:{
    fontSize:12,
    fontWeight:"bold",

  },
   shadowProp: {  
    shadowOffset: {width: -2, height: 4},  
    shadowColor: 'black',  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
    elevation:20,
    borderRadius:10,
    
    
  },  

  btnContainer:{
      flexDirection:"row",
       marginTop:9,
    justifyContent:"flex-start",
    alignItems:"center",
    
    // backgroundColor:"grey"

  }
  
});
