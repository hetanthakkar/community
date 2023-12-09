import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { horizontalScale } from './util/theme'
import EmojiSelector from 'react-native-emoji-selector'
import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatScreen = (props) => {
  console.log(props?.route?.params?.teacher?.id,"asd")
  const [messages, setMessages] = useState([]); // Array to store messages
  const [text, setText] = useState(''); // Array to store messages
  const [isEmojiSelectorVisible, setIsEmojiSelectorVisible] = useState(false);
  const textInputRef = React.createRef(); // Initialize the ref
  const socket = useRef();
  const scrollViewRef = useRef();

  const initSocket = () => {
    socket.current = io('http://127.0.0.1:5000');
    
    // ... listen for events and clean up socket connection
  };

  useEffect(() => {
    initSocket();

    socket.current.on('conn', (data) => {
      console.log("this is data",data)
     

    });

    socket.current.on('chat', (data) => {
      console.log("this is asdjknfakjsdnf",data)
     

    });
    

    // console.log("Asdfk",socket)
    // Connect to the socket when the component mounts
    // socket.current = io('http://127.0.0.1:5000');

    // Listen for chat events
    socket.current.on('chat', (data) => {
      console.log("this is data",data)
      data=JSON.parse(data)
      setMessages([...messages, { content: data.message, sender: data.username  }]);
    });

     socket.current.emit('set_student', 1);
     socket.current.emit('set_teacher', 4);
     socket.current.emit('set_sender', 'hetanthakkar1@gmail.com');
     socket.current.emit('set_reciever', 'hetanthakkar2@gmail.com');

     const fetchSubcategories=async()=>{

      let student_id=await AsyncStorage.getItem("user_id")
      let res = await fetch('http://127.0.0.1:5000/get_chat_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          student_id: Number(student_id),
          teacher_id: props?.route?.params?.teacher?.id,
        }),
      });
      console.log("res2 sub",res)
      
      if (res.ok) {
        // const data = await res.text();
        const cat= await res.json()
        // let subcategories=cat.subcategories
        setMessages(cat)
        // props.navigation.navigate('Home');
      } else {
        
        Alert.alert('Enter valid email/password');
      }
    }
  
    fetchSubcategories()
    // Clean up socket connection when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleEmojiSelected = (emoji) => {
    console.log('Selected Emoji:', emoji);
    // Append emoji to message and update state
    setMessages([...messages, { text: emoji }]);
    setIsEmojiSelectorVisible(false);
  };

  const showEmojiSelector = () => {
    setIsEmojiSelectorVisible(true);
  };

  const sendMessage = async(text) => {

    textInputRef.current.clear();

    await socket.current.emit('new_message',[text,1,4,'hetanthakkar1@gmail.com','hetanthakkar2@gmail.com']);

  };

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      backgroundColor: '#F0F0F0',
    }}>
      <ScrollView   ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        <FlatList
          data={messages} // Render each message in the list
          renderItem={({ item }) => (
            <Text style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}>{item?.sender}: {item?.content}</Text>
          )}
          keyExtractor={(item) => item.id || Math.random().toString()} // Set unique key for each item
        />
      </ScrollView>

      <View style={{
        marginBottom: 30,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={showEmojiSelector}
        >

        </TouchableOpacity>

        <TextInput
          ref={textInputRef} // To access and clear input field
          style={{
            width: horizontalScale(200),
            height: 40,
            marginLeft: 10,
            borderWidth: 1,
            borderRadius: 23,
            paddingLeft: horizontalScale(10),
            borderColor: 'gray',
          }}
          placeholder="Message"
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => sendMessage(text)} // Send message on enter press
        />

        <TouchableOpacity onPress={() => sendMessage(text)}>
          <Text style={{
            backgroundColor: '#0066b2',
            padding: 10,
            borderRadius: 23,
            alignItems: 'center',
            marginLeft: horizontalScale(3),
            color: 'white',
            fontWeight: '600',
          }}>Send{JSON.stringify(messages.length)}</Text>
        </TouchableOpacity>

      </View>


    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
