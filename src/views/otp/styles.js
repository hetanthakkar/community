import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 5,
  },
  image: {
    width: screenWidth * 60,
    height: screenHeight * 30,
    resizeMode: 'contain',
    marginTop: screenHeight * 12,
    // borderWidth: 1,
    borderColor: 'black',
  },
  instructions: {
    fontSize: 16,
    // fontWeight: '600',
    textAlign: 'center',
    color: 'grey',
    marginBottom: 20,
    marginHorizontal: 45,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    marginTop: 10,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  textInput: {
    height: 40,
    width: screenWidth * 80,
    // borderColor: 'grey',
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 40,
  },
  buttonStyle: {
    marginHorizontal: 20,
    width: screenWidth * 80,
    marginTop: 25,
    padding: 2,
    borderRadius: 10,
    backgroundColor: '#6C63FF',
  },
  noOtp: {color: 'grey'},
  resendOtp: {color: '#E6425E'},
  resendContainer: {flexDirection: 'row', marginTop: 10},
});
export default styles;
