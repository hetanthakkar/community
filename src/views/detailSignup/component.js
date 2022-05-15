import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { screenHeight, screenWidth } from "../../helpers/dimensions";
// import * as Location from "expo-location";
import DropDownPicker from "react-native-dropdown-picker";
import MapView from "react-native-maps";
// import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { changeTheme, addInfo } from "../../actions";
import styles from "./styles";
import { Modal, Portal, Provider } from "react-native-paper";


const App = (props) => {
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [street, setStreet] = useState(null);
  const [image, setImage] = useState(null);
  const [coord, setCoord] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [finalLocation, setFinalLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [pickerCity, setPickerCity] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const saveUser = async () => {
    let user = { ...props.user };
    user.location = coord;
    if (image) {
      user.profilePhoto = image;
    }
    await props.saveInfo(user);
    await fetch("http://192.168.1.184:3000/modifyUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.password,
        data: user,
      }),
    })
      .then((result) => result.json())
      .then(async (data) => {
        if (data == "success") props.navigation.navigate("Home");
      });
  };
  const pickImage = async () => {
    console.log('sldknf')
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // const response = await fetch(result.uri);
    // const blob = await response.blob();
    // const ref = firebase.storage().ref().child("images/het");
    // const uploadTask = ref.put(blob);
    // const imageUrl = (await (await uploadTask).ref.getDownloadURL()) + ".png";
    // setImage(imageUrl);
  };
  const pickerState = [
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  ];

  const location = async () => {
    setFinalLocation(true);
    
  };

  const setPickerLocation = async (callback) => {
    await setCity(callback(city));
  
  };
  const setPickerState = async (callback) => {
    await setState(callback(state));
    if (callback(state) == "Gujarat")
      setPickerCity([
        { label: "Ahmedabad", value: "Ahmedabad" },
        { label: "Anand", value: "Anand" },
        { label: "Bhavnagar", value: "Bhavnagar" },
        { label: "Gandhinagar", value: "Gandhinagar" },
        { label: "Jamnagar", value: "Jamnagar" },
        { label: "Rajkot", value: "Rajkot" },
        { label: "Surat", value: "Surat" },
        { label: "Vadodara", value: "Vadodara" },
      ]);
    if (callback(state) == "Maharastra")
      setPickerCity([
        { label: "Akola", value: "Akola" },
        { label: "Kalyan", value: "Kalyan" },
        { label: "Mumbai", value: "Mumbai" },
        { label: "Navi Mumbai", value: "Navi Mumbai" },
        { label: "Panvel", value: "Panvel" },
        { label: "Pune", value: "Pune" },
      ]);
    if (callback(state) == "Chhattisgarh")
      setPickerCity([
        { label: "Raipur", value: "Raipur" },
        { label: "Bilaspur", value: "Bilaspur" },
        { label: "Bastar", value: "Bastar" },
        { label: "Jashpur", value: "Jashpur" },
        { label: "Durg", value: "Durg" },
        { label: "Koriya", value: "Koriya" },
      ]);
    if (callback(state) == "Madhya Pradesh")
      setPickerCity([
        { label: "Bhopal", value: "Bhopal" },
        { label: "Indore", value: "Indore" },
        { label: "Gwalior", value: "Gwalior" },
        { label: "Jabalpur", value: "Jabalpur" },
        { label: "Sagar", value: "Sagar" },
        { label: "Ujjain", value: "Ujjain" },
      ]);
    if (callback(state) == "Karnataka")
      setPickerCity([
        { label: "Mangalore", value: "Mangalore" },
        { label: "Bangalore", value: "Bangalore" },
        { label: "Mysore", value: "Mysore" },
        { label: "Bijapur", value: "Bijapur" },
      ]);
    if (callback(state) == "Rajasthan")
      setPickerCity([
        { label: "Kota", value: "Kota" },
        { label: "Udaipur", value: "Udaipur" },
        { label: "Jaipur", value: "Jaipur" },
        { label: "Jodhpur", value: "Jodhpur" },
        { label: "Sikar", value: "Sikar" },
        { label: "Ajmer", value: "Ajmer" },
      ]);
    if (callback(state) == "Uttar Pradesh")
      setPickerCity([
        { label: "Kanpur", value: "Kanpur" },
        { label: "Lucknow", value: "Lucknow" },
        { label: "Ghaziabad", value: "Ghaziabad" },
        { label: "Agra", value: "Agra" },
        { label: "Varanasi", value: "Varanasi" },
        { label: "Prayagraj", value: "Prayagraj" },
      ]);
    if (callback(state) == "Tamil Nadu")
      setPickerCity([
        { label: "Coimbatore", value: "Coimbatore" },
        { label: "Salem", value: "Salem" },
        { label: "Madurai", value: "Madurai" },
        { label: "Tiruchirapalli", value: "Tiruchirapalli" },
      ]);
    if (callback(state) == "Jharkhand")
      setPickerCity([
        { label: "Ranchi", value: "Ranchi" },
        { label: "Bokaro", value: "Bokaro" },
        { label: "Deoghar", value: "Deoghar" },
        { label: "Dhanbad", value: "Dhanbad" },
        { label: "Dumka", value: "Dumka" },
        { label: "Ghatshila", value: "Ghatshila" },
        { label: "Hazaribagh", value: "Hazaribagh" },
        { label: "Jamshedpur", value: "Jamshedpur" },
      ]);
    if (callback(state) == "Kerala") {
      setPickerCity([
        { label: "Thiruvananthapuram", value: "Thiruvananthapuram" },
        { label: "Kochi", value: "Kochi" },
        { label: "Thrissur", value: "Thrissur" },
        { label: "Kollam", value: "Kollam" },
        { label: "Kozhikode", value: "Kozhikode" },
      ]);
    }
    if (callback(state) == "Goa" || callback(state) == "Haryana") {
      setPickerCity([]);
    }
  };

  const renderLocation = () => {
    if (dropDown) {
      return (
        <View style={{ alignSelf: "center" }}>
          <DropDownPicker
            zIndex={4000}
            dropDownDirection="TOP"
            style={{
              width: screenWidth * 70,
              alignSelf: "center",
              marginTop: screenHeight * 2,
            }}
            open={open}
            value={state}
            items={pickerState}
            setOpen={setOpen}
            setValue={setPickerState}
            placeholder="Select State"
          />
          <DropDownPicker
            zIndex={3000}
            dropDownDirection="TOP"
            style={{
              width: screenWidth * 70,
              alignSelf: "center",
              marginTop: screenHeight * 2,
            }}
            open={open1}
            value={city}
            items={pickerCity}
            setOpen={setOpen1}
            setValue={setPickerLocation}
            placeholder="Select City"
          />
          <MapView
            style={{
              width: screenWidth * 70,
              height: screenHeight * 30,
              marginTop: screenHeight * 5,
              alignSelf: "center",
              borderRadius: 20,
            }}
            region={{
              latitude: coord?.latitude,
              longitude: coord?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: coord?.latitude,
                longitude: coord?.longitude,
              }}
              title="Your Location"
            />
          </MapView>
        </View>
      );
    }
    if (!dropDown && !finalLocation) {
      return (
        <Portal>
          <Modal
            visible={true}
            contentContainerStyle={{
              borderRadius: 20,
              width: screenWidth * 90,
            }}
          >
            <View style={styles.modalView}>
              <Icon size={40} color="#4630EB" name="location-on" />
              <Text style={styles.modalTextTitle}>
                Device Location is not enabled
              </Text>
              <Text style={styles.modalTextSubtitle}>
                Please enable device location.It help us serve better by using
                your acurate address
              </Text>

              <TouchableOpacity style={styles.button} onPress={location}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    size={15}
                    style={{ marginRight: 7 }}
                    color="#f8fafd"
                    name="my-location"
                  />
                  <Text style={styles.textStyle1}>Enable Device Location</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => setDropDown(true)}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    size={15}
                    style={{ marginRight: 5 }}
                    color="#f8fafd"
                    name="search"
                  />
                  <Text style={styles.textStyle1}>Enter Location Manually</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      );
    } else
      return (
        <MapView
          style={{
            width: screenWidth * 70,
            height: screenHeight * 30,
            marginTop: screenHeight * 5,
            alignSelf: "center",
            borderRadius: 20,
          }}
          region={{
            latitude: coord?.latitude,
            longitude: coord?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: coord?.latitude,
              longitude: coord?.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      );
  };
  return (
    <Provider>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: props.theme == "dark" ? "#141519" : "#f8fafd",
        }}
      >
        <TouchableOpacity style={{ marginTop: screenHeight * 2 }}>
          {/* <UserAvatar
            key={image}
            bgColor="#F0F0F0"
            name={!image ? props.user.name : undefined}
            size={100}
            textColor="#F04E99"
            style={{ alignSelf: "center" }}
            src={image}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            marginTop: -20,
            alignSelf: "center",
            marginLeft: -60,
            backgroundColor: "#f8fafd",
            borderRadius: 8,
            padding: 5,
          }}
        >
          <View style={{ flexDirection: "row", padding: 4 }}>
            <Icon
              size={15}
              style={{ marginRight: 2 }}
              name="edit"
              color="black"
            />
            <Text style={{ fontWeight: "bold", fontSize: 13, color: "black" }}>
              Edit
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "700",
            fontSize: 24,
            marginTop: screenHeight * 2,
            color: props.theme == "dark" ? "#f8fafd" : "black",
          }}
        >
          {props.user.name}
        </Text>
        <View
          style={{
            flexDirection: "column",
            alignSelf: "center",
            marginTop: screenHeight * 1,
          }}
        >
          {finalLocation && (
            <Text
              style={{
                color: props.theme == "dark" ? "#f8fafd" : "black",
                marginTop: screenHeight * 1,
                fontSize: 18,
                alignSelf: "center",
              }}
            >
              {street},
            </Text>
          )}
          {finalLocation && (
            <Text
              style={{
                color: props.theme == "dark" ? "#f8fafd" : "black",
                marginTop: screenHeight * 1,
                fontSize: 18,
                alignSelf: "center",
              }}
            >
              {city}, {state}
            </Text>
          )}
          {!finalLocation && !dropDown && (
            <Text
              style={{
                color: props.theme == "dark" ? "#f8fafd" : "black",
                marginTop: screenHeight * 1,
                fontSize: 18,
              }}
            >
              Enter Your Location
            </Text>
          )}
        </View>
        {renderLocation()}
        <TextInput
          containerWidth={screenWidth * 95}
          color={"black"}
          label="Enter about yourself"
          labelColor="#f8fafd"
          labelActiveColor={"black"}
        />

        <TouchableOpacity
          style={styles.reset}
          onPress={() => {
            setDropDown(false);
            setFinalLocation(false);
            setCoord(null);
          }}
        >
          <Text style={styles.resetText}>Reset Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderRadius: 10,
            width: screenWidth * 75,
            borderStyle: "solid",
            backgroundColor: "#045DE9",
            marginTop:
              dropDown || finalLocation ? screenHeight * 5 : screenHeight * 20,
          }}
          onPress={saveUser}
        >
          <Text style={styles.submitText}>Get Started!</Text>
        </TouchableOpacity>
      </ScrollView>
    </Provider>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
