import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Math.round(Dimensions.get("window").height) / 100;
const screenWidth = Math.round(Dimensions.get("window").width) / 100;
const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.2,
    marginLeft: screenWidth * 5,
    flexDirection: "row",
    backgroundColor: "#141519",
  },
  imgSty: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  userImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderWidth: 2,
    marginLeft: screenWidth * -2.5,
    marginTop: screenHeight * 4,
    overflow: "hidden",
  },
  curSty: {
    color: "gray",
    fontFamily: "Poppins-Medium",
  },

  transfer: {
    padding: 10,
    backgroundColor: "#f8fafd",
    borderRadius: 20,
    alignItems: "center",
  },
  gradsty: {
    borderRadius: 10,
    paddingVertical: 5,
  },

  transferbox: {
    flex: 0.2,
    backgroundColor: "#f8fafd",
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: -0.5, height: 0.5 },
    shadowOpacity: 1,
    marginTop: screenHeight * 1,
  },
  shoppingCotainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  shoppingbody: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
  },
  shoppingtxt: {
    backgroundColor: "#FFF",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
  },

  shoppingtxt1: {
    backgroundColor: "#FFF",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    marginHorizontal: 10,
  },
  shoptxt: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
  },
});
export default styles;
