import {StyleSheet, StatusBar, Platform} from 'react-native';
import {screenHeight, screenWidth} from '../../helpers/dimensions';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: screenHeight * 2,
    color: '#2476FF',
  },
  subTitle: {
    fontSize: 15,
    // fontWeight: 'bold',
    marginTop: screenHeight * 2,
    color: '#758283',
    // marginLeft: screenWidth * 15,
    marginBottom: screenHeight * 2,
    fontFamily: 'Poppins-Bold',
  },
  login: {
    fontSize: 15,
    // fontWeight: 'bold',
    marginTop: screenHeight * 2,
    color: '#2476FF',
    marginBottom: screenHeight * 2,
    fontFamily: 'Poppins-Bold',
  },
  logo: {
    width: screenWidth * 10,
    height: screenHeight * 10,
  },
  mainView: {
    flex: 1,
    // width: '100%',
    backgroundColor: 'white',
  },

  textStyle: {
    color: '#f8fafd',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    textAlignVertical: 'center',
    letterSpacing: 2,
  },

  already: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    marginTop: screenHeight * 1,
  },
  phone: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    // marginTop: screenHeight * 3,
    backgroundColor: '#E81E75',
    // padding: screenWidth * 3.5,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomRadius: 10,
    height: screenHeight * 30,
  },
  phoneText: {
    color: '#f8fafd',
    marginLeft: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  phoneContainer: {flexDirection: 'row', alignSelf: 'center'},
  google: {
    alignSelf: 'center',
    // width: screenWidth * 75,
    borderRadius: 40,
    // marginTop: screenHeight * 3,
    backgroundColor: '#dd4b39',
    padding: screenWidth * 3.5,
  },
  googleContainer: {flexDirection: 'row', alignSelf: 'center'},
  facebook: {
    alignSelf: 'center',
    borderRadius: screenWidth * 15,
    // marginTop: screenHeight * 3,
    backgroundColor: '#4267B2',
    padding: screenWidth * 3.5,
    // width: screenWidth * 8,
    justifyContent: 'center',
  },
  googleText: {color: '#f8fafd', marginLeft: 15, fontWeight: 'bold'},
  createAccount: {
    alignSelf: 'center',
    width: screenWidth * 70,
    borderStyle: 'solid',
    backgroundColor: '#2476FF',
    // marginTop: screenHeight * 5,
    borderRadius: 15,
    padding: screenWidth * 3.5,
  },

  createAccountText: {
    color: '#f8fafd',
    alignSelf: 'center',
    fontSize: 18,
    // letterSpacing: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  remember: {
    fontSize: 15,
    marginTop: screenHeight * 1,
    color: 'black',
    marginLeft: screenWidth * 1,
    fontWeight: '500',
    // textDecorationLine: "underline",
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: screenHeight * 4,
    justifyContent: 'space-between',
  },
  forgot: {
    fontSize: 15,
    alignSelf: 'center',
    // color: 'black',
    fontWeight: '700',
    color: '#045DE9',
    marginRight: 10,
  },
  field: {
    marginTop: screenHeight * 2.5,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default styles;
