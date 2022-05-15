import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import TextInput from '../../component/input';
import {changeTheme, addInfo} from '../../actions';
import {nameRegex, mailRegex} from '../../helpers';
import {screenHeight, screenWidth} from '../../helpers';
import {isSmallIosDevice, isLargeIosDevice} from '../../helpers';
import {Checkbox} from 'react-native-material-ui';
import styles from '../signup/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  iosClientId:
    '759922091432-gm7hr3flemcp4ckn2os5lbksu9di6jhm.apps.googleusercontent.com',
  webClientId:
    '759922091432-ivip388rh8cli9po2j38532cafuorl3b.apps.googleusercontent.com',
});
const validate = values => {
  let errors = {};

  if (!values.name) {
    errors.name = 'This field is required!';
  }
  if (!values.password) {
    errors.password = 'This field is required!';
  }
  if (!mailRegex.test(values.email)) {
    errors.email = 'Enter valid email address';
  }
  if (!nameRegex.test(values.name)) {
    errors.name = 'Please fill the proper name';
  }
  if (values.password != undefined && values.password.length < 5) {
    errors.password = 'Password should atleast have 5 characters';
  }
  return errors;
};

const myFields = ({
  label,
  theme,
  meta: {error, touched, dirty, visited},
  input: {onChange, ...restInput},
}) => {
  const icon = () => {
    if (!dirty && !visited) return 'keyboard';
    if (error != undefined && touched) return 'error';
    if (error == undefined) return 'check';
    else return 'keyboard';
  };
  const iconColor = () => {
    if (error != null && touched == true) return 'red';
    if (error == undefined && visited) return 'green';
    else {
      if (theme == 'light') return 'black';
      else {
        return '#f8fafd';
      }
    }
  };
  return (
    <View style={{alignSelf: 'center'}}>
      <TextInput
        containerWidth={screenWidth * 85}
        color={theme == 'dark' ? '#f8fafd' : '#3b3b3b'}
        error={error != null && touched == true ? error : null}
        secureTextEntry={label == 'Password'}
        onChangeText={onChange}
        label={label}
        labelColor={theme == 'dark' ? '#f8fafd' : 'black'}
        rightIcon={icon()}
        rightIconColor={iconColor()}
        rightIconSize={error != null && touched == true ? 23 : 20}
        rightIconType="materialicon"
        labelActiveColor={theme == 'dark' ? '#f8fafd' : 'black'}
        {...restInput}
      />
    </View>
  );
};

