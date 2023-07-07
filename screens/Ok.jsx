import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
const Ok = ()=>{
    
    return( 
      <>
          <View>
            <Text>Multiplication Table Of 21</Text>
            <Table n = {21}/>
            <Table n = {22}/>
          </View>
          
          
      </>
    )
}

function Table(props){
  let n = props.n;
  const func = ()=>{
    const arr = [];
    for(let i = 1;i<=10;i++){
        const val = n+" * "+i+" = "+n*i;
        arr.push(<Row print = {val} />)
    }
    // console.log(arr);
    return arr;
  }
  return (
    <>
      {func()}
    </>
  )
}

const Row = (props)=>{
  
  return (
    <>
    <Text style = {{fontWeight:'bold', color:'red'}}>{props.print} </Text>
    </>
  )
}

export default Ok;