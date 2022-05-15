import React from 'react';
import {ScrollView} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import {screenHeight} from '../../helpers';

const Profile = props => {
  const [request, setRequest] = React.useState(false);
  const opacity = React.useRef(new Animated.Value(0)).current;
  const send = () => {
    setRequest(!request);
  };
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: props.theme == 'dark' ? '#141519' : '#f8fafd',
      }}>
      <View style={styles.header}></View>

      <Image
        style={styles.avatar}
        source={{
          uri: 'https://avatars.githubusercontent.com/u/38756320?v=4',
        }}
      />

      <View style={styles.body}>
        {request && (
          <Animated.View
            style={{
              opacity,
              transform: [
                {
                  translateY: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
              margin: 10,
              marginBottom: 5,
              backgroundColor: '#f8fafd',
              padding: 10,
              borderRadius: 4,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 6,
            }}>
            <Text>Message Sent</Text>
          </Animated.View>
        )}
        <View style={styles.bodyContent}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.info}>UX Designer / Mobile developer</Text>
          {/* <Text
            style={
              props.theme == 'dark'
                ? {...styles.description, color: '#f8fafd'}
                : styles.description
            }>
            React Native Developer looking forward to implement some cool stuff.
          </Text> */}

          {/* <Text style={styles.info1}>Project Details:</Text> */}
          {/* <Text
            style={
              props.theme == 'dark'
                ? {...styles.description, color: '#f8fafd'}
                : styles.description
            }>
            I Will be working on making a home service app using react native. I
            will be using Expo and i dont have an iphone to do testing.
          </Text> */}
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={styles.info1}>Preferrable Group Size: </Text>
            <Text style={styles.info2}>3</Text>
          </View> */}
          <TouchableOpacity style={styles.buttonContainer} onPress={send}>
            <Text style={{color: '#f8fafd', fontWeight: 'bold'}}>
              Send A Project Request
            </Text>
          </TouchableOpacity>

          {/* <Text style={styles.description1}>
            Send A Project Request To Start Chatting
          </Text>

          <TouchableOpacity style={styles.buttonContainer1} disabled>
            <Text style={{color: '#f8fafd', fontWeight: 'bold', fontSize: 16}}>
              Message
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#09C6F9',
    height: 120,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#f8fafd',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50,
  },
  name: {
    fontSize: 22,
    color: '#09C6F9',
    fontWeight: 'bold',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#09C6F9',
    marginTop: 10,
  },
  info1: {
    fontSize: 20,
    color: '#09C6F9',
    marginTop: screenHeight * 3,
    fontWeight: 'bold',
  },
  info2: {
    fontSize: 20,
    color: '#09C6F9',
    marginTop: screenHeight * 3,
    fontWeight: 'bold',
  },

  info: {
    fontSize: 20,
    color: '#09C6F9',
    marginTop: 15,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginTop: 12,
    textAlign: 'center',
  },

  description1: {
    fontSize: 16,
    color: '#F68FBE',
    marginTop: screenHeight * 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: screenHeight * 38,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#09C6F9',
  },

  buttonContainer1: {
    marginTop: screenHeight * 2,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
    backgroundColor: '#F04E99',
    opacity: 0.5,
  },
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
    user: state.userReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTheme: value => dispatch(changeTheme(value)),
    saveInfo: value => dispatch(addInfo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
