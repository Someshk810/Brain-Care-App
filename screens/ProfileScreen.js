import * as React from 'react';
import { Text, View, StyleSheet,Image,Button,TouchableOpacity,ScrollView,TextInput,Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
// import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';


import { getAuth } from "firebase/auth";
import db from '../firebase';
import { getDatabase, ref, onValue,set} from "firebase/database";


const ProfileScreen = () =>{

  const [profileImage, setProfileImage] = React.useState("");

  const [selectedValue, setSelectedValue] = React.useState('Not Entered');
  const [olddisplay,newdisplay] = React.useState(true);
  
  const [olddob,newdob] = React.useState("Pick Date");
  const [oldheight,newheight] = React.useState("Not Entered");
  const [oldweight,newweight] = React.useState("Not Entered");
  const [oldstatus,newstatus] = React.useState("Not Entered");
  const [oldbg,newbg] = React.useState("Not Entered");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState(0);
  const [location, setlocation] = React.useState("");


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
    setlocation(data.location || "");
    setPhone(data.phone || 0);
    newheight(data.height || "Not Entered");
    newweight(data.weight || "Not Entered");
    newstatus(data.status || "Not Entered");
    newbg(data.bg || "Not Entered");
    setSelectedValue(data.gender || "Not Entered");
    newvalue({
      name: data.name,
      email: data.email,
      phone: data.phone || 0,
      image: data.image || "Not Entered",
      location: data.location || "Not Entered",
      gender:data.gender || "Not Entered",
      dob: data.dob || "Not Entered",
      bg: data.bg || "Not Entered",
      height: data.height || "Not Entered",
      weight: data.weight || "Not Entered",
      status: data.status || "Not Entered",
    })
    });
  }
  React.useEffect(() => {
    fetchData();
    // console.log(userState)
    
    return () => { 
    }
  }, [])
  

//   // All about data picker
//  const [selectedDate, setSelectedDate] = React.useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };
//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };
//   const handleConfirm = (date) => {
//     setSelectedDate(date);
//     const formattedDate = moment(date).format("DD-MM-YYYY");
//     newdob(formattedDate);
//     hideDatePicker();
//   };

  const heightOptions = [];
  for (let i = 100; i <= 210; i++) {
    heightOptions.push(<Picker.Item key={i} label={`${i} cm`} value={i} />);
  }

  const weightOptions = [];
  for (let i = 10; i <= 250; i++) {
    weightOptions.push(<Picker.Item key={i} label={`${i} kg`} value={i} />);
  }

 
  const [oldvalue,newvalue] = React.useState({})


  {/*Content added from editscreen by kartik starts here */}

  
  
  const handleSave = () => {
    if (!isValidEmail(email)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email in the format of example@gmail.com or example@yahoo.com'
      );
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid 10-digit phone number'
      );
      return;
    }
    if (!location.trim()) {
      Alert.alert('Please Enter Location');
      return;
    }

    // if (olddob !== "Not Entered" && !olddob.trim()) {
    //   Alert.alert('Please Enter Date of birth');
    //   return;
    // }
    if (oldheight !== "Not Entered" && !oldheight.toString().trim()) {
      Alert.alert('Please Enter Height');
      return;
    }
    if (oldweight !== "Not Entered" && !oldweight.toString().trim()) {
      Alert.alert('Please Enter Weight');
      return;
    }
    if (oldstatus !== "Not Entered" && !oldstatus.toString().trim()) {
      Alert.alert('Please Enter Marital Status');
      return;
    }
    if (oldbg !== "Not Entered" && !oldbg.trim()) {
      Alert.alert('Please Enter Blood Group');
      return;
    }
    newvalue({
      name:name,
      email:email,
      phone:phone ? parseInt(phone) : phone,
      image:profileImage,
      location:location,
      gender:selectedValue,
      bg:oldbg,
      height:oldheight,
      weight:oldweight,
      status:oldstatus,
    });
    //this oldvalue here will get me all the profile details of the user
    console.log({
      name:name,
      email:email,
      phone:phone ? parseInt(phone) : phone,
      image:profileImage,
      location:location,
      gender:selectedValue,
      bg:oldbg,
      height:oldheight,
      weight:oldweight,
      status:oldstatus,
    });
    const user = getAuth().currentUser;
    set(ref(db,'Profile/'+user.uid+""),{
      name:name,
      email:email,
      phone:phone ? parseInt(phone) : phone,
      image:profileImage,
      location:location,
      gender:selectedValue,
      bg:oldbg,
      height:oldheight,
      weight:oldweight,
      status:oldstatus,
    })
    .then(()=>{
      Alert.alert("Your profile has been updated!!")
    })
    .then(()=>{
      newdisplay(true); 
    })
    .catch((error)=>{
      console.log(error);
    });
    

  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permissions to make this work!'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      // handleSave();
      
    }
  };

