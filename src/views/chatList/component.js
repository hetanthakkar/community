import React, { useState } from "react";
import { TextInput, ScrollView, Image, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { changeTheme, addInfo } from "../../actions";
import { nameRegex, mailRegex } from "../../helpers";
import { screenHeight, screenWidth } from "../../helpers";
import styles from "./styles";
const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "This field is required!";
  }
  if (!values.password) {
    errors.password = "This field is required!";
  }
  if (!mailRegex.test(values.email)) {
    errors.email = "Enter valid email address";
  }
  if (!nameRegex.test(values.name)) {
    errors.name = "Please fill the proper name";
  }
  if (values.password != undefined && values.password.length < 5) {
    errors.password = "Password should atleast have 5 characters";
  }
  return errors;
};

let Form = (props) => {
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [searchText, setSearchText] = React.useState(0);

  const submit = () => {
    props.navigation.navigate("Signup Cont");
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScrollHeight(contentHeight);
  };
  const updateSearch = (text) => {
    setSearchText(text);
  };

  return (
    <ScrollView
      onContentSizeChange={onContentSizeChange}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      style={
        props.theme.theme == "dark"
          ? { ...styles.mainView, backgroundColor: "#141519" }
          : styles.mainView
      }
    >
      <View style={{ flex: 0.5 }}>
        <Image
          style={{
            width: "100%",
            height: "80%",
            resizeMode: "contain",
            alignSelf: "center",
          }}
          source={
            props.theme.theme == "dark"
              ? require("../../../assets/nodatadark.jpeg")
              : require("../../../assets/nodata.png")
          }
        />
      </View>
      <Text
        style={{
          color: props.theme.theme == "dark" ? "#f8fafd" : "black",
          fontWeight: "bold",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        You Don't Have Any Messages
      </Text>
      <Text
        style={{
          color: props.theme.theme == "dark" ? "#f8fafd" : "black",
          fontSize: 18,
          textAlign: "center",
          marginTop: 20,
          marginHorizontal: 20,
        }}
      >
        Your inbox is empty. Send a message to your buddy to get started
      </Text>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.themeReducer,
    user: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch(changeTheme(value)),
    addUser: (value) => dispatch(addInfo(value)),
  };
};
Form = reduxForm({
  form: "signupform",
  destroyOnUnmount: false,
  validate,
})(Form);

const selector = formValueSelector("signupform");
Form = connect((state) => {
  const email = selector(state, "email");
  const password = selector(state, "password");
  const name = selector(state, "name");

  return {
    email,
    password,
    name,
  };
})(Form);
export default connect(mapStateToProps, mapDispatchToProps)(Form);
