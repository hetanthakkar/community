import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './component';

const Stack = createNativeStackNavigator();

const App = () => {
  React.useEffect(() => {
    console.log('firstnkq');
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default App;
