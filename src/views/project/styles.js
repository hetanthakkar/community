import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafd",
    padding: 8,
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 19,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  main: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 19,
    fontWeight: "bold",
    flexWrap: "wrap",
    fontStyle: "italic",
    textDecorationLine: "underline",
    // alignSelf: "center",
  },

  header: {
    marginVertical: 10,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  item: {
    marginHorizontal: 10,
    justifyContent: "center",
    marginTop: 15,
    flexWrap: "wrap",
  },
  itemPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
  },
  itemText: {
    color: "black",
    marginTop: 5,
  },

  join: {
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#045DE9",
    borderRadius: 10,
    marginTop: screenHeight * 4,
    width: screenWidth * 50,
  },
  tech: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
  },
  time: {
    marginTop: 20,
    marginLeft: 40,
    fontWeight: "bold",
  },
  card: {
    // padding: 5,
    marginTop: 20,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: "black",
    width: screenWidth * 92,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  card1: {
    paddingBottom: 10,
    marginTop: 30,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    width: screenWidth * 92,
    elevation: 16,
    alignSelf: "center",
    // flexWrap: "wrap",
  },
  joinText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  paragraph: {
    marginHorizontal: 20,
    marginTop: 10,
    // marginRight: 20,
    // alignSelf: "center",
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "500",
    // padding:5
  },
  view: { flexDirection: "row" },
});
export default styles;
