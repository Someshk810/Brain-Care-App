import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Alert, ActivityIndicator ,Modal , BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import auth from '@react-native-firebase/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import db from '../firebase';
import { getDatabase, ref, onValue,set} from "firebase/database";
import { useFocusEffect } from '@react-navigation/core';




const Login = ({navigation}) => {

    const [formData,setformData] = useState({
        email:'',
        password:''
    })

    useFocusEffect(() => {
        const backAction = () => {
          Alert.alert('Confirmation!', 'Do you want to close the app', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      });
    
    const [showModal,setShowModal] = useState(false);
    const loginHandler = ()=>{
        // if(formData.email.toLowerCase() !== 'admin@gmail.com'){
        //     Alert.alert('Please enter registered mail id');
        //     setformData({
        //         email:'',
        //         password:''
        //     });
        //     return;
        // }else if(formData.password !== 'admin'){
        //     Alert.alert('Invalid password');
        //     setformData({
        //         email:'',
        //         password:''
        //     });
        //     return;
        // }
        setShowModal(true);
        setTimeout(()=>{
            const auth = getAuth();
            signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // console.log(user);
                // ...
                
                const starCountRef = ref(db, 'App_Details/Patients_visited');
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    set(ref(db,'App_Details/Patients_visited'),data+1);
                }, {
                    onlyOnce: true
                });
    
                
            }).then(()=>{
                setShowModal(false);
                Alert.alert("Successful","SignIn Successfull");
            })
            .then(()=>{
                navigation.replace('EntryScreen');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setShowModal(false);
                Alert.alert("Error",""+errorCode);
            });
        },1000)
        
        
        
    }

    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff',flexDirection:'column'}}>
             <Modal
                transparent={true}
                animationType={'none'}
                visible={showModal}
                style={{ zIndex: 1100 }}
                onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" animating={showModal} color="black" /> 
                    <Text>Verifying..</Text> 
                </View>
                </View>
            </Modal>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* login form section */}
            <View style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingTop:10,  paddingHorizontal:'3%'}} >         
            <View style={{flexDirection: 'row', marginTop: 40}}>
              <Text style={{fontWeight: 'bold', fontSize: 22, color: '#000'}}>
                Brain
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 22, color: '#64beff'}}>
                Care
              </Text>
            </View>


                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}} >
                    <Text style={{fontWeight:'bold',fontSize:27,color:'000'}} >Welcome Back</Text>
                    
                </View>
               
                
                <View style={{flexDirection:'column',paddingTop:20}} >
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20}} >
                        <Icon name="envelope-o" size={22} color="#818181"/>
                        <TextInput
                         onChangeText={(text)=>{setformData((prevState)=>({...prevState,email:text}))}} style={[styles.input,{placeholderTextColor: '#a5a5a5'},{fontWeight:'bold'}]} 
                        placeholder="Enter Email" 
                        placeholderTextColor="#818181" />

                    </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20,marginTop:20}} >
                        <Icon name="lock" size={22} color="#818181" />
                        <TextInput onChangeText={(text)=>{setformData((prevState)=>({...prevState,password:text}))}} style={[styles.input,{fontWeight:'bold'}]} placeholder="Enter Password" secureTextEntry={true} placeholderTextColor="#818181" />
                    </View>

                    {/*Forgot Password button*/}
                    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')} style={{width:'95%',marginBottom:10}}>
                    <Text style={{fontSize:13,fontWeight:'bold',
                    color:'red',alignSelf:"flex-end",paddingTop:10}} >Forgot Password</Text>
                    </TouchableOpacity>

                   
                </View>

            </View>

            {/* SignIn ans SignUp */}
            
            <View style={{flex:1,backgroundColor:'#fff',flexDirection:'column',paddingHorizontal:'3%'}} >

                    

                    <TouchableOpacity onPress={()=>{loginHandler()}} style={{...styles.social_btn,backgroundColor:'#28388f'}} >
                    <Text style={{width:'80%',textAlign:'center',fontSize:18,fontWeight: 'bold',color:'#fff'}} >Sign In</Text>
                    </TouchableOpacity>


                     <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} style={styles.social_btn} >
                    <Text style={{width:'80%',textAlign:'center',fontSize:18,fontWeight:'bold',color:'#333'}} >Sign Up</Text>
                    </TouchableOpacity>
            
            </View>
            
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    input:{
        position:'relative',
        height:'100%',
        width:'90%',
        fontWeight:'medium',
        paddingLeft:20,
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
    social_img:{
        width:25,
        height:25,
        marginLeft:15
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.5)',
        zIndex: 1000
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }
    
});

    
                    