let Form = props => {
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState(false);

  const signInWithGoogleAsync = async () => {
    props.navigation.navigate('HomeTab Screen');

    // await GoogleSignin.hasPlayServices();
    // await GoogleSignin.signIn().then(result => {
    //   fetch('http://192.168.90.158:3000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: result.user.email,
    //     }),
    //   })
    //     .then(result => result.json())
    //     .then(async data => {
    //       if (data) {
    //         await props.addUser(data);
    //         await AsyncStorage.setItem('token', data.password);
    //         props.navigation.navigate('HomeTab Screen');
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       setError(
    //         'You do not have a Skillify account connected to your Google Account.',
    //       );
    //     });
    // });
  };
  const generateOTP = () => {
    // Declare a digits variable
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  const submit = () => {
    let otp = generateOTP();
    let message = otp + ' is your Community login code';
    fetch('https://www.fast2sms.com/dev/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'LNfnqwV7oEi2XT5syQRrlABmKCg48ScvGPhWHZJ3YbUtOaku9IQNbJAnUgFSqcvdlCe0xhKZjPVaTtw6',
      },
      body: JSON.stringify({
        sender_id: 'FSTSMS',
        message: message,
        language: 'english',
        route: 'p',
        numbers: '6354130888',
      }),
    })
      .then(err => console.log(err))
      .catch(err => console.log('err', err));
    // props.navigation.navigate('Signup Cont');
  };

  const initUser = token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        console.log(JSON.stringify(json));
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  };
  const signInWithFacebook = () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
      'public_profile',
      'user_friends',
      'email',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken;
            initUser(accessToken);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const getMarginTop = () => {
    const values = [props.email, props.name, props.password];
    const arr = values.map(value => {
      return value ? 1 : 0;
    });
    const add = (accumulator, a) => {
      return accumulator + a;
    };
    const sum = arr.reduce(add, 0);
    console.log('sum is', sum);
    switch (sum) {
      case 0: {
        if (isLargeIosDevice) {
          if (!props.submitFailed) return screenHeight * 15;
          else return screenHeight * 12;
        } else if (isSmallIosDevice) {
          if (!props.submitFailed) return screenHeight * 8;
          return screenHeight * 6;
        } else {
          if (!props.submitFailed) return screenHeight * 12;
          else return screenHeight * 6;
        }
      }

      case 1: {
        if (isLargeIosDevice) {
          return screenHeight * 3;
        } else if (isSmallIosDevice) {
          return screenHeight * 5;
        } else return screenHeight * 8;
      }

      case 2: {
        if (isLargeIosDevice) {
          return screenHeight * 5;
        } else if (isSmallIosDevice) {
          return screenHeight * 5;
        } else return screenHeight * 5;
      }

      case 3: {
        if (isLargeIosDevice) {
          return screenHeight * 10;
        } else if (isSmallIosDevice) {
          return screenHeight * 4;
        } else return screenHeight * 10;
      }
    }
  };

  return (
    <SafeAreaView
      style={
        props.theme.theme == 'dark'
          ? {...styles.mainView, backgroundColor: '#141519'}
          : styles.mainView
      }>
      <ScrollView>
        <StatusBar
          backgroundColor={props.theme.theme === 'dark' ? '#141519' : '#F8F8F8'}
        />
        <Image
          source={require('../../../assets/logo.png')}
          style={{
            width: 128,
            height: 128,
            alignSelf: 'center',
            marginTop: Platform.OS == 'android' ? screenHeight * 4 : 0,
          }}
        />

        <Text
          style={
            props.theme.theme == 'dark'
              ? {...styles.title, color: '#DFE5EF'}
              : styles.title
          }>
          Welcome Back!
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text
            style={
              props.theme.theme == 'dark'
                ? {...styles.subTitle, color: '#979797'}
                : styles.subTitle
            }>
            Don't have an account?{' '}
          </Text>
          <Text style={styles.login}>Signup</Text>
        </View>
        <Field
          name="name"
          component={myFields}
          label="Name"
          theme={props.theme.theme}
        />

        <Field
          name="email"
          component={myFields}
          label="Email "
          theme={props.theme.theme}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginRight: 20,
            marginTop: 10,
          }}>
          <Checkbox
            label="Remember Me"
            value="agree"
            checked={true}
            style={{
              label: {
                marginLeft: -5,
                color: props.theme.theme == 'light' ? 'black' : 'white',
              },
              container: {marginLeft: screenWidth * 5},
            }}
          />
          <Text style={styles.login}>Forgot Password</Text>
        </View>
        <TouchableOpacity
          style={{...styles.createAccount, marginTop: getMarginTop()}}
          onPress={props.handleSubmit(submit)}>
          <Text style={styles.phoneText}>Log In</Text>
        </TouchableOpacity>
        {/* <Text
        onPress={submit}
        style={{
          alignSelf: 'center',
          marginTop: screenHeight * 3,
          fontFamily: 'Poppins-Bold',
          fontSize: 18,
          fontWeight: 'bold',
          color: '#758283',
        }}>
        Or Sign Up with
      </Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: screenHeight * 6,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Otp Screen')}
            style={styles.phone}>
            <FontAwesome
              name="phone"
              color="#f8fafd"
              size={20}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={signInWithGoogleAsync}>
            <Image
              source={require('../../../assets/google.png')}
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={signInWithFacebook}>
            <Image
              source={require('../../../assets/facebook.png')}
              style={{
                width: 35,
                height: 35,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.themeReducer,
    user: state.userReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTheme: value => dispatch(changeTheme(value)),
    addUser: value => dispatch(addInfo(value)),
  };
};
Form = reduxForm({
  form: 'signupform',
  destroyOnUnmount: false,
  validate,
})(Form);

const selector = formValueSelector('signupform');
Form = connect(state => {
  const email = selector(state, 'email');
  const password = selector(state, 'password');
  const name = selector(state, 'name');

  return {
    email,
    password,
    name,
  };
})(Form);
export default connect(mapStateToProps, mapDispatchToProps)(Form);
