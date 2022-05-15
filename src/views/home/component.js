import React from 'react';
import {changeTheme, addInfo} from '../../actions';
import {
  View,
  Text,
  BackHandler,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from './icons';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const mainColor = '#045DE9';
const {width} = Dimensions.get('window');
var screenHeight = Math.round(Dimensions.get('window').height) / 100;
var screenWidth = Math.round(Dimensions.get('window').width) / 100;

class Home extends React.Component {
  state = {
    size: {width, height: 150},
    fontsLoaded: false,
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    await this.setState({fontsLoaded: true});
    const token = await AsyncStorage.getItem('token');
    // console.log("tokeeen is", token);
    fetch('http://192.168.1.184:3000/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then(result => result.json())
      .then(async data => {
        await this.props.saveInfo(data);
      })
      .catch(err => console.log(err));
  };
  handleBackButton = () => {
    this.props.navigation.navigate('Signup');
  };
  changeTheme = value => {
    console.log('value');
    if (this.props.theme == 'light') this.props.setTheme('dark');
    else this.props.setTheme('light');
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView
          key={this.props.user}
          style={{
            flex: 1,
            backgroundColor: '#141519',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor:
                this.props.theme == 'dark' ? '#141519' : '#f8fafd',
            }}>
            <View
              style={[
                styles.headerContainer,
                {
                  backgroundColor:
                    this.props.theme == 'dark' ? '#141519' : '#f8fafd',
                },
              ]}>
              <View style={[styles.userImg]}>
                <Image
                  style={styles.imgSty}
                  source={{uri: this.props.user.profilePhoto}}
                />
              </View>
              <View
                style={{
                  padding: 10,
                  marginTop: screenHeight * 2,
                  marginLeft: screenWidth * 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#F1EEFc',
                      fontWeight: 'bold',
                    }}>
                    {this.props.user.name}
                  </Text>
                  <TouchableOpacity
                    onPress={this.changeTheme}
                    style={{marginLeft: screenWidth * 20}}>
                    <Icon
                      size={30}
                      style={{}}
                      color={this.props.theme == 'light' ? 'black' : '#f8fafd'}
                      name={
                        this.props.theme == 'light'
                          ? 'sunny-outline'
                          : 'moon-outline'
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    color: this.props.theme == 'light' ? '#141519' : '#F1EEFc',
                    marginTop: screenHeight * 1,
                    fontSize: 18,
                    opacity: 0.85,
                  }}>
                  {this.props.user.email}
                </Text>
                <Text
                  style={{
                    color: this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    marginTop: screenHeight * 1,
                    fontSize: 16,
                    opacity: 0.8,
                  }}>
                  Skill: React Native
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.transferbox,
                {
                  backgroundColor:
                    this.props.theme == 'dark' ? '#1E1E1E' : '#f8fafd',
                  shadowColor:
                    this.props.theme == 'dark' ? 'lightgrey' : 'black',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                }}>
                <View style={{flex: 0.25, margin: 10}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Map')}>
                    <LinearGradient
                      colors={['#09C6F9', '#045DE9']}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 1}}
                      style={styles.gradsty}>
                      <View style={{padding: 5, alignItems: 'center'}}>
                        <View style={styles.transfer}>
                          <Icon family="FontAwesome" name="group" size={20} />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        flexWrap: 'wrap',
                        textAlign: 'center',
                        alignSelf: 'center',
                        paddingTop: 10,
                        fontSize: 12,
                        color:
                          this.props.theme == 'light' ? '#141519' : '#f8fafd',
                      }}>
                      Discuss
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 0.25, margin: 10}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Chat')}>
                    <LinearGradient
                      colors={['#09C6F9', '#045DE9']}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 1}}
                      style={styles.gradsty}>
                      <View style={{padding: 5, alignItems: 'center'}}>
                        <View style={styles.transfer}>
                          <Icon
                            family="MaterialIcons"
                            name="meeting-room"
                            size={23}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        fontSize: 14,
                        color:
                          this.props.theme == 'light' ? '#141519' : '#f8fafd',
                      }}>
                      Rooms
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{flex: 0.25, margin: 10}}>
                  <TouchableOpacity
                    onPress={async () => {
                      this.props.navigation.navigate('ChatList');
                    }}>
                    <LinearGradient
                      colors={['#09C6F9', '#045DE9']}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 1}}
                      style={styles.gradsty}>
                      <View style={{padding: 5, alignItems: 'center'}}>
                        <View style={styles.transfer}>
                          <Icon
                            family="MaterialIcons"
                            name="chat-bubble-outline"
                            size={22}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        flexWrap: 'wrap',
                        textAlign: 'center',
                        alignSelf: 'center',
                        paddingTop: 10,
                        fontSize: 14,
                        color:
                          this.props.theme == 'light' ? '#141519' : '#f8fafd',
                      }}>
                      Chats
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 0.25, margin: 10}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Map')}>
                    <LinearGradient
                      colors={['#09C6F9', '#045DE9']}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 1}}
                      style={styles.gradsty}>
                      <View style={{padding: 5, alignItems: 'center'}}>
                        <View style={styles.transfer}>
                          <Icon
                            family="Ionicons"
                            name="md-map-sharp"
                            size={20}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        flexWrap: 'wrap',
                        textAlign: 'center',
                        alignSelf: 'center',
                        paddingTop: 10,
                        fontSize: 12,
                        color:
                          this.props.theme == 'light' ? '#141519' : '#f8fafd',
                      }}>
                      Nearby
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginTop: 12,
                flexWrap: 'wrap',
                backgroundColor:
                  this.props.theme == 'dark' ? '#141519' : '#f8fafd',
              }}>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Profile', {
                      tech: 'React',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="Fontisto"
                      name="react"
                      size={20}
                      color={this.props.theme == 'dark' ? '#045DE9' : '#045DE9'}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    React
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Angular JS',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="Fontisto"
                      name="angularjs"
                      size={20}
                      color="#045DE9"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    AngularJS
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Vue JS',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="Fontisto"
                      name="vuejs"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    VueJS
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'cloud',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="Fontisto"
                      name="aws"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    Cloud
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Python',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="Fontisto"
                      name="python"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    Python
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Kotlin',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-kotlin"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    Kotlin
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'HTML & CSS',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="FontAwesome"
                      name="html5"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    HTML CSS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Javascript',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-javascript"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    JavaScript
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Php',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-php"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    Php
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'NodeJS',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="Fontisto"
                      name="nodejs"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    NodeJS
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Unity',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="Fontisto"
                      name="unity"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    Unity
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'ML & AI',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="robot"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    ML & AI
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.shoppingCotainer}>
                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Swift',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="language-swift"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    Swift
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.shoppingbody}
                  onPress={() =>
                    this.props.navigation.navigate('Category', {
                      tech: 'Other',
                    })
                  }>
                  <View
                    style={[
                      styles.shoppingtxt1,
                      {
                        // backgroundColor:
                        //   this.props.theme == "light" ? "#141519" : "#f8fafd",
                        borderWidth: 1,
                        borderColor: '#025B95',
                      },
                    ]}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="dots-horizontal"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#f8fafd',
                    }}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return <View></View>;
    }
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
