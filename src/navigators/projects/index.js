import React from "react";
import Projects from "../../views/projects";
import Project from "../../views/project";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function App(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Projects"
        component={Projects}
        // options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Project"
        component={Project}
        // options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
