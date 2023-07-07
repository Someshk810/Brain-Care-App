// import { async } from '@firebase/util';
import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Dimensions, StyleSheet, Image , KeyboardAvoidingView, Keyboard} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width, height } = Dimensions.get('window');  

const ChatBot = ({navigation}) => {
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you today?\nHere are few navigation buttons which might help you!!', fromUser: false, timestamp: Date.now(), options: ['Navigate to tumor detection page', 'Navigate to Contact Us page', 'Explore current homepage'] }]);
  const [inputText, setInputText] = useState('');
  const yourRef = useRef(null);
  const [showChat, setShowChat] = useState(false);
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

  //delay creator while navigating from chatbot to screen
  const delay = (func) => new Promise((res) => setTimeout(func, 2000));
  const syncTimeout = async (func) => {
    await delay(func); 
  };

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }




  const sendMessage = (text) => {
      setMessages((prevMessages)=>[...prevMessages, { text: text, timestamp: Date.now(), fromUser: true }]);
      setMessages((prevMessages)=>[...prevMessages, { text: '...', timestamp: Date.now(), fromUser: false }]);
    setInputText('');
    // console.log(text);
    // Simulate a delay while the chatbot "thinks" about its response
    setTimeout(() => {
      // Generate a response based on the user's input
      let responseText = '';
      let options = [];
      switch (text.toLowerCase()) {
        case 'hi':
        case 'hello':
          responseText = 'Hello! How can I help you today?\nHere are few navigation options which might help you!!';
          options = ['Navigate to tumor detection page', 'Navigate to Contact Us page', 'Explore current homepage'];
          break;
        case 'navigate to tumor detection page':
          setMessages((prevMessages)=>[...prevMessages.slice(0,-1),{ text: 'Thankyou for using our Chatbot😊', fromUser: false,timestamp: undefined, options },{ text: 'You will soon be redirected to Tumor Detection Page', fromUser: false, timestamp: Date.now(), options }]);
          syncTimeout(
            ()=>{
                navigation.navigate('TumorDetection');
                toggleChat();
              }
          );
          return;
          case 'navigate to contact us page':
            setMessages((prevMessages)=>[...prevMessages.slice(0,-1),{ text: 'Thankyou for using our Chatbot😊', fromUser: false,timestamp: undefined, options },{ text: 'You will soon be redirected to Contact Us Page', fromUser: false, timestamp: Date.now(), options }]);
            syncTimeout(
              ()=>{
                  navigation.navigate('ContactUs');
                  toggleChat();
                }
            );
            return;
            case 'explore current homepage':
              setMessages((prevMessages)=>[...prevMessages.slice(0,-1),{ text: 'Thankyou for using our Chatbot😊', fromUser: false, timestamp: Date.now(), options }]);
              syncTimeout(
                ()=>{
                    toggleChat();
                  }
              );
              return;
        case 'book a flight':
          responseText = 'Sure, where are you flying from?';
          options = ['new york'];
          break;
        default:
          responseText = "I'm sorry, I didn't understand that. Can you please rephrase?";
          break;
      }
      // Add the chatbot's response to the messages list
      // console.log(messages,'hello');
      setMessages((prevMessages)=>[...prevMessages.slice(0,-1),{ text: responseText, fromUser: false, timestamp: Date.now(), options }]);      
    }, 1000);
  };

  const toggleChat = () => {
    if(showChat){
      setMessages((prevMessages)=>[ { text: 'Hello! How can I help you today?\nHere are few navigation buttons which might help you!!', fromUser: false, timestamp: Date.now(), options: ['Navigate to tumor detection page', 'Navigate to Contact Us page', 'Explore current homepage'] }]);
    }
    setShowChat(!showChat);
  };
  
  return (
    <View style={{zIndex: 5}}>
      {showChat ? (
        // Render your chat interface here
        <KeyboardAvoidingView style={{flex:1,}} behavior="padding" enabled>
        <View style={[keyboardShown?styles.floatingCardShift:styles.floatingCard]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>BrainCare ChatBot</Text>
          <TouchableOpacity onPress={toggleChat}>
            <Text style={styles.closeBtn}>&times;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.messagesContainer}>

          <FlatList
            style={{zIndex: 10}}
            data={messages}
            ref={yourRef}
            onContentSizeChange={() => yourRef.current.scrollToEnd() }
            onLayout={() => yourRef.current.scrollToEnd() }
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => (
              <>
                <View style={[item.fromUser?styles.messageBubbleforUser:styles.messageBubbleforBot, item.fromUser ? styles.fromUser : styles.fromBot]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                  {item.options && item.options.length > 0 && (
                    <View style={styles.optionsContainer}>
                      {item.options.map((option,idx) => (
                        <TouchableOpacity key={idx} style={styles.optionButton} onPress={() => sendMessage(option)}>
                          <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                      ))
                      }
                    </View> 
                  )}
                </View>
                {item.timestamp ? ( 
                  <View style={[item.fromUser ? styles.timeStampFromUser : styles.timeStampFromBot]}>
                    <Text style={styles.messageTimestamp}>{formatTime(new Date(item.timestamp))}</Text>
                  </View>
                  ):<></>
                }
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            onSubmitEditing={()=>{sendMessage(inputText)}}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
          />
          <TouchableOpacity style={styles.sendButton} onPress={()=>sendMessage(inputText)}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      </KeyboardAvoidingView>
      ) : (
        // Render your floating button here
        // <TouchableOpacity
        //   onPress={toggleChat}
        //   style={styles.floatingWelcomeCard}
        //   >
        //     <View style={styles.cardContent}>
        //       <View style={styles.cardHeader}>
        //         <Text style={styles.cardBody}>Hello There 👋</Text>
        //       </View>
        //       <View style={{...styles.cardBody}}>
        //         <Text style={{width:'100%',alignSelf:'center',color:'blue',textAlign:'center'}}>Chat Now</Text>
        //       </View>
        //     </View>
        // </TouchableOpacity>
        <>
        
        </>
      )}
       <TouchableOpacity
          onPress={toggleChat}
          style={{...styles.floatingIcon }}
        >
          <Image source={require('../assets/chatbot_icon.png')}
                style={{width:70,height: 70, borderRadius:30,borderWidth:10,borderColor:'skyblue'}}  />
          {/* <Text style={{ color: 'white', fontSize: 24 }}>?</Text> */}
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingIcon: {
    position: 'absolute',
    left:width-100,
    top:height-230,
    width: 70,
    height: 70,
    backgroundColor: '#537FE7',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent:'center',
  },
  floatingWelcomeCard: {
    position: 'absolute',
    left:width-160,
    top:height-300,
    backgroundColor: 'white',
    borderWidth:.4,
    borderBottomLeftRadius:10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    opacity:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 
  floatingCard: {
    position: 'absolute',
    left:width-360,
    top:height-650,
    borderRadius: 10,
    backgroundColor:'#3795BD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingCardShift: {
    position: 'absolute',
    left:width-360,
    borderRadius: 10,
    backgroundColor:'#3795BD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header:{
    padding:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight:10,
    color: 'white',
  },
  headerText:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
  },
  
  messagesContainer: {
    flex:1,
    flexGrow :1,
    padding: 10,
    height:300,
    
    backgroundColor: '#fdfdfd',
  },
  messageBubbleforUser: {
    maxWidth: '80%',
    padding: 10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    marginBottom: 10,
  },
  messageBubbleforBot: {
    maxWidth: '80%',
    padding: 10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    marginBottom: 10,
  },
  fromUser: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    color: '#fff',
  },
  fromBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  timeStampFromUser: {
    alignSelf: 'flex-end',
  },
  timeStampFromBot: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#fdfdfd',
    borderColor: '#3795BD',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  optionText: {
    color: '#3795BD',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fdfdfd',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#3795BD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  cardContent: {
    padding: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    paddingTop: 5,
  },
  messageTimestamp: {
    marginLeft: 10,
    fontSize: 12,
    color: '#999',
  },
});

export default ChatBot;
