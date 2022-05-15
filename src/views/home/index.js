import React from 'react';
import {Provider} from 'react-redux';
import Signup from './component';
import ChatList from '../chatList';
import store from '../../store';
import Map from '../MapScreen';
import Splash from '../splash';
import Profile from '../profile';
import Category from '../category';
import Project from '../project';
import Otp from '../otp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';

const Stack = createNativeStackNavigator();

const App = props => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeStack"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{
            headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
            headerStyle: {
              backgroundColor: props.theme == 'dark' ? '#121419' : '#f8fafd',
            },
          }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
            headerStyle: {
              backgroundColor: props.theme == 'dark' ? '#121419' : '#f8fafd',
            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
            headerStyle: {
              backgroundColor: props.theme == 'dark' ? '#121419' : '#f8fafd',
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
            headerStyle: {
              backgroundColor: props.theme == 'dark' ? '#121419' : '#f8fafd',
            },
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
            headerStyle: {
              backgroundColor: props.theme == 'dark' ? '#121419' : '#f8fafd',
            },
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="Project"
          component={Project}
          options={{
            headerTintColor: props.theme == 'dark' ? '#f8fafd' : 'black',
            headerStyle: {
              backgroundColor: props.theme == 'dark' ? '#121419' : '#f8fafd',
            },
            // headerShown: false,
          }}
        />
      </Stack.Navigator>
    </Provider>
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
