import React from 'react';
import {Provider} from 'react-redux';
import Signup from './component';
import ChatList from '../chatList';
import store from '../../store';
import Map from './Map';
import Splash from '../splash';
import Profile from '../profile';
import Category from '../category';
import Project from '../project';
import Otp from '../otp';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Homescreen from './Homescreen'
import Courses from './Courses'
import Chats from './Chats'
import Chatscreen from './Chatscreen'
import Rooms from './Rooms'
import Dance from './Dance'
// import Map from './Map'
import CourseCategoryScreen from './CourseCategoryScreen'
import CourseSubCategoryScreen from './CourseSubCategoryScreen'
import CourseDetailScreen from './CourseDetailScreen'
import Current from './Current'
import Wishlist from './Wishlist'
import Previous from './Previous'


const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const CoursesTopTab = createMaterialTopTabNavigator();

const App = props => {
  return (
    <Provider store={store}>
        <HomeStack.Navigator>
     <HomeStack.Screen
          options={{ headerShown:false }}
          name="HomeScreen"
          component={Signup} />
        <HomeStack.Screen
          options={{  }}
          name="ChatScreen"
          component={Chatscreen} />
                  <HomeStack.Screen
          options={{ }}
          name="ChatsNavigator"
          component={ChatNavigator} />
        <HomeStack.Screen
          options={{ headerShown:false }}
          name="CoursesNavigator"
          component={CoursesNavigator} />
        <HomeStack.Screen
          name="RoomsScreen"
          component={Rooms} />     
        <HomeStack.Screen
          name="DanceScreen"
          component={Dance} />
        <HomeStack.Screen
          name="CourseSubCatScreen"
          component={CourseSubCategoryScreen} />  
        <HomeStack.Screen
          name="CourseCatScreen"
          component={CourseCategoryScreen} />  
        <HomeStack.Screen
          name="CourseDetailScreen"
          component={CourseDetailScreen} />      
        <HomeStack.Screen
          name="MapScreen"
          component={Map} />  
          </  HomeStack.Navigator>
    </Provider>
  );
};

const ChatNavigator = () => {
  return (
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="Chats"
          component={Chats} />
        <ChatStack.Screen
          name="ChatScreen"
          component={Chatscreen} />   
      </ChatStack.Navigator>
  )
}
function CoursesNavigator() {
  return (
    <CoursesTopTab.Navigator
    tabBarOptions={{
      style: { paddingTop: 50 },    
    }}
    >
      <CoursesTopTab.Screen name="Current" component={Current} />
      <CoursesTopTab.Screen name="Wishlist" component={Wishlist} />
      <CoursesTopTab.Screen name="Previous" component={Previous} />
    </CoursesTopTab.Navigator>
  );
}

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
