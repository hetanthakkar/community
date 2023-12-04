import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { horizontalScale } from './util/theme'
import EmojiSelector from 'react-native-emoji-selector'

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // Array to store messages
  const [text, setText] = useState(''); // Array to store messages
  const [isEmojiSelectorVisible, setIsEmojiSelectorVisible] = useState(false);
  const textInputRef = React.createRef(); // Initialize the ref

  const handleEmojiSelected = (emoji) => {
    console.log('Selected Emoji:', emoji);
    // Append emoji to message and update state
    setMessages([...messages, { text: emoji }]);
    setIsEmojiSelectorVisible(false);
  };

  const showEmojiSelector = () => {
    setIsEmojiSelectorVisible(true);
  };

  const sendMessage = (text) => {
    // Update state with new message
    setMessages([...messages, { text }]);
    // Clear input field
    textInputRef.current.clear();
  };

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      backgroundColor: '#F0F0F0',
    }}>
      <ScrollView>
        <FlatList
          data={messages} // Render each message in the list
          renderItem={({ item }) => (
            <Text style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}>{item.text}</Text>
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
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            resizeMode="contain"
            source={require('./assets/emoji.png')}
          />
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
          }}>Send</Text>
        </TouchableOpacity>

      </View>

      {isEmojiSelectorVisible &&
        <EmojiSelector
          style={{
            height: 450,
          }}
          visible={isEmojiSelectorVisible}
          onEmojiSelected={handleEmojiSelected}
        />
      }
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
