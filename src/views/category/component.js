import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { connect } from "react-redux";
import ProjectNavigator from "../../navigators/projects";
import Chats from "../chats";
import People from "../people";
import Project from "../project";
import Projects from "../projects";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const Form = (props) => {
  React.useEffect(() => {
    props.navigation.getParent()?.setOptions({
      headerRight: () => (
        <Menu>
          <MenuTrigger>
            <SimpleLineIcons
              name="options-vertical"
              size={16}
              // color="white"
              color={props.theme == "dark" ? "#f8fafd" : "#141519"}
            />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              width: 120,
              marginTop: 25,
              borderRadius: 5,
            }}
          >
            <MenuOption
              onSelect={() => alert(`Save`)}
              text="Create A Project"
            />
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text>Create A Group</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      ),
    });
  }, []);
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={() => ({
        tabBarActiveTintColor: "#045DE9",
        tabBarInactiveTintColor: props.theme == "dark" ? "#f8fafd" : "black",
        tabBarStyle: {
          borderTopWidth: 0.3,
          elevation: 0,
          borderTopRadius: 20,
          backgroundColor: props.theme == "dark" ? "#141519" : "#f8fafd",
          paddingTop: 5,
          // height: 0,
        },
        tabBarItemStyle: {
          borderRightWidth: 0.3,
          borderBottomWidth: 0.3,
        },
        // tabStyle: { height: 0 },
        // style: { backgroundColor: "transparent" },
        // indicatorStyle: { backgroundColor: "transparent" },
      })}
    >
      <Tab.Screen
        name="Projects"
        children={() => (
          <Projects
            tech={props.route.params.tech}
            navigation={props.navigation}
          />
        )}
      />
      <Tab.Screen
        name="Discussions"
        children={() => (
          <Chats tech={props.route.params.tech} navigation={props.navigation} />
        )}
      />
      <Tab.Screen
        name="People"
        children={() => (
          <People
            tech={props.route.params.tech}
            navigation={props.navigation}
          />
        )}
      />
    </Tab.Navigator>
  );
};
const App = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Form"
        component={Form}
        initialParams={{
          navigation: props.navigation,
          tech: props.route.params.tech,
        }}
        options={{ headerShown: false }}
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
    addUser: (value) => dispatch(addInfo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  button: {
    padding: 20,
    margin: 30,
  },
});