{/*Content added from editscreen by kartik ends here */}
  
  return(
    <ScrollView>
    <>
    

    {/* This is the view screen */  }
    {olddisplay &&  <View style={{padding:15,flex:1,justifyContent:"flex-start"}}>

      <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width: '100%',padding:20}}>
        <Text style={{fontSize: 20,fontWeight: 'bold',textAlign: 'center',flex: 1,}}>Profile</Text>
      </View>
      <View  style={{height:1,backgroundColor:"grey",marginTop:20}}></View>


    <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>

    <View>
        {profileImage ? (
        <Image style={{height:75,width:75,borderRadius:100}} source={{ uri: profileImage }} />
      ) : (
        <Image style={{height:75,width:75,borderRadius:100}} source={require('../assets/images/newuser.png')} />
      )}
      
    </View>

    <View style={{marginLeft:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center",flex:1}}>
    <View>
    <Text style={{fontWeight:"bold",fontSize:20}}>{oldvalue.name}</Text>
    </View>

    <View>
    <TouchableOpacity onPress={()=>{newdisplay(false)}}>
    <Image 
    source={require("../assets/editit.png")} style={{height:23,width:23}}/>

    </TouchableOpacity>

    </View>
    </View>


    </View>

    <View  style={{marginTop:20}}>

    <View style={{marginTop:10,flexDirection:"row"}}>
    <Image source={require("../assets/location.png")} style={{height:18,width:18,marginLeft:8}}/>
    <Text style={{marginLeft:20,color:"grey"}}>Location: {oldvalue.location}</Text>
    </View>

    <View style={{marginTop:15,flexDirection:"row"}}>
    <Image source={require("../assets/gmail.png")} style={{height:18,width:18,marginLeft:8}}/>
    <Text style={{marginLeft:20,color:"grey"}}>Email: {oldvalue.email}</Text></View>
      
    <View style={{marginTop:15,flexDirection:"row"}}>
    <Image source={require("../assets/phone.png")} style={{height:18,width:18,backgroundColor:"white",marginLeft:8}}/>
    <Text style={{marginLeft:20,color:"grey"}}>Phone Number: {oldvalue.phone}</Text>
    </View>

    

    </View>


    <View  style={{height:1,backgroundColor:"grey",marginTop:20}}></View>


    <View 
      style={{flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,}}>


    </View>
    <View style={styles.userInfo}>
      <Text style={styles.labelforpage1}>Gender</Text>
        <Text style={styles.info}>{oldvalue.gender}</Text>
      <View  style={{height:1,backgroundColor:"#D3D3D3"}}></View>
       {/* <Text style={styles.labelforpage1}>Date of Birth</Text>
        <Text style={styles.info}>{oldvalue.dob}</Text> */}
      <View  style={{height:1,backgroundColor:"#D3D3D3"}}></View>
      <Text style={styles.labelforpage1}>Blood Group</Text>
        <Text style={styles.info}>{oldvalue.bg}</Text>
      <View  style={{height:1,backgroundColor:"#D3D3D3"}}></View>
      <Text style={styles.labelforpage1}>Height</Text>
        <Text style={styles.info}>{oldvalue.height+""}</Text>
      <View  style={{height:1,backgroundColor:"#D3D3D3"}}></View>
      <Text style={styles.labelforpage1}>Weight</Text>
        <Text style={styles.info}>{oldvalue.weight+ ""}</Text>
      <View  style={{height:1,backgroundColor:"#D3D3D3"}}></View>
      <Text style={styles.labelforpage1}>MaritalStatus</Text>
        <Text style={styles.info}>{oldvalue.status}</Text>
      <View  style={{height:1,backgroundColor:"#D3D3D3"}}></View>
    </View>
    </View>
    
    }

  
    

   {/* This is the edit screen */}
    {!olddisplay && <View style={{padding:20}}>
      

    <View>
    {/* Kartik edited content starts here */}
      <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width: '100%',padding:20}}>
        <TouchableOpacity onPress={() => newdisplay(true)}>
          <AntDesign name="arrowleft" size={24} color="black" style={{marginLeft: 10}}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20,fontWeight: 'bold',textAlign: 'center',flex: 1,}}>Edit Profile</Text>
      </View>
      <View  style={{height:1,backgroundColor:"grey",marginTop:20}}></View>
      {
      <View style={{marginTop:20,justifyContent:"center",alignItems:"center"}}>
        {profileImage ? 
          (
            <TouchableOpacity onPress={handleImagePick}>
              <Image
                source={{ uri: profileImage }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  marginBottom: 20,
                }}
              />
            </TouchableOpacity>   
          ): 
          (<View style={styles.inputContainerr}>
              <TouchableOpacity onPress={handleImagePick}>
                <Text style={styles.dropdown}>Choose Profile Image</Text>
              </TouchableOpacity>
          </View>
          )
        }
      </View>
      }
      

      <View style={styles.inputContainerr}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.dropdown}
            selectedText={location}
            onChangeText={setlocation}
            value={location}
            placeholder="Location"
          />
        </View>

        <View style={styles.inputContainerr}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.dropdown}
            selectedText={name}
            onChangeText={setName}
            value={name}
            placeholder="Name"
          />
        </View>

        <View style={styles.inputContainerr}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>

        <View style={styles.inputContainerr}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={setPhone}
            value={phone+""}
            placeholder="Phone"
            keyboardType="numeric"
          />
        </View>


      {/* Kartik edited content ends here */}

    <View style={styles.inputContainerr}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

          style={styles.dropdown}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>


        {/* <View style={styles.inputContainerr}>
          <Text style={styles.label}>Date of Birth </Text>
   
          <TouchableOpacity onPress={()=>{showDatePicker()}}>
            <Text 
             style={styles.dropdown} >
            {`${selectedDate? moment(selectedDate).format("MM/DD/YYYY"):olddob}`}
            </Text>
        </TouchableOpacity>
          {isDatePickerVisible &&
            (
              DateTimePickerAndroid.open({
                  testID:"dateTimePicker",
                  value:selectedDate,
                  mode:'date',
                  is24Hour:true,
                  display:"default",
                  onChange:{handleConfirm}
              })
          )
          }
      </View> */}


          <View style={styles.inputContainerr}>
        <Text style={styles.label}>Blood Group</Text>
        <Picker
          selectedValue={oldbg}
          onValueChange={newbg}

          style={styles.dropdown}
        >
          <Picker.Item label="Select Blood Group" value="" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="AB-" value="AB-" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="O-" value="O-" />
        </Picker>
      </View>


      <View style={styles.inputContainerr}>
        <Text style={styles.label}>Height</Text>
        <Picker
          selectedValue={oldheight}
          onValueChange={newheight}

          style={styles.dropdown}
        >
          <Picker.Item label="Select Height" value="" />
          {heightOptions}
        </Picker>
      </View>


      <View style={styles.inputContainerr}>
        <Text style={styles.label}>Weight</Text>
        <Picker
          selectedValue={oldweight}
          onValueChange={newweight}
          style={styles.dropdown}
        >
          <Picker.Item label="Select Weight" value="" />
          {weightOptions}
        </Picker>
      </View>


      <View style={styles.inputContainerr}>
        <Text style={styles.label}>Marital Status</Text>
        <Picker
          selectedValue={oldstatus}
          onValueChange={newstatus}
          style={styles.dropdown}
        >
          <Picker.Item label="Select Marital Status" value="" />
          <Picker.Item label="Single" value="single" />
          <Picker.Item label="Married" value="married" />
          <Picker.Item label="Divorced" value="divorced" />
          
        </Picker>
      </View>
    </View>


     <View style={{marginTop:20,color:"#000"}}>
    <TouchableOpacity onPress={()=>handleSave()} style={{...styles.social_btn,backgroundColor:'#28388f',marginTop:20}} >
      <Text style={{width:'80%',textAlign:'center',fontSize:18,fontWeight: 'bold',color:'#fff'}} >Submit</Text>
     </TouchableOpacity>
    </View>
    </View>}
    </>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  
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
    
  inputContainerr: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  userInfo: {
    marginTop: 16,
  },
  labelforpage1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  info: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 12,
  },
  
});

export default ProfileScreen;