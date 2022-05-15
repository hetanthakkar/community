import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import { connect } from "react-redux";
import { screenWidth } from "../../helpers";
import styles from "./styles";
const technologies = ["React", "Express", "Redux", "Bootstrap"];

const data = [
  {
    key: "1",
    text: "Hetan",
    uri: "https://picsum.photos/id/1/200",
  },
  {
    key: "2",
    text: "Thakkar",
    uri: "https://picsum.photos/id/10/200",
  },

  {
    key: "3",
    text: "Franklin",
    uri: "https://picsum.photos/id/1002/200",
  },
  {
    key: "4",
    text: "Item text 4",
    uri: "https://picsum.photos/id/1006/200",
  },
  {
    key: "5",
    text: "Item text 5",
    uri: "https://picsum.photos/id/1008/200",
  },
];
const App = (props) => {
  React.useEffect(() =>
    props.navigation.getParent().setOptions({ headerShown: false })
  );
  const ListItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    );
  };

  const renderTechnologies = () => {
    return technologies.map((element) => (
      <Text style={styles.tech}>{element}</Text>
    ));
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.main}>Image Compressor</Text>
      <Card style={styles.card}>
        <View style={styles.view}>
          <Text style={styles.title}>Project Highlights ⚡</Text>
          <Text style={styles.time}>🕒 6 Months</Text>
        </View>
        <Text style={styles.paragraph}>
          Typically your app will only need a single instance at the top level
          and the functionality will flow down the component tree. We recommend
          using EuiProvider at this level as it includes reset styles and future
          configuration option
        </Text>
      </Card>
      <Card style={styles.card1}>
        <Text style={styles.title}>Tech Stack 📚</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 10,
            justifyContent: "space-around",
          }}
        >
          {renderTechnologies()}
        </View>
      </Card>
      <Card style={styles.card1}>
        <Text style={styles.title}>Members 👨🏻‍💻</Text>
        <FlatList
          style={{
            // marginLeft: 10,
            // width: screenWidth * 95,
            overflow: "hidden",
          }}
          horizontal
          data={data}
          renderItem={({ item }) => <ListItem item={item} />}
          showsHorizontalScrollIndicator={false}
          // initialNumToRender={1}
        />
      </Card>
      <TouchableOpacity style={styles.join}>
        <Text style={styles.joinText}>Join This Project</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
