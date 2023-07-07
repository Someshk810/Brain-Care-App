import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { NetworkInfo } from 'react-native-network-info';
import * as ImagePicker from 'expo-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PermissionsService from '../permissions';

import DocumentPicker from 'react-native-document-picker';

// axios.interceptors.request.use(
//   async config => {
//     let request = config;
//     request.headers = {
//       'Content-Type': 'application/json',
//     };
//     request.url = configureUrl(config.url);
//     return request;
//   },
//   error => error,
// );

export const {height, width} = Dimensions.get('window');

export const fonts = {
  Bold: {fontFamily: 'sans-serif'},
};

const options = {
  title:'Select Image',
  type:'library',
  options:{
    maxHeight:256,
    maxWidth:256,
    selectionLimit:1,
    mediaType:'photo',
    includeBase64: true
  }
};

export default function TumorDetectionScreen({navigation}){
  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const isDarkMode = useColorScheme() === 'light';
  const [image, setImage] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getPredication = async (params,body ={}) => {
    return new Promise((resolve, reject) => {
      const bodyFormData = new FormData();
      console.log(params);
     
      bodyFormData.append('file',{
        uri:params.uri,
        name:'image.jpeg',
        fileName:'image',
        type: 'image/jpeg'
      });
      // bodyFormData.append('name',"My name");
      const url = Config.URL;

      
      // 192.168.92.16 ipconfig
       return fetch(`http://192.168.87.162:8000/predict`, {
        method: 'POST',
        headers: {
            Accept :'*/*',
            'Content-Type':'multipart/form-data'
        },
        body: bodyFormData,
      })
        .then((response) =>{
          if(response.status !== 200){
            console.log("not connected to localhost");
          }
          return response.json()
        })
        .then((response) => {
          console.log('response',JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          console.log('error', error);
          reject(error);
        });
      // return axios
      //   .post('http://192.168.0.104:8000/upload',{
      //     Headers:{
      //           'Accept':'*/*',
      //           'Content-Type': 'multipart/form-data',
      //     },
      //     body:bodyFormData
      //   })
      //   .then(response => {

      //     return response.data;
      //   }).then((response)=>{
          
      //     console.log(response);
      //     resolve(response);
      //   })
      //   .catch(error => {
      //     setLabel('Failed to predicting.');
      //     reject('err', error);
      //   });
    });
  };

  const manageCamera = async type => {
    try {
      if (!(await PermissionsService.hasCameraPermission())) {
        return [];
      } else {
        if (type === 'Camera') {
          openCamera();
          console.log("I am here")
        } else {
          openLibrary();
          console.log("I am there")
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openCamera = async () => {
    // launchCamera(options, async response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const uri = response?.assets[0]?.uri;
    //     const path = Platform.OS !== 'ios' ? uri : 'file://' + uri;
    //     getResult(path, response);
    //   }
    // });
    console.log('camera opend')
  };

  const clearOutput = () => {
    setResult('');
    setImage('');
    setLabel('');
  };


  const getResult = async ( response) => {
    // setImage(path);
    setLabel('Predicting...');
    setResult('');
    
    const params = {
      uri: response.uri,
    };
    try{

        const res = await getPredication(params);
        console.log(res+"res");
        
        console.log("OK",res.ismri);
        if(!res.ismri) {
          Alert.alert("Please input a proper MRI brain Image. Please Try Again!!  ");
          setResult('');
          setImage('');
          setLabel('');
        } else if (res.class) {
          setLabel(res.class);
          setResult(res.confidence);
        }
      }catch(e){
        Alert.alert("There's issue with the image input file. Please Try Again!!");
        setResult('');
        setImage('');
        setLabel('');
      }
  };

  const openLibrary = async () => {

    // const result = await DocumentPicker.pickSingle({
    //   type:[DocumentPicker.types.images]
    // })
    // if(result[0]){
    //   setImage(result[0].uri);
    // }
    const result = await ImagePicker.launchImageLibraryAsync(options);
    console.log("result",result);
    if (!result.cancelled) {
        setImage(result.uri);
        // console.log(result);
        getResult(result);
    }
    
  };

  return (
    <View style={[backgroundStyle, styles.outer]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <ImageBackground
        blurRadius={10}
        source={{uri: 'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649__340.jpg'}}
        style={{height: height, width: width}}
      /> */}
      <Text style={styles.title}>{'Brain Tumor🧠 \nDetection App'}</Text>
      <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
        <Image source={{uri: 'clean'}} style={styles.clearImage} />
      </TouchableOpacity>
      {(image?.length && (
        <Image source={{uri: image}} style={styles.imageStyle} />
      )) ||
        null}
      {(result && label && (
        <>
        <View style={styles.mainOuter}>
          <Text style={[styles.space, styles.labelText]}>
            {'Label: \n'}
            <Text style={styles.resultText}>{label}</Text>
          </Text>
          <Text style={[styles.space, styles.labelText]}>
            {'Confidence: \n'}
            <Text style={styles.resultText}>
              {parseFloat(result).toFixed(2) + '%'}
            </Text>
          </Text>
        </View>
        <View style={styles.btn}>  
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {clearOutput()}}
          style={styles.btnStyle}>
          <Text style={{fontSize:20}}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {navigation.navigate('HospitalFilterScreen')}}
          style={styles.btnStyle}>
          <Text style={{fontSize:20}}>View Hospitals</Text>
        </TouchableOpacity>
      </View>
        
      </>
      )) ||
        (image && <Text style={styles.emptyText}>{label}</Text>) || (
          <>
          
          <Text style={styles.emptyText}>
            Use below button to select a Brain Mri Image.
          </Text>
          <View style={styles.btn}>  
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => manageCamera('Photo')}
          style={styles.btnStyle}>
          <Text style={{fontSize:20}}>UPLOAD</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {navigation.navigate('HospitalFilterScreen')}}
          style={styles.btnStyle}>
          <Text style={{fontSize:20}}>View Hospitals</Text>
        </TouchableOpacity>
      </View>
          </>
        )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    position: 'absolute',
    top: ( 35) || 10,
    fontSize: 40,
    ...fonts.Bold,
    color: 'black',
  },
  clearImage: {height: 40, width: 40, tintColor: '#FFF'},
  mainOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: height / 1.6,
    alignSelf: 'center',
  },
  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F0EEED',
  },
  btn: {
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  btnStyle: {
    backgroundColor: '#FFF',
    opacity: 0.8,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
  },
  imageStyle: {
    marginBottom: 50,
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: 20,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'black',

    top: height / 4.5,
  },
  clearStyle: {
    position: 'absolute',
    top: 100,
    right: 30,
    tintColor: '#FFF',
    zIndex: 10,
  },
  space: {marginVertical: 10, marginHorizontal: 10},
  labelText: {color: 'black', fontSize: 30, ...fonts.Bold},
  resultText: {fontSize: 32,color:'#865DFF', ...fonts.Bold},
  imageIcon: {height: 40, width: 40, tintColor: '#000'},
  emptyText: {
    position: 'absolute',
    top: height / 1.7,
    alignSelf: 'center',
    color: 'black',
    fontSize: 25,
    maxWidth: '80%',
    height:100,
    ...fonts.Bold,
  },
});
