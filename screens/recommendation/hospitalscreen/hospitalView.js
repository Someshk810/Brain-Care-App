import * as React from 'react';
import  { useState, useRef ,useEffect} from 'react';

import { Text, View, StyleSheet,Image,TouchableOpacity,ScrollView,Dimensions} from 'react-native';


// You can import from local files

import { Linking } from 'react-native'

import DoctorCardCarousel from './DoctorCardCarousel';
import FacilityContainer from './FacilityContainer';
import RecomendedHosptialsCarousel from './RecomendedHosptialsCarousel';


const rating =4;
const {width} = Dimensions.get("screen");
const hospitalData =[{hospitalName:"Tata Hopital",hospitalImg:require("../../../assets/hospitalscreenimages/hopital-img.jpg"), address:" A/105, Blue Garden, Blue Road, Mumbai-17 ", email:"abcd@gmail.com",timing:" All Days - 10:00 AM to 10:00 PM",rating:"4",phoneNo:`tel:${7506183558}`},
]




const starRating = (rating)=>{
  var imgArr=[];
  
  for(let i=0;i<5;i++){
    if(i<rating){
    imgArr.push(
      <View style={{flexDirection:"row"}} key={i}>
      <Image
       style={{height:15,width:15,marginRight:10}}
        source={require('../../../assets/hospitalscreenimages/star.png')}
      />
      </View>
      );
    }
      else{
        imgArr.push(
      <View style={{flexDirection:"row"}} key={i} >
      <Image
       style={{height:15,width:15,marginRight:10}}
        source={require('../../../assets/hospitalscreenimages/empty-star.png')}
      />
      </View>
      );
      }  
  }
  
  return imgArr;
}

const FixedHospitalDetails = ({name,address,rating,type})=>{
  return (
       
      <View style={styles.fixedHospitalInfo}>

       <View style={styles.fixedHospitalDataContainer}>
        <View style={{justifyContent:"center",alignItems:"center",padding:10}}>
          <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}> 
              {name}
          </Text>
        </View>

      <View style={{...styles.fixedHospitalData}}>
          <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
            <Image
            style={{width:25,height:25}}
            source={require("../../../assets/hospitalscreenimages/location.png")}
            />
          </View>
       <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
                <Text>
               {address}
              </Text>
          </View>
      </View>
      

      


         <View style={{...styles.fixedHospitalData}}>
          <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
            {/* <Image
            style={{width:25,height:25}}
            source=''
            /> */}
            <Text>Type:</Text>
          </View>
         <View style={{flexDirection:"column",justifyContent:"center",padding:5}}>
                <Text>
                    {type}
              </Text>
          </View>
      </View>



      <View style={{...styles.fixedHospitalData}}>
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
              <Image
              style={{width:25,height:25}}
              source={require("../../../assets/hospitalscreenimages/clock.png")}
              />
            </View>   
            <View style={{flexDirection:"column",justifyContent:"center",width:"90%",padding:10}}>    
                  <Text>
                      All Days - 10:00 AM to 10:00 PM
                </Text>
            </View>
        </View>





        <View style={{...styles.fixedHospitalData}}>
          <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",width:30,height:30}}>
              <Text style={{fontSize:14,fontWeight:"bold"}}>{rating}/5</Text>   
            </View>
          </View>
          <View style={{flexDirection:"column",justifyContent:"center",width:"90%",padding:10}}>
                <View style={{flexDirection:"row"}}>
                {starRating(rating)}
                </View>
          </View>
        </View>
      </View>
       

        <View style={{height:0.5,backgroundColor:"grey"}}></View>
    </View>
  )
}

const  StatisticsCard = (props)=>{
     return(
       

          <View style={{...styles.statisticsCard}}>
             <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",padding:10,width:70,height:70,borderRadius:70/2,backgroundColor:"#B4E4FF"}}>
               <Image
            style={{width:40,height:40}}
            source={props.img}
            />
            </View>
            <View style={{paddingTop:6}}>
                <Text style={{textAlign:"center",fontSize:14,fontWeight:"bold"}}>
                    {props.value} 
                </Text>
            </View>
             <View style={{paddingTop:6}}>
                <Text style={{textAlign:"center",fontSize:12}}>
                  {props.type}
                </Text>
            </View>
        </View>

        
      
     )



}


