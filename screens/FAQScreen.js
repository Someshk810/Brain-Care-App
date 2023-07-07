import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'Which type of Image should I upload ?',
    content: "MRI Image of Brain.",
  },
  {
    title: 'Do I get to know the type of Tumor',
    content: "No, for instance we only show the presence or absence of Tumor."
  },
  {
    title: 'Is this APP paid ?',
    content: "No, it is absolutely free."
  },
  
   {
    title: 'Does Brain Care have its own hospitals?',
    content: "No, Brain Care does not own any hospital. Brain Care works in association with other hospitals"
  },
  
   
  
];

export default class FAQScreen extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
      
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItem:"space-between"}}>
        <Text style={{...styles.headerText}}>{section.title}</Text>
         <Image
        style={{...styles.headerText,marginTop:5,width:20,height:20}}
        
         source={isActive ? require('../assets/up-arrow.png') : require('../assets/down-arrow.png')}
      />
     </View>
       
      </Animatable.View>
       
     

      
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.activeContent : styles.inactive]}
        transition="backgroundColor"
      >
        <Text>{section.content}</Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
       <View style={[styles.accordianContainer,styles.shadowProp]}>
      
        <ScrollView contentContainerStyle={{  }}>
          <View style={styles.multipleToggle}>
            <Text style={styles.multipleToggle__title}> FAQ's </Text>
          </View>
          <Collapsible collapsed={this.state.collapsed}>
           
          </Collapsible>
          <Accordion
            align="bottom"
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
          
          
        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: Constants.statusBarHeight,
    justifyContent:"center",
    alignItem:"center",
  },
  accordianContainer:{
    backgroundColor:"#F3F3F7",
    margin:10,
   padding:10,
   borderRadius:10
   
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderRadius:5
  },

  
  headerText: {
   
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
 margin:10,
    
    color:"red",
    padding: 20,
   
  },
  active: {
   
    marginVertical:5,
    marginHorizontal:7,
   
    
    
    backgroundColor: 'white',
     borderRadius:5
  },
  inactive: {
    
    marginHorizontal:7,
    marginVertical:5,
    height:70,
    
    backgroundColor: 'white',
     borderRadius:5
  },
  activeContent:{
      marginTop:0,
      // marginHorizontal:7,
    backgroundColor:"white",
    
    // flexDirection:"row",
     borderRadius:5
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:20,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 22,
    marginRight: 8,
  textDecorationLine: 'underline',
  fontWeight:"bold"
  },
  shadowProp: {  
    shadowOffset: {width: -2, height: 3},  
    shadowColor: '#171717',  
    shadowOpacity: 0.5,  
    shadowRadius: 3, 
   
  },  
  
});