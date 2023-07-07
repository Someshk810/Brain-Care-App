import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image } from 'react-native';
import {Colors} from '../constant/color1';


const Splash = ({navigation}) => {

    setTimeout(()=>{
        navigation.replace('Onboarding')
    },2000)
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#28388f'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            {/*<Image source={require('../assets/images/n.jpeg')} style={{width:100,height:100}}  />    */}
            {/*<Text style={{fontFamily:'OpenSans-Bold',fontSize:30,color:'#fff'}} >Brain Care App</Text>*/}
             <View style={{flexDirection: 'row',}}>
                <Text style={{fontWeight: 'bold', fontSize: 35, color: 'white'}}>
                  Brain
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 35, color: '#64beff'}}>
                  Care
                </Text>
              </View>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})