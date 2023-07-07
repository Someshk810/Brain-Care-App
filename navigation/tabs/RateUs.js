import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity,Button,TextInput,KeyboardAvoidingView ,ToastAndroid, Alert} from 'react-native';
import Constants from 'expo-constants';
import RadioGroup from 'react-native-radio-buttons-group';

import db from '../../firebase';
import { getDatabase, ref, onValue,set,push} from "firebase/database";
import { getAuth } from 'firebase/auth';

export default function RateUs() {
  const [selectedRadioValue, setSelectedRadioValue] = React.useState(null);
  const [defaultstar,newstar] = React.useState(2);
  const [max,setmax] = React.useState([1,2,3,4,5]);
  const [review, setReview] = React.useState('');
  const [databaseReviewCount,setDatabaseReviewCount] = React.useState(0);
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleRadioSelect = (value) => {
    setSelectedRadioValue(value);
  };

  const Fetchdata = async ()=>{
    const user = getAuth().currentUser;
    const starCountRef = ref(db, 'Profile/'+user.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setName(data.name);
      setLocation(data.location);
    },{
      onlyOnce:true
    });
  
  }

  React.useEffect(() => {
    const ok = Fetchdata();
    return () => {     
    }
  }, [])
  
  const dataAddOn = async () =>{
      push(ref(db,`Feedback/`),{
        name:name,
        location:location,
        rating: defaultstar,
        recommended:  selectedRadioValue,
        reviewMsg: review,
        });
      ToastAndroid.show('Review Submitted Successfully!', ToastAndroid.SHORT);  
      Alert.alert("Your review has been submited successfully.");
      newstar(2);   
      setSelectedRadioValue(null);
      setReview('');
      setDatabaseReviewCount(databaseReviewCount+1);
  }


  
  // const [recommend, setRecommend] = React.useState('');

  const Rating = () =>{

    return(
      <View style={{flexDirection:"row",width:300,justifyContent:"space-evenly",padding:10,marginLeft:"auto",marginRight:"auto"}}>
        {max.map((val,idx)=>{
            if(val <= defaultstar)
            {
              return (
                <TouchableOpacity
                key={idx}
                  onPress={() => newstar(val)}
                  >
                <Image source={require("../../assets/starfill.png")} style={{height:30,width:30}}/>
                </TouchableOpacity>
              )
            }
            else{
              return (
                <TouchableOpacity
                key={idx} 
                onPress={() => newstar(val)}
                >
                <Image source={require("../../assets/starempty.png")} style={{height:30,width:30}}/>
                </TouchableOpacity>
              )
            }
          }
        )}
      </View>  
    );
  }

  const RadioButtons = ()=>{
    return (
      <View style={styles.radioContainer}>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleRadioSelect('yes')}
        >
          {selectedRadioValue === 'yes' && (
            <View style={styles.radioButtonSelected}>

            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.radioButtonLabel}>Yes</Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleRadioSelect('no')}
        >
          {selectedRadioValue === 'no' && (
            <View style={styles.radioButtonSelected}>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.radioButtonLabel}>No</Text>
      </View>
    </View>
    );
  }

  return (
    <View style={{margin:"auto",flex:1,alignItems:"center",justifyContent:"center"}}>
    <KeyboardAvoidingView>
    <Text style={{fontWeight:"bold",marginBottom:25,marginLeft:"auto",marginRight:"auto",fontSize:22}}>How would u like to rate our App?</Text>
    <Rating />
    <Text style={{fontWeight:"bold",marginTop:3,fontSize:20,marginLeft:"auto",marginRight:"auto"}}>{defaultstar}/5</Text>


    <View style={{alignItems:"center",marginBottom:20,marginTop:50}}>
    <View>
    <Text style={{fontSize:18,fontWeight:"bold",color:"grey"}}>
    Would you recommend our App?
    </Text>
    </View>
      <RadioButtons/>
    </View>

    <View style={{marginBottom:50}}>
    <TextInput
    multiline={true}
    numberOfLines={5}
    value= {review}
    onChangeText={text => setReview(text)}
    placeholder="Write your review about our App here"
    style={{ height:130,width:350,textAlignVertical: 'top',borderWidth:1,borderRadius:10,padding:15}}/>
    </View>


    

    
    <View style={{marginTop:20,width:200,marginRight:"auto",marginLeft:"auto",borderRadius:20,}}>

   
<TouchableOpacity 

      onPress={dataAddOn} style={{...styles.social_btn,backgroundColor:'#28388f',marginTop:20}} >
        <Text style={{width:'80%',textAlign:'center',fontSize:18,fontWeight: 'bold',color:'#fff'}} >Submit</Text>
     </TouchableOpacity>


</View>
    </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  social_btn:{
        height:55,
        width:'100%',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ddd',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20,
        justifyContent:"center"
    },
    radioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal:10,
    },
    radioButton: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 50,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    radioButtonSelected: {
      backgroundColor: 'grey',
      borderRadius: 50,
      width: 16,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioButtonLabel: {
      marginLeft: 4,
      fontSize:16,
      fontWeight:'bold',
    },
});