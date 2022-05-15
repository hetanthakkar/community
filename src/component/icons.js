import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OctIcons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IonIcon = ({icon, size, color, style, onPress}) => {
    return <IonIcons name={icon} size={size} style={style} color={color} onPress={onPress} />;
}
const MaterialDesignIcon = ({icon, size, color, style, onPress}) => {
    return <MaterialDesignIcons name={icon} size={size} style={style} color={color} onPress={onPress} />;
}

const OctIcon = ({icon, size, color, style, onPress}) => {
    return <OctIcons name={icon} size={size} style={style} color={color} onPress={onPress} />;
}

const EvilIcon = ({icon, size, color, style, onPress}) => {
    return <EvilIcons name={icon} size={size} style={style} color={color} onPress={onPress} />;
}

const AwesomeIcon = ({icon, size, color, style, onPress}) => {
    return <AwesomeIcons name={icon} size={size} style={style} color={color} onPress={onPress} />;
}

const MaterialIcon = ({icon, size, color, style, onPress}) => {
    return <MaterialIcons name={icon} size={size} style={style} color={color} onPress={onPress} />;
}

export {IonIcon, MaterialDesignIcon, OctIcon, EvilIcon, AwesomeIcon,MaterialIcon};