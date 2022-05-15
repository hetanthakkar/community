import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  modalView: {
    alignSelf: "center",
    backgroundColor: "#f8fafd",
    padding: 25,
    alignItems: "center",
    width: "80%",
  },
  button: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#F04E99",
  },
  button1: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F04E99",
  },
  submit: {
    alignSelf: "center",
    borderRadius: 10,
    width: screenWidth * 85,
    borderStyle: "solid",
    backgroundColor: "#045DE9",
    marginTop: screenHeight * 20,
  },
  reset: {
    alignSelf: "center",
    borderRadius: 10,
    width: screenWidth * 45,
    // backgroundColor: "#045DE9",
    // marginTop: screenHeight * 1,
  },
  textStyle1: {
    color: "black",
    textAlign: "center",
  },

  modalTextTitle: {
    marginBottom: 14,
    textAlign: "center",
    marginTop: 16,
  },
  modalTextSubtitle: {
    marginBottom: 12,
    color: "grey",
    textAlign: "center",
  },
  submitText: {
    color: "#f8fafd",
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 22,
    letterSpacing: 1,
    padding: 10,
  },
  resetText: {
    color: "#045DE9",
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 18,
    padding: 9,
    textDecorationLine: "underline",
  },
});

export default styles;
