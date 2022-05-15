import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../home";
import Settings from "../settings";
import Search from "../search";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const App = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: props.theme == "dark" ? "#f8fafd" : "black",
        tabBarInactiveTintColor: props.theme == "dark" ? "#f8fafd" : "black",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: props.theme == "dark" ? "#141519" : "#f8fafd",
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
const Main = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialParams={{ theme: props.theme }}
        name="Home"
        children={() => <App theme={props.theme} />}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const mapStateToProps = (state) => {
  return {
    theme: state.themeReducer.theme,
    user: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch(changeTheme(value)),
    saveInfo: (value) => dispatch(addInfo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
