import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image,ImageBackground,TouchableOpacity } from 'react-native'
import {Colors} from '../constant/Color'
import Buttons from '../components/Button'


const Onboarding = ({navigation}) => {
    return (
        <View style={{flex:1,backgroundColor:'#fff'}} >
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* handshake image */}
            <View style={{flex:3,flexDirection:"column",justifyContent: 'center',alignItems: 'center',backgroundColor:'white'}} >
                <ImageBackground source={require('../assets/images/n.jpeg')}
                style={{width:300,height: 300,backgroundColor:'#fff'}}  />
            </View>

            {/* button and text */}
            <View style={{flex:2,backgroundColor:'#fff'}} >
                {/* Text part */}
                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff'}} >
                    {/* <Text style={{fontWeight:'bold',color:'000',fontSize:30}} >Brain Care App</Text> */}
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 40, color: '#000'}}>
                        Brain
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 40, color: '#64beff'}}>
                        Care
                    </Text>
                    </View>
                    <Text style={{maxWidth:'50%',fontStyle: 'italic',color:"#999",fontSize:14, textAlign:'center',paddingTop:10}} >All new in one place, be the first to know last new</Text>
                </View>   

                {/* Button */}
                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}} >
                    {/* <TouchableOpacity style={{justifyContent:'center',width:'90%',backgroundColor:Colors.primary,height:50,marginBottom:30,borderRadius:10}} 
                    onPress={()=>navigation.navigate("Login")}
                    >
                        <Text style={{fontSize:15,letterSpacing:1.5,textAlign:'center',position:'relative',fontFamily:'OpenSans-SemiBold',color:Colors.white}} >Get Started</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={()=>navigation.replace('Login')} style={{...styles.social_btn,backgroundColor:'#28388f'}} >
                    <Text style={{width:'80%',textAlign:'center',fontSize:18,fontWeight: 'bold',color:'#fff'}} >Get Started</Text>
                    </TouchableOpacity>

                </View>

            </View>
            
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({
  social_btn:{
        height:55,
        width:'95%',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ddd',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20,
        justifyContent:"center"
    },
})