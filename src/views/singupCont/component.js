import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { changeTheme, addInfo } from "../../actions";
import styles from "./styles";
import {
  gamedev,
  mobiledev,
  backend,
  frontend,
  languages,
  skills,
} from "./mock";
import Icon from "react-native-vector-icons/MaterialIcons";

class App extends React.Component {
  state = {
    theme: "dark",
    active: false,
    active1: false,
    skills,
    selectedItems: "",
    sub: [],
    newSelectItems: [],
    count: false,
  };

  onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length > 2) {
      return;
    }
    const name = selectedItems.toString();
    console.log("name", name, selectedItems);
    const a = [];
    if (name.includes("Language")) {
      a.push(...languages);
    }
    if (name.includes("Backend Developement")) {
      a.push(...backend);
    }

    if (name.includes("Frontend Development")) {
      a.push(...frontend);
    }

    if (name.includes("Mobile Development")) {
      a.push(...mobiledev);
    }

    if (name.includes("Game Developement")) {
      a.push(...gamedev);
    }
    this.setState({ selectedItems, sub: a });
  };
  onSelectedNewChange = (newSelectItems) => {
    this.setState({ newSelectItems: newSelectItems });
  };

  selectStudent = async () => {
    await this.setState({
      active1: this.state.active1 ? false : true,
      active: false,
    });
  };
  selectTeacher = async () => {
    await this.setState({
      active: this.state.active ? false : true,
      active1: false,
    });
  };
  submit = async () => {
    let user = { ...this.props.user };
    user.role = this.state.active ? "finder" : "explorer";
    user.skills = this.state.selectedItems;
    user.specificSkills = this.state.newSelectItems;
    await this.props.saveInfo(user);
    this.props.navigation.navigate("Signup Detail");
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch("http://192.168.1.184:3000/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((result) => result.json())
      .then(async (data) => {
        this.props.saveInfo(data);
      });
  };
  render() {
    return (
      <ScrollView
        style={
          this.props.theme == "dark"
            ? { ...styles.mainView, backgroundColor: "#141519" }
            : styles.mainView
        }
      >
        <View>
          <Text
            style={
              this.props.theme == "dark"
                ? { ...styles.title, color: "#DFE5EF" }
                : styles.title
            }
          >
            Which one defines you?{JSON.stringify(this.state.newSelectItems)}
          </Text>
          <Text
            style={
              this.props.theme == "dark"
                ? { ...styles.subtitle, color: "#DFE5EF" }
                : styles.subtitle
            }
          >
            Choose any one from below categories.
          </Text>
        </View>
        <View style={styles.category}>
          <View>
            <TouchableOpacity
              onPress={this.selectTeacher}
              style={styles.teacher}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.teacherTitle}>Finder</Text>
                {this.state.active && (
                  <Icon
                    size={30}
                    style={{ alignSelf: "center", marginLeft: 10 }}
                    color="#f8fafd"
                    name="check-circle"
                  />
                )}
              </View>
              <Text style={styles.teacherDescription}>
                Find Coding Partners for you group projects
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ opacity: 1 }}>
            <TouchableOpacity
              onPress={this.selectStudent}
              style={styles.student}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.studentTitle}>Explorer</Text>
                {this.state.active1 && (
                  <Icon
                    size={22}
                    style={{ alignSelf: "center" }}
                    color="#f8fafd"
                    name="check-circle"
                  />
                )}
              </View>
              <Text style={styles.studentDescription}>
                Hang around with like minded coders
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SectionedMultiSelect
          IconRenderer={Icon}
          modalWithTouchable={true}
          items={this.state.skills}
          single={false}
          uniqueKey="name"
          selectText="Select Skills [Any 2]"
          readOnlyHeadings={false}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          styles={{
            selectedItemText: styles.selectedItemText,
            chipText: styles.chipText,
            chipContainer: styles.chipContainer,
            selectToggle: styles.selectToggle,
            modalWrapper: styles.modalWrapper,
          }}
        />
        {this.state.selectedItems !== "" && (
          <SectionedMultiSelect
            IconRenderer={Icon}
            items={this.state.sub}
            uniqueKey="name"
            selectText="Select Specific"
            showDropDowns={false}
            readOnlyHeadings={false}
            onSelectedItemsChange={this.onSelectedNewChange}
            selectedItems={this.state.newSelectItems}
            styles={{
              selectedItemText: styles.selectedItemText,
              chipText: styles.chipText,
              chipContainer: styles.chipContainer,
              selectToggle: styles.selectToggle,
              modalWrapper: styles.modalWrapper,
            }}
          />
        )}
        <TouchableOpacity style={styles.submit} onPress={this.submit}>
          <Text style={styles.submitText}>Continue Ahed </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

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
