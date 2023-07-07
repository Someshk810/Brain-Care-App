
import { Text, View, StyleSheet,Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
 
  // const facilities=["Wifi Service","Online Appointment","Parking","Waiting Lounge"]

const FacilityContainer =({facilites})=>{
 

  return(

<View style={{...styles.hopitalFacilitiesContainer}}>
          <View style={{flexDirection:"column",justifyContent:"center",paddingVertical:5,paddingHorizontal:20}}>
           <Text style={{fontSize:20,fontWeight:"bold"}}>
             Facilities
           </Text>
          </View>  

     <View style={{flexDirection:"row",alignItems:"center",flexWrap:"wrap",justifyContent:"space-evenly"}}> 
     {
       facilites.map((facility,idx)=>{
      return(
           <View key={idx} style={{...styles.hopitalFacility}}>
             <View>
                <Text style={{fontWeight:"bold",fontSize:10,textAlign:"center"}}>
                    {facility}
                </Text> 
              </View> 
            </View>
           )})
       }
  

          </View>
      </View>)
}
export default FacilityContainer;

const styles = StyleSheet.create({
   hopitalFacilitiesContainer:{
      flexDirection:"column",
     
      justifyContent:"center",
      marginTop:10,
       backgroundColor:"#F9F9F9",
    }, 
    hopitalFacility:{
       flexDirection:"column",
          backgroundColor:"#D0E0EF",
          borderRadius:5,
          padding:3,
          margin:10,
          width:138,
          height:30,
           alignItems:"center",
      justifyContent:"center",
         
    },
  

});