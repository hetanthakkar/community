import { connect } from "react-redux";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  UIManager,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../../helpers";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const App = (props) => {
  React.useEffect(() => console.log("props", props.user.name));
  return (
    <SafeAreaProvider
      style={{ backgroundColor: props.theme == "dark" ? "#141519" : "#f8fafd" }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text
              style={{
                color: props.theme == "dark" ? "#f8fafd" : "black",
                paddingVertical: 10,
              }}
            >
              Profile Settings
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text
              style={{
                color: props.theme == "dark" ? "#f8fafd" : "black",
                paddingVertical: 10,
              }}
            >
              App Settings
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text
              style={{
                color: props.theme == "dark" ? "#f8fafd" : "black",
                paddingVertical: 10,
              }}
            >
              About The App
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text
              style={{
                color: props.theme == "dark" ? "#f8fafd" : "black",
                paddingVertical: 10,
              }}
            >
              Terms And Conditions
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={styles.divider} />
          </View>
          <Text
            style={{
              marginTop: screenHeight * 32,
              color: props.theme == "dark" ? "#f8fafd" : "black",
              padding: 10,
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            Logged in as
          </Text>
          <Text
            style={{
              marginTop: screenHeight * -1,
              color: props.theme == "dark" ? "#f8fafd" : "black",
              padding: 10,
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            {props.user.email}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("token");
              props.navigation.navigate("Splash Screen");
            }}
            style={{
              marginTop: screenHeight * 2,
              alignSelf: "center",
              backgroundColor: "#045DE9",
              width: screenWidth * 85,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#f8fafd",
                fontWeight: "bold",
                padding: 10,
                alignSelf: "center",
                fontSize: 20,
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    height: 30,
    marginLeft: "5%",
  },
  sectionDescription: {
    fontSize: 12,
    height: 30,
    marginLeft: "5%",
  },
  divider: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
  },
});

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
