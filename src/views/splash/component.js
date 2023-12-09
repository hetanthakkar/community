import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {connect} from 'react-redux';
import {changeTheme, addInfo} from '../../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '../../helpers';

const slides = [
  {
    key: 1,
    title: 'Welcome to CodeBuddies!',
    text: 'CodeBuddies is a community of amazing people who help each other become better at software development',
    image: require('../../../assets/group.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Why Should I Join?',
    text: 'CodeBuddies allows you to find people with similar learning goals (study groups) and start or join virtual hangouts to study/work on something together.',
    image: require('../../../assets/chat.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: "ted",
    text: 'Enter your coding interests, mention the project details and find out the suitable coding partner',
    image: require('../../../assets/teamwork.png'),
    backgroundColor: '#22bcb5',
  },
];
const App = props => {
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontSize: 22,
            color: 'black',
            textAlign: 'center',
            marginTop: screenHeight * 15,
            fontWeight: 'bold',
          }}>
          {item.title}
        </Text>
        <Image
          resizeMode="contain"
          style={{
            width: 320,
            height: 320,
            marginTop: screenHeight * 4,
            borderRadius: 20,
          }}
          source={item.image}
        />
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            marginTop: screenHeight * 10,
            marginHorizontal: screenWidth * 10,
            fontSize: 16,
          }}>
          {item.text}
        </Text>
      </View>
    );
  };
  const [done, setDone] = React.useState(false);

  const onDone = () => {
    setDone(true);
  };

  const changeTheme = value => {
    console.log('value');
    if (props.theme == 'light') props.setTheme('dark');
    else props.setTheme('light');
  };

  const renderDoneButton = () => {
    return (
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: '#045DE9',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: '#045DE9',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="md-arrow-forward-circle" color="#f8fafd" size={24} />
      </View>
    );
  };
  if (done) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: props.theme == 'dark' ? '#141519' : 'white',
        }}>
        <TouchableOpacity
          onPress={changeTheme}
          style={{marginTop: screenHeight * 10, marginLeft: screenWidth * 80}}>
          <Icon
            size={30}
            style={{alignSelf: 'center', marginLeft: 10}}
            color={props.theme == 'light' ? 'black' : '#f8fafd'}
            name={props.theme == 'light' ? 'sunny-outline' : 'moon-outline'}
          />
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            width: '90%',
            height: '40%',
          }}
          source={
            props.theme == 'dark'
              ? require('../../../assets/pairdark.jpeg')
              : require('../../../assets/pair.png')
          }
        />
        <Text
          style={{
            marginTop: screenHeight * 3,
            textAlign: 'center',
            fontSize: 45,
            color: props.theme == 'dark' ? '#f8fafd' : 'black',
          }}>
          Coding Buddies
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login Screen')}
          style={{
            backgroundColor: '#045DE9',
            padding: 12,
            // height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: screenHeight * 7,
            width: '70%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Signup')}
          style={{
            backgroundColor: '#045DE9',
            padding: 12,
            // height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: screenHeight * 4,
            width: '70%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <AppIntroSlider
        showPrevButton
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        dotStyle={{backgroundColor: 'grey'}}
        activeDotStyle={{backgroundColor: '#045DE9'}}
      />
    );
  }
};

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

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: '#f8fafd',
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: '#1cb278',
  },
  buttonText: {
    color: '#f8fafd',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
