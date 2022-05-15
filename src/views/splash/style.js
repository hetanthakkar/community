import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  carContainer: {
    flex: 1,
  },
  titles: {
    marginTop: "10%",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "500",
  },
  subtitleCTA: {
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 16,
    color: "#5c5e62",
    alignSelf: "center",
    marginTop: "5%",
    marginLeft: "2%",
  },

  buttonsContainer: {
    flex: 1,
    // position: "absolute",
    bottom: 50,
    width: "80%",
    alignSelf: "center",
  },
});

export default styles;