const Hospitalview =({route,navigation}) =>{
 
 const {address,ambulance,beds,city,doctors,facilites,type, healthdepartments,imgUrl,name,phone,rating} = route.params.currentHospital;
  const [hospitals,setHospitals] = useState(route.params.hospitals);
  const [recommended, setRecommended] = useState([]);
  const [showTopFixHospitalDetails,setShowTopFixedHospitalDetails] = useState(false);
  
  function recommendHospitals(userPreferences) {
    
    let vec1Magnitude = 0;
    
    vec1Magnitude += userPreferences.rating ** 2;
    vec1Magnitude = Math.sqrt(vec1Magnitude);
    const similarityScores = Object.keys(hospitals).map(hospitalKey => {
      let dotProduct = 0;
      let vec2Magnitude = 0;
      if (userPreferences.city === hospitals[hospitalKey].city) {
        dotProduct += 1000;
      }
      dotProduct += userPreferences.rating * hospitals[hospitalKey].rating;

      vec2Magnitude += hospitals[hospitalKey].rating ** 2;
      vec2Magnitude = Math.sqrt(vec2Magnitude);
      const similarity = dotProduct / (vec1Magnitude * vec2Magnitude);

      return {
        hospital: hospitals[hospitalKey],
        similarityScore: similarity,
      };
    });

  // sort hospitals by similarity score and return top 4
  const recommendedHospitals = similarityScores.sort((a, b) => b.similarityScore - a.similarityScore).slice(0, 4).map(ele => ele.hospital);
  return recommendedHospitals;
}
  useEffect(()=>{
    const recommended = recommendHospitals(route.params.currentHospital);
    // console.log(recommended)
    setRecommended(recommended);
  },[])

  const handleScrollEvent = (event)=>{
    // console.log(event.nativeEvent.contentOffset.y);
    if(event.nativeEvent.contentOffset.y >= 300){
      setShowTopFixedHospitalDetails(true);
    }else{
      setShowTopFixedHospitalDetails(false);
    }
  }
  

  return(

 <View style={styles.container}>
  {/* { showTopFixHospitalDetails && <FixedHospitalDetails name={name} address={address} type={type} rating={rating}/>} */}
    <ScrollView onScroll={handleScrollEvent} style={{ flexGrow: 1 }}>  

    <View style={styles.headerImage}>
      <Image
      style={{width:400,height:400,borderRadius:10}}
      source={{uri:imgUrl}}
      />
    </View> 
    
    <View style={styles.hopitalViewConatiner}>
       
       <View style={styles.hospitalInfo}>

       <View style={styles.hospitalDataContainer}>
       <View style={{justifyContent:"center",alignItems:"center",padding:10}}>
       <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}> 
           {name}
       </Text>
       </View>

      <View style={{...styles.hospitalData}}>
          <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
            <Image
            style={{width:25,height:25}}
            source={require("../../../assets/hospitalscreenimages/location.png")}
            />
          </View>
       <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10,maxWidth:"90%"}}>
                <Text>
               {address}
              </Text>
          </View>
      </View>
      

      


         <View style={{...styles.hospitalData}}>
          <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
            {/* <Image
            style={{width:25,height:25}}
            source=''
            /> */}
            <Text style={{fontWeight:"bold"}}>Type:</Text>
          </View>
         <View style={{flexDirection:"column",justifyContent:"center",padding:5}}>
                <Text>
                    {type}
              </Text>
          </View>
      </View>



      <View style={{...styles.hospitalData}}>
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
              <Image
              style={{width:25,height:25}}
              source={require("../../../assets/hospitalscreenimages/clock.png")}
              />
            </View>   
            <View style={{flexDirection:"column",justifyContent:"center",width:"90%",padding:10}}>    
                  <Text>
                      All Days - 10:00 AM to 10:00 PM
                </Text>
            </View>
        </View>





        <View style={{...styles.hospitalData}}>
          <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",width:30,height:30}}>
              <Text style={{fontSize:14,fontWeight:"bold"}}>{rating}/5</Text>   
            </View>
          </View>
          <View style={{flexDirection:"column",justifyContent:"center",width:"90%",padding:10}}>
                <View style={{flexDirection:"row"}}>
                {starRating(rating)}
                </View>
          </View>
        </View>
      </View>
       

        <View style={{height:0.5,backgroundColor:"grey"}}></View>

       <FacilityContainer facilites={facilites} />


    <View style={{...styles.statisticsContainer}}>
       <View style={{flexDirection:"column",paddingVertical:5,paddingHorizontal:20}}>
           <Text style={{fontSize:20,fontWeight:"bold"}}>
             Statistics
           </Text>
          </View> 

          <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly",alignItems:"center"}}>
     { <StatisticsCard img={require("../../../assets/hospitalscreenimages/patient.png")} value=" 6k +" type="Patients Treated" /> }
      <StatisticsCard  img={require("../../../assets/hospitalscreenimages/department.png")} value={healthdepartments} type="Health Departments" />
      <StatisticsCard img={require("../../../assets/hospitalscreenimages/bed.png")} value={beds} type="Beds" />
      <StatisticsCard img={require("../../../assets/hospitalscreenimages/ambulance.png")} value={ambulance} type="Ambulance" />
     </View>
     </View>

     
     

     <View style={styles.btnContainer}>
     
     <View style={{...styles.btn}}>
        <TouchableOpacity
         onPress={() => Linking.openURL(`tel:+7506183558`)} >
                <Text style={{textAlign:"center"}}>
                    Book Appointment 
              </Text>
              </TouchableOpacity>
     </View>
      </View>
       <Text style={{fontSize:20,fontWeight:"bold", marginTop:20,marginLeft:20}}>
             Doctors
           </Text>

       <DoctorCardCarousel doctors={doctors}/>
       <View style={{height:1,backgroundColor:"#D8D8D8"}}>
 
       </View>
       <Text style={{fontSize:20,fontWeight:"bold", marginTop:20,marginLeft:20}}>
             Recommended Hospitals
           </Text>
      <RecomendedHosptialsCarousel hospitals={recommended} navigation={navigation}/>
    
     </View>

     
     </View>
     </ScrollView>
 </View>
   
  );
}


