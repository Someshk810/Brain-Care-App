import React, { useState,useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';


const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you today?', fromUser: false, options: ['Book a flight', 'Make a hotel reservation', 'Rent a car'] }]);
  const [inputText, setInputText] = useState('');
  const yourRef = useRef(null);


  const sendMessage = (text) => {
      // setMessages([...messages, { text: text, fromUser: false }]);
    setInputText('');
    // console.log(text);
    // Simulate a delay while the chatbot "thinks" about its response
    // setTimeout(() => {
      // Generate a response based on the user's input
      let responseText = '';
      let options = [];
      switch (text.toLowerCase()) {
        case 'hi':
        case 'hello':
          responseText = 'Hello! How can I help you today?';
          options = ['Book a flight', 'Make a hotel reservation', 'Rent a car'];
          break;
        case 'book a flight':
          responseText = 'Sure, where are you flying from?';
          options = ['new york'];
          break;
        case 'new york':
          responseText = 'And where are you flying to?';
          options = ['san francisco'];
          break;
        case 'san francisco':
          responseText = 'Great! When do you want to leave?';
          options = ['next monday'];
          break;
        case 'next monday':
          responseText = 'Okay, I found a flight leaving JFK at 10am on Monday, arriving at SFO at 2pm. Does that work for you?';
          options = ['Yes', 'No, show me other options'];
          break;
        case 'yes':
          responseText = 'Okay, your flight from JFK to SFO on Monday is booked!';
          break;
        case 'no, show me other options':
          responseText = 'Here are some other options for flights from JFK to SFO on Monday:';
          options = ['8am - 12pm', '1pm - 5pm', '6pm - 10pm'];
          break;
        default:
          responseText = "I'm sorry, I didn't understand that. Can you please rephrase?";
          break;
      }
      // Add the chatbot's response to the messages list
      // console.log(messages,'hello');
      setMessages([...messages,{ text: text, fromUser: true }, { text: responseText, fromUser: false, options }]);
    // }, 3000);
  };

  // const selectOption = (option) => {
  //   setMessages([...messages, { text: option, fromUser: true }]);
  //   // Simulate a delay while the chatbot "thinks" about its response
  //   setTimeout(() => {
  //     // Generate a response based on the user's selected option
  //     let responseText = '';
  //     let options = [];
  //     switch (option.toLowerCase()) {
  //       case '8am - 12pm':
  //         responseText = 'Okay, your flight from JFK to SFO on Monday at 8am is booked!';
  //         break;
  //       case '1pm - 5pm':
  //         responseText = 'Okay, your flight from JFK to SFO on Monday at 1pm is booked!';
  //         break;
  //       case '6pm - 10pm':
  //         responseText = 'Okay, your flight from JFK to SFO on Monday at 6pm is booked!';
  //         break;
  //       default:
  //         responseText = "I'm sorry, I didn't understand that. Can you please rephrase?";
  //         break;
  //     }
  //     // Add the chatbot's response to the messages list
  //     setMessages([...messages, { text: responseText, fromUser: false, options: options }]);
  //   }, 1000);
  // };
  return (
  <View style={styles.container}>
    <View style={styles.messagesContainer}>
      <FlatList
        data={messages}
        ref={yourRef}
        onContentSizeChange={() => yourRef.current.scrollToEnd() }
        onLayout={() => yourRef.current.scrollToEnd() }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.fromUser ? styles.fromUser : styles.fromBot]}>
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
);
}
export default Chatbot;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: '#FFF8DC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messagesContainer: {
    height: 200,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fdfdfd',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  fromUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#5d5dff',
    color: '#fff',
  },
  fromBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    color: '#000',
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
    borderColor: '#5d5dff',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  optionText: {
    color: '#5d5dff',
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
    backgroundColor: '#5d5dff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
