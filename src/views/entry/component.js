import React from 'react';
import {ActivityIndicator, LogBox, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../splash';
import Signup from '../signup';
import SignupCont from '../singupCont';
import SignupDetail from '../detailSignup';
import Home from '../home';
import Login from '../login';
import HomeTab from '../home-tab';
import Otp from '../otp';
import {connect} from 'react-redux';
import {View} from 'react-native';
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

const App = props => {
  const [user, setUser] = React.useState(0);
  React.useEffect(() => {
    async function abc() {
      // AsyncStorage.clear()
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUser(token);
      } else {
        setUser(-1);
      }
    }
    abc();
  }, []);

  const renderScreens = () => {
    console.log('user is', user);
    if (user !== 0 && user !== -1) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            
            <Stack.Screen
              name="Home"
              component={HomeTab}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Otp Screen"
              component={Otp}
              options={{
                title: 'Verify Phone',
                // headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="Splash Screen"
              component={Splash}
              options={{
                headerShown: false,
              }}
            /> */}
            <Stack.Screen
              name="Login Screen"
              component={Login}
              options={{
                headerShown: false,
                headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
                title: 'Login Screen',
                headerStyle: {
                  backgroundColor:
                    props.theme == 'dark' ? '#141519' : '#f8fafd',
                },
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
                headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
                headerStyle: {
                  backgroundColor:
                    props.theme == 'dark' ? '#141519' : '#f8fafd',
                },
              }}
            />
            <Stack.Screen
              name="Signup Cont"
              component={SignupCont}
              options={{
                title: 'Step 2/3',
                headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
                headerStyle: {
                  backgroundColor:
                    props.theme == 'dark' ? '#141519' : '#f8fafd',
                },
              }}
            />
            <Stack.Screen
              name="Signup Detail"
              component={SignupDetail}
              options={{
                title: 'Step 3/3',
                headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
                headerStyle: {
                  backgroundColor:
                    props.theme == 'dark' ? '#141519' : '#f8fafd',
                },
              }}
            />
            <Stack.Screen
              name="HomeTab Screen"
              component={HomeTab}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (user === -1) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="Splash Screen"
              component={Splash}
              options={{
                headerShown: false,
              }}
            /> */}
            {/* <Stack.Screen
              name="Otp Screen"
              component={Otp}
              options={{
                title: 'OTP Verification',
                headerTintColor: props.theme == 'dark' ? '#F2F2F2' : 'black',
                headerStyle: {
                  backgroundColor: props.theme === 'dark' ? '#141519' : 'white',
                },

                headerTransparent: true,
              }}
            /> */}

            {/* <Stack.Screen
              name="Login Screen"
              component={Login}
              options={{
                title: '',
                headerTintColor: props.theme == 'dark' ? '#F2F2F2' : 'black',
                headerStyle: {
                  backgroundColor: props.theme == 'dark' ? '#141519' : 'white',
                },
                headerTransparent: Platform.OS == 'ios' ? true : true,
                headerShown: Platform.OS == 'ios' ? true : false,
              }}
            /> */}
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                title: '',
                headerTintColor: props.theme == 'dark' ? '#F2F2F2' : 'black',
                headerStyle: {
                  backgroundColor: props.theme === 'dark' ? '#141519' : 'white',
                },
                headerTransparent: Platform.OS == 'ios' ? true : true,
                headerShown: Platform.OS == 'ios' ? true : false,
              }}
            />
            <Stack.Screen
              name="Signup Cont"
              component={SignupCont}
              options={{
                title: 'Step 2/3',
                headerTintColor: props.theme == 'dark' ? '#F2F2F2' : 'black',
                headerStyle: {
                  backgroundColor:
                    props.theme == 'dark' ? '#141519' : '#F2F2F2',
                },
              }}
            />
            <Stack.Screen
              name="Signup Detail"
              component={SignupDetail}
              options={{
                title: 'Step 3/3',
                headerTintColor: props.theme == 'dark' ? '#F2F2F2' : 'black',
                headerStyle: {
                  backgroundColor:
                    props.theme == 'dark' ? '#141519' : '#F2F2F2',
                },
              }}
            />
            <Stack.Screen
              name="HomeTab Screen"
              component={HomeTab}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                // title: "Step 3/3",
                // headerTintColor: "#f8fafd",
                // headerStyle: { backgroundColor: "#141519" },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (user === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  };
  return (
    <View style={{flex: 1}} key={user}>
      {renderScreens()}
    </View>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