export default Hospitalview;


const styles = StyleSheet.create({
    
    container:{
      flex:1,
      flexDirection:"column",
        // alignItems:"center",
      justifyContent:"flex-start",
        //  backgroundColor:"purple",
        
       
    },
    
    headerImage:{
    //  borderRadius:20,
      flexDirection:"row",
     
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      justifyContent:"center",
      alignItems:"center",
      position:'absolute',

    },
    hospitalInfo:{
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
       backgroundColor:"#F9F9F9",
      position:"relative",
      marginTop:300,
      height:1300

    },
    fixedHospitalInfo:{
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
       backgroundColor:"#F9F9F9",
      position:"absolute",
      marginTop:0,
      height:200,
      width,
      zIndex:99

    },
    fixedHospitalDataContainer:{
      flexDirection:"column",
       backgroundColor:"#F9F9F9",
       borderTopLeftRadius:20,
     borderTopRightRadius:20,
     
   },
    hospitalDataContainer:{
       flexDirection:"column",
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
      borderTopRightRadius:30,
      
    },
    fixedHospitalData:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-start",
      backgroundColor:"#F9F9F9",   
    },
    hospitalData:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-start",
      backgroundColor:"#F9F9F9",   
    },
   
     statisticsContainer:{
       flexDirection:"column",
       
        justifyContent:"center",
      marginTop:10,
      backgroundColor:"#F9F9F9",
    },
    statisticsCard:{
     flexDirection:"column",
    //  backgroundColor:"green",
     alignItems:"center", 
     justifyContent:"center",
    //  marginTop:15,
     padding:10,
     width:140
    },
    btnContainer:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-evenly",
      marginTop:10,
      // backgroundColor:"purple"
    },
    
   
    btn:{
      backgroundColor:"#85CDFD",
      width:300,
     height:45,
      borderRadius:10,
      alignItems:"center",
      justifyContent:"center", 
    }

   
})

