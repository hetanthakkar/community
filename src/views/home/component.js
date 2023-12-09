import React from 'react';
import {changeTheme, addInfo} from '../../actions';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  FlatList,
  StyleSheet,
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
const categories = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
  // Add more categories as needed
];
class Home extends React.Component {
  state = {
    size: {width, height: 150},
    fontsLoaded: false,
    user:null
  };

  componentDidMount = async () => {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    await this.setState({fontsLoaded: true});
    // const token = await AsyncStorage.getItem('token');
    // console.log("tokeeen is", token);
    let res = await fetch('http://127.0.0.1:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: 'hetanthakkar1@gmail.com',
        role: 1,
      }),
    });
    
    if (res.ok) {
      const data = await res.text();
      let user=JSON.parse(data).user
      this.setState({user})
      await AsyncStorage.setItem('user_email',user[3]);
      await AsyncStorage.setItem('user_name',user[1]);
      await AsyncStorage.setItem('user_id',JSON.stringify(user[0]));
      // props.navigation.navigate('Home');
    } else {
      console.error('Error:', res.statusText);
      Alert.alert('Enter valid email/password');
    }

    let res2 = await fetch('http://127.0.0.1:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    
    if (res2.ok) {
      // const data = await res.text();
      const cat= await res2.json()
      let categories=cat.categories
      console.log(categories)
      this.setState({categories})
      // props.navigation.navigate('Home');
    } else {
      console.error('Error:', res.statusText);
      Alert.alert('Enter valid email/password');
    }
  };
  handleBackButton = () => {
    this.props.navigation.navigate('Signup');
  };
  changeTheme = value => {
    console.log('value');
    if (this.props.theme == 'light') this.props.setTheme('dark');
    else this.props.setTheme('light');
  };

   renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles1.categoryContainer} onPress={()=>{
      this.props.navigation.navigate('CourseSubCatScreen', {
        name: item?.name,
        id:item?.cat_id
      })
    }}>
      <Text style={styles1.categoryText}>{item?.name}</Text>
    </TouchableOpacity>
  );
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
                      fontSize: 14,
                      color:
                        this.props.theme == 'light' ? '#141519' : '#F1EEFc',
                      fontWeight: 'bold',
                    }}>
                    {this.state?.user && this?.state?.user[1]}
                  </Text>
                  
                </View>
                <Text
                  style={{
                    color: this.props.theme == 'light' ? '#141519' : '#F1EEFc',
                    marginTop: screenHeight * 1,
                    fontSize: 18,
                    opacity: 0.85,
                  }}>
                  {this.state?.user && this?.state?.user[3]}
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
                    onPress={() => this.props.navigation.navigate('CoursesNavigator')}>
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
                      Courses
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{flex: 0.25, margin: 10}}>
                  <TouchableOpacity
                    onPress={async () => {
                      this.props.navigation.navigate('ChatsNavigator');
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
                    onPress={() => this.props.navigation.navigate('MapScreen')}>
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
           {this.state?.categories && <FlatList
      data={this.state?.categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={this.renderCategoryItem}
      numColumns={2}
      contentContainerStyle={styles1.flatListContainer}
    />}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles1 = StyleSheet.create({
  flatListContainer: {
    padding: 16,
    marginLeft:'5%',
    justifyContent:'space-between'
  },
  categoryContainer: {
    // flex: 1,
    margin: 8,
    padding: 16,
    marginRight:20,
    // width:400,
    // height:100,
    backgroundColor: '#09C6F9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
