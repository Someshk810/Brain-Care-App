import { Linking } from 'react-native';

import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image,SafeAreaView,ScrollView } from 'react-native';

import React, { useState ,useEffect} from "react";
import Checkbox from "expo-checkbox";


import { getAuth, signOut } from "firebase/auth";

import db from '../firebase';
import { getDatabase, ref, onValue,set,push} from "firebase/database";

const ContactForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);


    const fetchData = async ()=>{
        const user = getAuth().currentUser;
        const starCountRef = ref(db, 'Profile/'+user.uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
        //   setDatabaseReviewCount(Object.keys(data).length);
        // for(const key of Object.keys(data)){
        //     console.log(data[key].doctors)        
        // }
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        });
      }

      useEffect(() => {
        fetchData();
        
        return () => {
          
        }
      }, [])
  

  const submit = () => {
    if (!name || !email || !phone || !message) {
      alert("Plzz fill all the fields");
    } else {
      push(ref(db,'Contact_Us/'),{
        name,
        email,
        phone,
        message
        }).then(()=>{
          setMessage("");
          setAgree(false);
          alert(`Thank You ${name}`);
        });
      
    }
  };

  return (
    <View style={styles.contactContainer}>

    <View style={styles.header}>
      <Text style={styles.mainHeader}> Contact </Text>
      <Image style={{height:45,width:45, marginTop: 10}}
      source={require("../assets/call.png")}/>
      </View>

      <Text style={styles.description}>
        We'll respond as soon as possible 
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Name* </Text>
        <TextInput
          style={{...styles.inputStyle}}
          placeholder={"Enter Your Name"}
          value={name}
          onChangeText={(userdata) => setName(userdata)}
        />
      </View>

      <View style={{height:1,backgroundColor:"black"}}></View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Email* </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={"Enter Your Email"}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={{height:1,backgroundColor:"black"}}></View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Mobile No* </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={"Enter Your Mobile No"}
          value={phone+""}
          onChangeText={(phone) => setPhone(phone)}
          keyboardType="numeric"
        />
      </View>
      <View style={{height:1,backgroundColor:"black"}}></View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> How can we help you? * </Text>
        <TextInput
          style={[styles.inputStyle, styles.multilineStyle, {borderWidth: 1,paddingLeft:10,color:"black",marginTop:10,fontSize:14}]}
          placeholder={"Write Your Message Here"}
          value={message}
          onChangeText={(msg) => setMessage(msg)}
          numberOfLines={5}
          multiline={true}
        />
      </View>

      {/* checkbox  */}

      <View style={styles.wrapper}>
        <Checkbox
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "#4630EB" : undefined}
        />
        <Text style={{...styles.wrapperText,marginTop:-3}}>
          I accept the 
        </Text>
        <TouchableOpacity>
         <Text style={{...styles.wrapperText,color:"blue",marginLeft:2,fontSize:12,marginTop:-3}}>
          Terms of Service
        </Text>
         </TouchableOpacity>
      </View>

      {/* submit button  */}

      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: agree ? "#4630EB" : "grey",
          },
        ]}
        disabled={!agree}
        onPress={submit}>
        <Text style={styles.buttonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
};



const ContactScreenTopBar = ()=>{
  const contactDetails =[{image: require('../assets/email_black.png'),type:"Mail", value:"abcd@gmail.com",action:"mailto:kshirsagarsomesh08@gmail.com"},{image: require('../assets/pin.png'),type:"Address", value:"123,Cross Street, Sector 78,Mumbai 22233",action:"https://www.google.com/maps"},{image: require('../assets/phone.png'),type:"Phone", value:"+325-2358-66700",action:`tel:${7506183558}`}]
  return(
        
        <View style={{flex:1}}>

        <View style={{ justifyContent:"center",alignItems:"center", marginTop:20,marginLeft:85,marginRight:15,width:"50%",padding:10}}>
        <Text style={{fontSize:22,fontWeight:"bold"}}> Reach Us At </Text>
         
        </View>
        <View style={{height:2, width:"100%", backgroundColor:'black'}}></View>


    <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",marginVertical:8,borderRadius:10,paddingTop:6}}>
     
    <ContactCard details={contactDetails[0]}/>
   

   <ContactCard details={contactDetails[1]}/>
  


    <ContactCard details={contactDetails[2]}/>
    
 

   
   {/* {values.map(x=> <ContactCard image={x.image} type={x.type} value={x.value}/>)} */}

    </View>
        </View>



  );
}



const ContactCard =(props)=>{
 
 return(
<View style={{...styles.container}} >
<View style={{flexDirection:"row",alignItem:"center",justifyContent:"center"}}>
    <TouchableOpacity onPress={() => Linking.openURL(props.details.action)} >
    <Image style ={{...styles.imageContainer}} source ={props.details.image} />
    </TouchableOpacity>

     <TouchableOpacity onPress={() => Linking.openURL(props.details.action)} >
    <View style={{color: 'blue',marginLeft:10}}>
     <Text style={{fontSize:18}}>{props.details.type}</Text>
     </View>
      </TouchableOpacity>

</View>    

    </View >
 )
    
}




const ContactUsScreen = ()=>{
  
  return(
    <View style={{padding:10, backgroundColor:'white'}}>

    <ScrollView>
     <ContactScreenTopBar/>
     <View style={{height:2, width:"99%", backgroundColor:'grey'}}></View>
   <ContactForm/>
   

   
     
       </ScrollView>
    </View>
  );
}


export default ContactUsScreen;


const styles = StyleSheet.create({

 
  container:{
    padding:10,
      marginBottom:6,
      // backgroundColor:"#ECF2FF",
    
      flexDirection :"column",
     justifyContent:"center",
     alignItems:"center",
      width: "30%",
      borderRadius:10

  },
  imageContainer:{
    height:25, width:25
  },
  
  contactContainer: {
    backgroundColor:"#F0EEED",
    marginTop:20,
    marginHorizontal:10,
    paddingHorizontal: 20,
    borderRadius:15,
    paddingTop:20,
    paddingBottom:20
    
  },
  header:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  mainHeader: {
    fontSize: 24,
    color: "#344055",
    fontWeight: "500",
    paddingTop: 15,
    // paddingBottom: 8,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 13,
    color: "#7d7d7d",
    paddingBottom: 5,
    marginLeft:6,
    lineHeight: 20,
  },

  inputContainer: {
    marginTop: 12,
  },
  labels: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    paddingBottom: 0,
  
    lineHeight: 20,
  },
  inputStyle: {
    fontSize:14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
    color:"black"
  },
  multilineStyle: {
    paddingVertical: 4,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginBottom:20
  },
  buttonText: {
    color: "white",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
    
  },
  wrapperText: {
    fontSize:12,
    marginLeft: 10,
    color: "#7d7d7d",
    
  },

});