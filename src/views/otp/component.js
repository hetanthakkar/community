import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';
import {connect} from 'react-redux';
import styles from './styles';
import {screenHeight} from '../../helpers';
import auth from '@react-native-firebase/auth';

class App extends Component {
  logOutFirebase = () => {
    auth().signOut();
  };
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.logOutFirebase();
      }
    });
  }
  state = {
    otpInput: '',
    inputText: '',
    keyboardOpen: false,
    otpStatus: false,
    otp: '',
    confirm: null,
  };

  alertText = () => {
    const {otpInput = ''} = this.state;
    if (otpInput) {
      Alert.alert(otpInput);
    }
  };

  otp = async () => {
    if (!this.state.otpStatus) {
      const confirmation = await auth().signInWithPhoneNumber(
        '+91 942-930-6705',
      );
      console.log('cpm', confirmation);
      this.setState({confirm: confirmation, otpStatus: 'completed'});
    } else {
      let confirm = this.state.confirm;
      try {
        await confirm.confirm(this.state.otpInput);
        this.props.navigation.navigate('Home');
      } catch (error) {
        console.log('Invalid code.', error);
      }
    }
  };
  getString = () => {
    if (!this.state.otpStatus) {
      return 'Get OTP';
    }
    if (this.state.otpStatus === 'completed') {
      return 'Verify & Proceed';
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={
          this.props.theme == 'dark'
            ? {...styles.container, backgroundColor: '#141519'}
            : styles.container
        }>
        <StatusBar
          translucent={true}
          backgroundColor={this.props.theme === 'dark' ? '#141519' : '#979797'}
        />
        <Image
          source={
            this.props.theme == 'dark'
              ? require('../../../assets/otp-dark.png')
              : require('../../../assets/otp.png')
          }
          style={styles.image}
        />

        <Text
          style={
            this.props.theme == 'dark'
              ? {...styles.title, color: '#DFE5EF'}
              : styles.title
          }>
          OTP Verification
        </Text>
        <Text
          style={
            this.props.theme == 'dark'
              ? {...styles.instructions, color: 'white'}
              : styles.instructions
          }>
          We will send you a One Time Password on your phone
          {this.state.otpInput}
        </Text>
        {!this.state.otpStatus && (
          <TextInput
            maxLength={10}
            onChangeText={e => this.setState({inputText: e})}
            style={
              this.props.theme == 'dark'
                ? {...styles.textInput, color: 'white', borderColor: 'white'}
                : styles.textInput
            }
            placeholder="Enter Your Phone Number Here"
            placeholderTextColor={this.props.theme == 'dark' ? 'white' : 'grey'}
          />
        )}
        {this.state.otpStatus && (
          <OTPTextView
            key={Platform.OS === 'android' ? this.state.otpInput : undefined}
            defaultValue={
              Platform.OS === 'android' ? this.state.otpInput : undefined
            }
            tintColor="#6C63FF"
            ref={e => (this.input1 = e)}
            containerStyle={styles.textInputContainer}
            handleTextChange={text => this.setState({otpInput: text})}
            inputCount={6}
            keyboardType="numeric"
            textInputStyle={{
              color: this.props.theme == 'dark' ? 'white' : 'black',
            }}
          />
        )}
        {this.state.otpStatus && (
          <View style={styles.resendContainer}>
            <Text
              style={
                this.props.theme == 'dark'
                  ? {...styles.noOtp, color: 'white'}
                  : styles.noOtp
              }>
              Didn't recieve an OTP?
            </Text>
            <Text style={styles.resendOtp}> RESEND OTP</Text>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <Button
            style={[
              styles.buttonStyle,
              {
                marginTop: this.state.otpStatus
                  ? screenHeight * 15
                  : screenHeight * 15,
              },
            ]}
            mode="contained"
            loading={this.state.otpStatus === 'process'}
            onPress={this.otp}>
            <Text style={{fontSize: 20}}>{this.getString()}</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(App);
