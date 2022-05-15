import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import { screenHeight } from "../../helpers";
import Block from "../../component/Block";
import Text from "../../component/Text";
import { Text as DefaultText } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as mocks from "./mocks";
const Profile = (props) => {
  React.useEffect(() => {
    props.navigation.setOptions({
      title: props.tech,
    });
  }, []);
  const renderRequest = (request) => {
    return (
      <Block
        row
        card
        shadow
        color="#f8fafd"
        style={{ padding: 10, marginBottom: 15, borderWidth: 0.5 }}
      >
        <Block flex={1} column>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <DefaultText
              style={{
                paddingVertical: 8,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {request.name}
            </DefaultText>
            <MaterialIcons
              color={request.available ? "#32CD32" : "#BD271E"}
              name="stop-circle"
              style={{ marginVertical: 10, marginRight: 10 }}
            />
          </View>
        </Block>
      </Block>
    );
  };
  const renderRequests = () => {
    const { requests } = props;

    return (
      <Block
        flex={1}
        column
        color={props.theme == "dark" ? "#141519" : "gray2"}
        style={styles.requests}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {requests.map((request) => (
            <TouchableOpacity key={`request-${request.id}`}>
              {renderRequest(request)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Block>
    );
  };
  return (
    <ScrollView
      style={{
        backgroundColor: props.theme == "dark" ? "#141519" : "#FAFAFA",
      }}
    >
      <DefaultText
        style={{
          alignSelf: "center",
          marginTop: 20,
          fontWeight: "500",
          fontSize: 18,
          color: props.theme == "dark" ? "#f8fafd" : "#141519",
        }}
      >
        People interested in {props.tech}
      </DefaultText>

      {renderRequests()}
    </ScrollView>
  );
};
Profile.defaultProps = {
  user: mocks.user,
  requests: mocks.requests,
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#D61B1F",
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  request: {
    padding: 20,
    marginBottom: 15,
  },
  requestStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
