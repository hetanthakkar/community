import React from 'react';
import {Provider} from 'react-redux';
import Signup from './component';
import store from '../../store';
export default function App(props) {
  React.useEffect(() => {
    console.log(props.tech);
  });
  return (
    <Provider store={store}>
      <Signup navigation={props.navigation} tech={props.tech} />
    </Provider>
  );
}
