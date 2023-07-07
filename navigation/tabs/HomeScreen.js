import * as React from 'react';
import { View, Text,FlatList,Dimensions,ScrollView ,TouchableOpacity,Image,BackHandler,Alert} from 'react-native';
import {PLACES, TOP_PLACES} from '../../constant/data';
import TopPlacesCarousel from '../../components/TopPlacesCarausel';
import Card from '../../components/Card';

import ChatBot from '../../screens/ChatBot';

import CardNumber from '../../screens/CareNumber';
import ServiceSection from '../../components/ServiceSection';

import { getAuth, signOut } from "firebase/auth";
import db from '../../firebase';
import { getDatabase, ref, onValue,set} from "firebase/database";
import { useFocusEffect } from '@react-navigation/core';

const transfer = [
    {
        id: 1,
        img: require('../../assets/images/newuser.png'),
        heading: 'Patients visited',
        price: '10+',
        isSending: true,
    },
    {
        id: 2,
        img: require('../../assets/images/doctor.png'),
        heading: 'Doctors',
        price: '30+',
        isSending: false,
    },{
        id: 3,
        img: require('../../assets/images/tcured.png'),
        heading: 'Tumor detected',
        price: '20+',
        isSending: false,
    },{
        id: 4,
        img: require('../../assets/images/hosp.png'),
        heading: 'Hospitals',
        price: '50+',
        isSending: false,
    }
];


const reviewData =[{name:"Karan Kundra",city:"Mumbai",rating:2,review:"Overall app is fine but there are few bugs which cannot be neglected as a patient.", recommended:"yes"},

{name:"Mrinal Tanvar",city:"Kalyan",rating:5,review:"Simply Loved this app. Cheers to Brain-care app", recommended:"No"},


{name:"deepak Tahir",city:"Kalyan",rating:3,review:"Great Service and hospitality", recommended:"No"},


{name:"Mohan Patel",city:"Kalyan",rating:4,review:"Very good app... Happy with the service through it... Easy to get Appointments and find doctors.", recommended:"yes"},


{name:"Pavan Joshi",city:"Kalyan",rating:5,review:"Great Experience so far. Keep up the good work. Many thanks for your great services.", recommended:"yes"}]


export default function HomeScreen({ navigation }) {

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert('Confirmation!', 'Do you want to close the app', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => {
          signoutHandler();
          BackHandler.exitApp()
        }},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  const signoutHandler = ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
      console.log('User SignedOut')
      navigation.replace('Login')
    }).catch((error) => {
    // An error happened.
        console.log(error);
    });
}
 

  const [hospitals, setHospitals] = React.useState({});
  const [reviews, setReviews] = React.useState({});
  const [reviewKeys,setReviewKeys] = React.useState([]);
  const [hospitalCount,setHospitalCount] = React.useState(0);
  const [doctorCount,setDoctorCount] = React.useState(0);
  const {width} = Dimensions.get('screen');
  const callSymptomsScreen = ()=>{
    navigation.navigate('SymptomsScreen');
  }

  const fetchHospitalData = async ()=>{
    const starCountRef = ref(db, 'Hospital_Data/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
    //   setDatabaseReviewCount(Object.keys(data).length);
    let sumOfDoctors = 0;
    for(const key of Object.keys(data)){

        // console.log(data[key].doctors)        
        if(data[key] && data[key].doctors){
          sumOfDoctors+= data[key].doctors.length;
        }
    }
    setHospitalCount(Object.keys(data).length);
    setHospitals(data);
    setDoctorCount(sumOfDoctors);
    });
  }
  const fetchReviewData = async ()=>{
    const starCountRef = ref(db, 'Feedback/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      setReviews(data);
      setReviewKeys(Object.keys(data));
    
    });
  }

  React.useEffect(() => {
    fetchHospitalData();
    fetchReviewData();
    return () => {
      
    }
  }, [])

    return (
          <>
          <ChatBot navigation={navigation}/>
          <ScrollView >
          <Text style={{fontWeight:"bold",fontSize:15,marginLeft:'5%',marginTop:'5%'}}>Top Rated Hospitals</Text>
          <FlatList
            data={Object.keys(hospitals)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 10,
              marginTop: 5,
              marginBottom: 10,
              paddingBottom: 30,
              height:200,
            }}
            renderItem={({item}) => <HospitalCard key={item} navigation={navigation} type={hospitals[item].type} title={hospitals[item].name} image={hospitals[item].imgUrl} location={hospitals[item].city} rating={hospitals[item].rating} currentHospital={item} hospitals={hospitals} />}
          />
          <ServiceSection callSymptomsScreen = {callSymptomsScreen} />
          <Text style={{fontWeight:"bold",marginLeft:'5%',marginTop:'5%',marginBottom:'5%'}}> Brain Care by Numbers</Text>
          <CardNumber data={transfer} hospitalCount={hospitalCount} doctorCount={doctorCount} />

          <Text style={{fontWeight:"bold",marginLeft:'5%',marginTop:'5%'}}>User Reviews</Text>
          <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          horizontal
          data={reviewKeys}
          renderItem={({item}) => <Card data={reviews[item]} key={item} navigation= {navigation} />}
          key="ok"
          />

          </ScrollView>
       </>
    );
}

const HospitalCard =(props)=>{
  return(
    <View style={{padding:8,width:350,height:150,marginLeft:10,}}>
        <TouchableOpacity style={{padding:0,flexDirection:"row",borderColor:'grey',borderWidth:1,alignItems:"center",alignContent:"center",backgroundColor:"#D8D8D8",shadowColor: 'black',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,height:170,marginTop:20,borderRadius:10}}  onPress={()=>{}}>
         

            <View  style={{borderRadius:10,justifyContent:"center",height:50,width:50,alignItems:"center"}}>
            <Image source={{uri:props.image}} style={{height:130,width:130,borderRadius:10,marginLeft:110,marginTop:0}}/>
            </View>
         

            <View style={{width:180,justifyContent:"center",height:150,marginLeft:115}}> 
            
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
