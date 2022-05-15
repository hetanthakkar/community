import React from 'react';
import Root from './src/views/entry';
import {MenuProvider} from 'react-native-popup-menu';
import {ToastProvider} from 'react-native-toast-notifications';

export default function App() {
  return (
    <ToastProvider placement="top" style={{marginTop: 50}}>
      <MenuProvider>
        <Root />
      </MenuProvider>
    </ToastProvider>
  );
}
