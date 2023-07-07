import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import Constants from 'expo-constants';

import { Linking } from 'react-native';



// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';






const data =[{name:"Dr.Shivam Kumar",drimg:require("../../../assets/hospitalscreenimages/doctors.png"),address:" A/105, Blue Garden, Blue Road, Mumbai-17 ",experience:15, recommended:"yes",patientsTreated:100,phoneNo:`tel:${7506183558}`},

{name:"Dr.Mathew Fernandes",drimg:require("../../../assets/hospitalscreenimages/doctors.png"),address:" A/105, ABC Street, Mumbai-70 ",experience:25, recommended:"no",patientsTreated:20,phoneNo:`tel:${7506183558}`},

{name:"Dr. Raj Singh",drimg:require("../../../assets/hospitalscreenimages/doctors.png"),address:" A/105, Blue Garden, Blue Road, Mumbai-17 ",experience:10, recommended:"yes",patientsTreated:150,phoneNo:`tel:${7506183558}`},

]



const {width} = Dimensions.get('screen');







 const DoctorCard =({doctor})=>{
   return (
    <View style={styles.container}>
      <View style={styles.doctorContainer}>

       <View style={{flexDirection:"row" ,alignItems:"center"}}>


      <View style={{flexDirection:"column",justifyContent:"center"}}>
       <View style={styles.doctorimg}>
       <Image
          style={{height:70,width:70}}
           source={require("../../../assets/hospitalscreenimages/doctors.png")}/>
       </View>
        </View>
       
       
        <View style={styles.drDataContainer}>

       


         <View style={styles.doctorData}>
          
           <View style={{flexDirection:"column",alignItems:"flex-start",justifyContent:"center",width:"90%"}}><Text style={{...styles.doctorText,color:"black"}}>{"Dr. "+doctor.name}</Text></View>
          </View>
            


             <View style={styles.doctorData}>
           
           <View style={{flexDirection:"column",alignItems:"flex-start",justifyContent:"center",width:"90%"}}><Text style={styles.doctorText}>{doctor.experience} Years Of Experience</Text></View>
          </View>

           <View style={styles.doctorData}>
           
           <View style={{flexDirection:"column",alignItems:"flex-start",justifyContent:"center",width:"90%"}}><Text style={styles.doctorText}>{doctor.patientscured}+  Patients Treated</Text></View>
          </View>

     
           <View style={styles.doctorData}>
            <View style={{flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                <Image
                style={{height:18,width:18}}
                source={require("../../../assets/hospitalscreenimages/location.png")}/>
            </View>
           <View style={{marginLeft:3,flexDirection:"column",alignItems:"center",justifyContent:"center"}}><Text style={styles.doctorText}>{"jogeshwari east"}</Text></View>
          </View>
  
       </View>
         </View>

   <View style= {styles.btnContainer}>
        
         <TouchableOpacity 
         onPress={() => Linking.openURL(`tel:${doctor.phonenumber}`)}
         style={{borderRadius:7,borderWidth:2,borderColor:"#FFC180",height:38,width:150,alignItems:"center",justifyContent:"center"}}>


      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",marginRight:8}}>
       <Image
       style={{width:18,height:18}}
        source={require("../../../assets/hospitalscreenimages/appointment.png")}
       />
       </View>

      <View style={{flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
      <Text style={{fontSize:12,fontWeight:"bold",color:"#FF8300"}}>Book Appointment</Text>
       </View>

    

         </View>
      </TouchableOpacity>


      <TouchableOpacity 
      onPress={() => Linking.openURL(doctor.phonenumber)}
      style={{borderRadius:7,borderWidth:2,borderColor:"blue",height:38,width:150,alignItems:"center",justifyContent:"center",marginLeft:10}}>


      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",marginRight:8}}>
       <Image
       style={{width:18,height:18}}
        source={require("../../../assets/hospitalscreenimages/call-black.png")}
       />
       </View>

      <View style={{flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
      <Text style={{fontSize:12,fontWeight:"bold",color:"#3D7CC9"}}>Call</Text>
       </View>
    

         </View>
      </TouchableOpacity>

       </View>

       
      
      </View>
       

     
      </View>
       
    
  );
 }
 
 
export default function DoctorCardCarousel({navigation,doctors}) {

  return(
   <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
   <View style={{justifyContent:"center",alignItems:"center"}}>
     <FlatList
          snapToInterval={width-20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 15,paddingRight: 15, paddingVertical: 5}}
          horizontal
          data={doctors}
          renderItem={({item}) => <DoctorCard style={styles.shadowProp} doctor={item} key={item} navigation= {navigation} />}
          />

         
      </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    // paddingTop: 20,
    // backgroundColor:"purple",
    
    paddingHorizontal: 8,
    alignItems:"center",
  
    
  },
  doctorContainer:{
    width:width-40,
    height:180,
    flexDirection:"column",
    
   borderWidth:0.5,
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
    // backgroundColor:"yellow",
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
