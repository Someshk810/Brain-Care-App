import { StyleSheet, Text, View,Image } from 'react-native'
import React, {useEffect, useState} from 'react'
// import TransferItem from './transferItem'
// import Spacer from '../../../components/spacer'
import { Ionicons } from '@expo/vector-icons';


import { getAuth } from "firebase/auth";
import db from '../firebase';
import { getDatabase, ref, onValue,set} from "firebase/database";




const Spacer = ({width = 0, height = 0}) => {
  return (
    <View style={{width: width, height: height}}></View>
  )
}



const TransferItem = (props) => {
  return (
    <View style={[styles.container,
         { 
             borderBottomLeftRadius:  15,
             borderBottomRightRadius:  15,
             borderTopLeftRadius:  15,
             borderTopRightRadius: 15,
             
             }]}>


      
      <View style={styles.row}>
          <View>
          <Text style={styles.price}>{props.value}+</Text>
        
            <Text style={styles.desc}>{props.data.heading}</Text>
              
            
          </View>
          <Image source={props.data.img} style={styles.img} />
      </View>
    </View>
  )
}

const CareNumber = (props) => {
  const [profileCount, setProfileCount] = useState(0)

  const fetchData = async ()=>{
    const starCountRef = ref(db, 'Profile');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setProfileCount(()=>Object.keys(data).length);
      // console.log(data)
    },{
      onlyOnce:true,
    });
  }
  useEffect(() => {
    fetchData();
    
    return () => { 
    }
  }, [])

  return ( 
    <>
    <View style={{flexDirection:"row",alignItems: "center",justifyContent: "space-evenly"}}>
      <TransferItem data = {props.data[0] } value={profileCount} />
      <Spacer height={15} />
      
      <TransferItem data = { props.data[1] } value={props.doctorCount}/>
      
    </View>
    <View style={{flexDirection:"row",alignItems: "center",justifyContent: "space-evenly"}}>
      <TransferItem data = {props.data[2] } value={4} />
      <Spacer height={15} />
      
      <TransferItem data = { props.data[3] } value={props.hospitalCount} />
      
    </View>
    </>
  )
}

export default CareNumber

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        backgroundColor: 'orange',
        position: 'absolute',
        top: 74,
        zIndex: 100,
        right: '50%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      
        
        height: 80,
        width: 150,
        backgroundColor: 'white',
        padding: 15,
        margin:3
    },
    desc: {
        fontSize: 12,
        color: 'grey',
    
    },
    price: {
      marginTop:8,
        fontSize: 15,
        fontWeight: 'bold',
        
    },
    img: {
      marginLeft: 15,
      marginRight: 2,
        width: 30,
        height: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})