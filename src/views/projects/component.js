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
import Block from "../../component/Block";
import { Text as DefaultText } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as mocks from "./mocks";
const Profile = (props) => {
  React.useEffect(() => {
    props.navigation.getParent().setOptions({
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
        style={{ padding: 20, marginBottom: 15, borderWidth: 0.5 }}
      >
        <Block flex={1} column>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <DefaultText
              style={{
                paddingVertical: 8,
                fontSize: 16,
                fontWeight: "600",
                marginTop: -5,
              }}
            >
              {request.title}
            </DefaultText>
          </View>
          <DefaultText style={{ fontSize: 14 }}>
            {request.description}
          </DefaultText>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="group"
                size={20}
                style={{ marginRight: 10 }}
                color="#045DE9"
              />
              <DefaultText style={{ fontSize: 20 }}>
                {request.members} Members
              </DefaultText>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#F04E99",
                borderRadius: 10,
                paddingHorizontal: 8,
                paddingVertical: 5,
              }}
            >
              <DefaultText
                style={{
                  fontSize: 15,
                  color: "#f8fafd",
                  fontWeight: "dark",
                }}
              >
                Join This Project
              </DefaultText>
            </TouchableOpacity>
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
            <TouchableOpacity
              activeOpacity={0.6}
              key={`request-${request.id}`}
              onPress={() => {
                props.navigation.navigate("Project");
              }}
            >
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
