
import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('screen');
import houses from '../constant/houses';

const nameInitial= (name)=>{

const ans =name.substring(0,1).toUpperCase();
return ans;
}

  const addImage = (rating)=>{
  var imgArr=[];
  
  for(let i=0;i<5;i++){
    if(i<rating){
    imgArr.push(
      <View key={i} style={{flexDirection:"row"}}>
      <Image
       style={{height:15,width:15,marginRight:10}}
        source={require('../assets/starfill.png')}
      />
      </View>
      );
    }
      else{
        imgArr.push(
      <View key={i} style={{flexDirection:"row"}}>
      <Image
       style={{height:15,width:15,marginRight:10}}
        source={require('../assets/starempty.png')}
      />
      </View>
      );
      }  
  }
  
  return imgArr;
}

const serviceRecommend = (temp,name)=>{
    if(temp==="yes"){
      return(
        <View style={{flexDirection:"row",alignItem:"center",justifyContent:"center",paddingHorizontal:6,paddingBottom:2}}>
         <View style={{flexDirection:"column",alignItem:"center",justifyContent:"center"}}>
        <Image
        style={{height:18,width:18}}
        source={require("../assets/like.png")}
        />
        </View>
         <View style={{flexDirection:"column",alignItem:"center",justifyContent:"center",paddingHorizontal:6}}>
        <Text style={{fontSize:13,fontWeight:"bold",color:"purple"}}>{`${name} recommended our App`}</Text>
        </View>

    
        </View>
      )
    }
}


 const Card =(props)=>{
   return (
    <View style={styles.shadowProp}>
      <View style={styles.reviewContainer}>



      <View style={styles.ratingData}>
      <View style={{flexDirection:"column",justifyContent:"center",alignItem:"center"}}>
       <View style={styles.userName}>
       <View style={{flexDirection:"row",alignItem:"center",justifyContent:"center"}}>
       <Text style={{fontSize:18,fontWeight:"bold",color:"white"}}>{nameInitial(props.data.name)}</Text>
       </View>
       </View>
        </View>

        <View style={styles.reviewData}>
        <View style={{flexDirection:"row",borderWidth:0,paddingHorizontal:10}}> 
       {addImage(props.data.rating)}
       <View><Text style={{fontSize:13,color:"grey"}}>{props.data.rating}/5</Text></View>
        </View>


         <View style={styles.userData}>
          <View style={{flexDirection:"column",alignItem:"center",justifyContent:"center",marginTop:3}}>
          <Image
          style={{height:15,width:15}}
           source={require("../assets/icons/User.png")}/>
          </View>
           <View style={{marginLeft:10,flexDirection:"column",alignItem:"center",justifyContent:"center"}}><Text style={{...styles.userText,color:"#28388F"}}>{props.data.name}</Text></View>
          </View>

           <View style={styles.userData}>
           <View style={{flexDirection:"column",alignItem:"center",justifyContent:"center"}}>
          <Image
          style={{height:15,width:15,marginTop:3}}
           source={require("../assets/pin.png")}/>
          </View>
           <View style={{marginLeft:10,flexDirection:"column",alignItem:"center",justifyContent:"center"}}><Text style={styles.userText}>{props.data.location}</Text></View>
          </View>
       </View>
      </View>




       <View style={styles.reviewMsg}>
        <View >
        <Image
        style={{height:40,width:40,backgroundColor:"",margin:-8,padding:0}}
         source={require('../assets/double-quotes-open.png')}
         /> 
        </View>
        <View style={{paddingHorizontal:30,justifyContent:"center",alignItem:"center"}}>
        <View>
        <Text style={{fontSize:13,textAlign:"justify"}}>{props.data.reviewMsg}</Text>
        </View>
        </View>
        <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
        <View>
        <Image
        style={{height:40,width:40,backgroundColor:"",marginTop:-20,padding:0}}
         source={require('../assets/double-quotes-close.png')}
         /> 
        </View>
        </View>
      </View>

      <View style={styles.recommend}>


      { serviceRecommend(props.data.recommended,props.data.name)}

      </View>

     
      </View>
       
    </View>
  );
 }


const styles = StyleSheet.create({
  
  card: {
    height: 200,
    backgroundColor: 'white',
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  facility:
   {flexDirection: 'row', marginRight: 15},

  facilityText: {marginLeft: 5, color: 'grey'},
  
  reviewContainer:{
    width:width-40,
    maxHeight:200,
    flexDirection:"column",
    backgroundColor:"#FFFFFF",
    borderWidth:0,
    borderRadius:10,
    alignItem:"center",
    justifyContent:"space-between"
  },
   ratingData:{
    
 flexDirection:"row",

 alignItem:"center",
 justifyContent:"flex-start",
 paddingHorizontal:10,
 paddingVertical:6,
 borderRadius:10
  },

  reviewMsg:{
 flexDirection:"column",


  },
   recommend:{
 flexDirection:"row",

  },

  userName:{
    marginTop:20,
    alignItem:"center",
    justifyContent:'center',
    width:55,
    height:55,
    borderWidth:2,
    borderRadius:10,
    
    backgroundColor:"#0F6292"
  },
  reviewData:{
    
    flexDirection:"column",
    alignItem:"center",
    justifyContent:'center',
    
   
  },
  userData:{
    flexDirection:"row",
    marginTop:8,
    justifyContent:"flex-start",
    paddingHorizontal:10
  },
  userText:{
    fontSize:13,
    fontWeight:"bold"

  },
   shadowProp: {  
    shadowOffset: {width: -4, height: 4},  
    shadowColor: 'grey',  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
    elevation:20,
    marginRight:20,
    borderRadius:10,
    backgroundColor:"white"
    
  },  

});

  export default Card;