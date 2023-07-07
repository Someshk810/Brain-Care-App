import React, { useState, useRef,useEffect } from 'react';
import { Keyboard,BackHandler,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Screens
import HomeScreen from './tabs/HomeScreen';
// import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from './tabs/DetailsScreen';
import RateUs from './tabs/RateUs';
import ContactUsScreen from '../screens/ContactUsScreen';
import TumorDetectionScreen from '../screens/TumorDetectionScreen';
// import Vinayak from './screens/Vinayak';

//Screen names
const homeName = "Home";
const reactAtUs = "ContactUs";
const settingsName = "RateUs";
const tumorsName = 'TumorDetection';

const Tab = createBottomTabNavigator();

function MainContainer() {
  const [keyboardShown, setKeyboardShown] = useState(false);

  


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardShown(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardShown(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const getDisplay = (flag)=>{
    if(!flag){
      return 'flex';
    }else{
      return 'none';
    }
  }

  return (
      <Tab.Navigator
        initialRouteName={homeName}
        listeners={{ focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton)
                      ,blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
          }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (rn === reactAtUs) {
              iconName = focused ? 'list' : 'list-outline';
              return <Ionicons name={iconName} size={size} color={color} />;

            } else if (rn === settingsName) {
              iconName = focused ? 'star' : 'star-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if(rn === tumorsName) {
              iconName = focused ? "bug":"bug";
              // return <FontAwesomeIcon icon="fal-light fal-brain" style={{color: "#ff9500",}} />
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            "paddingBottom": 10,
            "fontSize": 10
          },
          tabBarStyle: [
            {
              "display": getDisplay(keyboardShown),
            },
            null
          ]
        })}>

        <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown: false}}  />
        <Tab.Screen name={reactAtUs} component={ContactUsScreen} options={{headerShown: false}} />
        <Tab.Screen name={tumorsName} component={TumorDetectionScreen} options={{headerShown: false}}/>
        <Tab.Screen name={settingsName} component={RateUs} options={{headerShown: false}}/>
        
        

      </Tab.Navigator>
  );
}

export default MainContainer;