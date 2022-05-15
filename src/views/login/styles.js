import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: screenHeight * 2,
    color: "black",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: screenHeight * 2,
    justifyContent: "space-between",
  },
  forgot: {
    fontSize: 18,
    alignSelf: "center",
    color: "black",
    fontWeight: "700",
    color: "#045DE9",
    marginRight: 10,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginTop: screenHeight * 1,
    marginLeft: screenWidth * 5,
    fontWeight: "500",
  },
  remember: {
    fontSize: 18,
    marginTop: screenHeight * 1,
    color: "black",
    marginLeft: screenWidth * 1,
    fontWeight: "500",
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
    marginTop: screenHeight * 1,
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
    marginTop: screenHeight * 1,
  },
  description: {
    fontSize: 15,
    color: "black",
    // fontWeight: "500",
    // marginTop: screenHeight * 1,
    alignSelf: "center",
    marginHorizontal: 20,
  },

  signinText: {
    fontSize: 18,
    color: "#045DE9",
    fontWeight: "bold",
    marginTop: screenHeight * 1,
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
