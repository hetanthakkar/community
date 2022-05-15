import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: screenHeight * 2,
    color: "black",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: screenHeight * 2,
  },
  checkbox: {
    alignSelf: "center",
  },
  forgot: {
    fontSize: 20,
    marginTop: screenHeight * 2,
    color: "black",
    marginLeft: screenWidth * 5,
    textDecorationLine: "underline",
  },
  error: {
    fontSize: 16,
    color: "red",
    marginTop: screenHeight * 1,
    marginLeft: screenWidth * 5,
    fontWeight: "500",
  },
  remember: {
    fontSize: 20,
    marginTop: screenHeight * 2,
    color: "black",
    marginLeft: screenWidth * -3,
    // textDecorationLine: "underline",
  },
  logo: {
    width: screenWidth * 10,
    height: screenHeight * 10,
  },
  mainView: {
    flex: 1,
    backgroundColor: "#f8fafd",
  },
  logoView: {
    alignSelf: "center",
    flexDirection: "row",
  },
  customButton: {
    alignSelf: "center",
    backgroundColor: "#3d5af1",
    borderRadius: 10,
    width: screenWidth * 85,
    marginBottom: screenHeight * 2,
    padding: 3,
  },

  textStyle: {
    color: "#f8fafd",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    textAlignVertical: "center",
    letterSpacing: 2,
  },

  already: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    // marginTop: screenHeight * 1,
  },

  signinText: {
    fontSize: 18,
    color: "#045DE9",
    fontWeight: "bold",
  },

  signinView: {
    alignSelf: "center",
    flexDirection: "row",
    // position: "absolute",
    marginTop: screenHeight * 2,
  },

  field: {
    marginTop: screenHeight * 2.5,
  },

  createAccount: {
    alignSelf: "center",
    borderRadius: 10,
    width: "85%",
    borderStyle: "solid",
    backgroundColor: "#4630EB",
    // position: "absolute",
    // bottom: 5,
    marginTop: screenHeight * 15,
  },

  createAccountText: {
    color: "#f8fafd",
    alignSelf: "center",
    fontSize: 18,
    // letterSpacing: 1,
    padding: 10,
    fontWeight: "bold",
  },
});

export default styles;
