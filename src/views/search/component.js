import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  FlatList,
  StatusBar,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {screenHeight, screenWidth} from '../../helpers';
import {Toolbar, RadioButton} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {List} from 'react-native-paper';
import {Avatar} from 'react-native-paper';

class Map extends Component {
  state = {
    users: [],
    query: '',
    searchUsers: [],
    options: false,
    search: false,
    sort: false,
  };
  componentDidMount = async () => {
    await fetch('http://192.168.1.185:3000/getUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => result.json())
      .then(async data => {
        console.log(data);
        const filteredPeople = data.filter(
          item => this.props.user._id !== item._id,
        );
        await this.setState({
          users: filteredPeople,
          searchUsers: filteredPeople,
        });
      });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  onSearch = value => {
    this.setState({query: value});
    let users = [...this.state.users];
    const filteredPeople = users.filter(item => item.name.includes(value));
    this.setState({searchUsers: filteredPeople});
    if (this.state.query == '') this.setState({searchUsers: users});
  };
  header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: screenHeight * 3,
          marginBottom: screenHeight * 1,
        }}>
        <TouchableOpacity
          onPress={() => this.setState({sort: true})}
          style={{
            backgroundColor: '#F04E99',
            padding: 10,
            width: screenWidth * 30,
            borderRadius: 15,
          }}>
          <View style={{flexDirection: 'row-reverse', alignSelf: 'center'}}>
            <Text
              style={{
                color: '#f8fafd',
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 6,
              }}>
              Sort
            </Text>
            <Icon size={20} color="#f8fafd" name="sort" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#5DCAE9',
            padding: 10,
            width: screenWidth * 30,
            borderRadius: 15,
          }}>
          <View style={{flexDirection: 'row-reverse', alignSelf: 'center'}}>
            <Text
              style={{
                color: '#f8fafd',
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 6,
              }}>
              Filter
            </Text>
            <Icon size={20} color="#f8fafd" name="filter-alt" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#025B95',
            padding: 10,
            width: screenWidth * 30,
            borderRadius: 15,
          }}>
          <View style={{flexDirection: 'row-reverse', alignSelf: 'center'}}>
            <Text
              style={{
                color: '#f8fafd',
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 6,
              }}>
              Reset
            </Text>
            <CommunityIcon
              size={20}
              color="#f8fafd"
              name="cog-counterclockwise"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderOptions = () => {
    this.state.options
      ? this.setState({options: false})
      : this.setState({options: true});
  };
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: this.props.theme == 'light' ? '#f8fafd' : '#141519',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
          opacity: this.state.sort ? 0.5 : 1,
        }}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.renderOptions}
          centerElement="Search The Items"
          searchable={{
            placeholder: 'Search',
            autoFocus: true,
            onSearchPressed: () => this.setState({search: true}),
            onSearchClosed: () => this.setState({search: false}),
          }}
          style={{
            container: {
              backgroundColor:
                this.props.theme == 'dark' ? '#141519' : '#f8fafd',
            },
            leftElement: {
              color:
                this.props.theme == 'dark' && !this.state.search
                  ? '#f8fafd'
                  : 'black',
            },

            rightElement: {
              color:
                this.props.theme == 'dark' && !this.state.search
                  ? '#f8fafd'
                  : 'black',
            },
            titleText: {
              color:
                this.props.theme == 'dark' && !this.state.search
                  ? '#f8fafd'
                  : 'black',
            },
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.sort}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!this.state.sort);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sort Alphabetically</Text>
              <RadioButton
                label="osdmnfoisdnfosdinf"
                checked={this.state.checked}
                value="Value"
                onCheck={checked => this.setState({checked})}
              />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({sort: false})}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.searchUsers}
          renderItem={({item}) => {
            let stringArray = item.name.split(/(\s+)/).filter(function (e) {
              return e.trim().length > 0;
            });
            return (
              <List.Item
                style={{
                  backgroundColor:
                    this.props.theme == 'dark' ? '#141519' : '#f8fafd',
                  marginTop: screenHeight * 1,
                }}
                onPress={() => this.props.navigation.navigate('Profile')}
                title={item.name}
                description={item.email}
                left={props => (
                  <Avatar.Text
                    size={40}
                    style={{marginHorizontal: 10}}
                    label={stringArray[0].charAt(0) + stringArray[1].charAt(0)}
                  />
                )}
                titleStyle={{
                  color: this.props.theme == 'light' ? '#141519' : '#f8fafd',
                }}
                descriptionStyle={{
                  color: this.props.theme == 'light' ? '#141519' : '#f8fafd',
                }}
              />
            );
          }}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.state.options ? this.header : undefined}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: '100%',
    height: 80,
  },
  centeredView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 20,
    height: screenHeight * 20,
    width: screenWidth * 80,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f8fafd',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#f8fafd',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
    user: state.userReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTheme: value => dispatch(changeTheme(value)),
    saveInfo: value => dispatch(addInfo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
