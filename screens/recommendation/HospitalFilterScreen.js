import React, { useState,useEffect } from 'react';
import {SafeAreaView, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  View,
  ScrollView,
  KeyboardAwareView,
  Text,
  Alert,
} from 'react-native';

import db from '../../firebase';
import { getDatabase, ref, onValue,set} from "firebase/database";

import HospitalCard from './HospitalCard';
const HospitalFilterScreen = ({navigation}) => {

    const [hospitals, setHospitals] = useState({});
    const [keys,setKeys] = useState([]);

  const values = [
  {id:1,name:"Vinayak",loc:"mumbai",rating:"5",image:require("../../assets/images/hosp.png")},
  {id:2,name:"Kartik",loc:"andheri",rating:"2",image:require("../../assets/images/hosp.png")},
  {id:3,name:"Somesh",loc:"kalyan",rating:"2",image:require("../../assets/images/hosp.png")},
  {id:5,name:"Prajwal",loc:"mahim",rating:"4",image:require("../../assets/images/hosp.png")},
  {id:6,name:"Prajwal",loc:"mahim",rating:"4",image:require("../../assets/images/hosp.png")},
  {id:7,name:"Prajwal",loc:"mahim",rating:"4",image:require("../../assets/images/hosp.png")},
  {id:8,name:"Prajwal",loc:"mahim",rating:"4",image:require("../../assets/images/hosp.png")}]

  const [location, newlocation] = React.useState('');

  const [orat, nrat] = React.useState('');

  const fetchData = async ()=>{
    const starCountRef = ref(db, 'Hospital_Data/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
    //   setDatabaseReviewCount(Object.keys(data).length);
    // for(const key of Object.keys(data)){
    //     console.log(data[key].doctors)        
    // }
    setHospitals(data);
    setKeys(Object.keys(data));
    });
  }

  useEffect(() => {
    fetchData();
  
    return () => {
      
    }
  }, [])
  


  const newvalues = values.filter(val => 
  {
  
    if(orat === '' && location === ''){
      return true;
    }else if(orat !== ''  && location === ''){
      return  val.rating === orat
    }else if(location !== '' && orat === '' ){
      return  val.loc.startsWith(location.toLowerCase());
    }else{
        return  val.rating === orat &&  val.loc.startsWith(location.toLowerCase()); 
    }
  });
  
  const filteredHospitals = Object.fromEntries(
    Object.entries(hospitals).filter(([key, value]) => 
    {
  
        if(orat === '' && location === ''){
          return true;
        }else if(orat !== ''  && location === ''){
          return  value.rating === orat
        }else if(location !== '' && orat === '' ){
          return  value.city.toLowerCase().startsWith(location.toLowerCase());
        }else{
            return  value.rating === orat &&  value.city.toLowerCase().startsWith(location.toLowerCase()); 
        }
      })
  )

  return (
    
    <View style={{flex:1,marginTop:50}}>

     <KeyboardAvoidingView>


    <Text style={{marginLeft:15,fontWeight:"bold",fontSize:25}}>Filter Hospitals</Text>
      
      <TextInput
        style={styles.input}
        onChangeText={changed => newlocation(changed)}
        value={location}
        placeholder="Enter location"/>

      <TextInput
        style={styles.input}
        onChangeText={changed => nrat(changed)}
        value={orat}
        placeholder="Enter Rating"
        keyboardType="numeric"/>
      <View style={{width:"50%",marginLeft:"25%",marginBottom:10}}>

      <Button onPress={_clicked => {newlocation("");nrat("")}} title="Clear"/>
      </View>

    <ScrollView >
    <View style={{paddingBottom:220,flex:1}}>


      
      {Object.keys(filteredHospitals).map((key,idx) => <HospitalCard key={idx} navigation={navigation} title={hospitals[key].name} image={hospitals[key].imgUrl} location={hospitals[key].city} rating={hospitals[key].rating} currentHospital={hospitals[key]} hospitals={hospitals}/>)}

      </View>


      </ScrollView>
      

      
      
    </KeyboardAvoidingView>
    
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HospitalFilterScreen;