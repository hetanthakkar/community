import {Text, View} from 'react-native';
import React, {Component} from 'react';
import MapView from 'react-native-maps';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 27.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}
