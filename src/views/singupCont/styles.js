import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../helpers/dimensions";

const styles = StyleSheet.create({
  category: {
    flexDirection: "row",
    marginTop: screenHeight * 3,
    justifyContent: "space-evenly",
    height: screenHeight * 20,
    flexWrap: "wrap",
  },
  teacher: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#00C0B3",
    width: screenWidth * 43,
    height: screenHeight * 19,
    opacity: 1,
  },
  teacherTitle: {
    color: "#f8fafd",
    fontWeight: "bold",
    fontSize: 23,
    padding: 6,
  },
  teacherDescription: { color: "#f8fafd", fontSize: 18, padding: 4 },

  student: {
    backgroundColor: "#F04E99",
    borderRadius: 20,
    padding: 10,
    width: screenWidth * 43,
    height: screenHeight * 19,
  },

  studentTitle: {
    color: "#f8fafd",
    fontWeight: "bold",
    fontSize: 23,
    padding: 6,
  },

  studentDescription: { color: "#f8fafd", fontSize: 18, padding: 4 },

  selectedItemText: {
    color: "blue",
  },
  chipText: {
    color: "#25282f",
  },
  chipContainer: {
    backgroundColor: "#f8fafd",
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
  },
  selectToggle: {
    borderWidth: 1.5,
    width: screenWidth * 90,
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#f8fafd",
  },
  modalWrapper: {
    maxHeight: screenHeight * 50,
    marginTop: screenHeight * 20,
  },

  mainView: {
    flex: 1,
    backgroundColor: "#f8fafd",
    flexWrap: "wrap",
  },

  mainView1: {
    flex: 1,
    backgroundColor: "#141519",
    flexWrap: "wrap",
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: screenHeight * 2,
    marginLeft: screenWidth * 3,
    // alignSelf: "center",
  },

  subtitle: {
    marginTop: screenHeight * 1,
    fontSize: 18,
    color: "black",
    marginLeft: screenWidth * 3,
    // alignSelf: "center",
  },
  submit: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 20,
    width: screenWidth * 85,
    backgroundColor: "#045DE9",
    marginTop: screenHeight * 75,
  },
  submitText: {
    color: "#f8fafd",
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 22,
    letterSpacing: 1,
    padding: 10,
  },
});

export default styles;
