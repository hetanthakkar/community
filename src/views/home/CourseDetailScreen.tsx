import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const CourseDetailScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseTitle}>React Native Mastery</Text>
        <Text style={styles.instructorName}>Instructor: Hetan Thakkar</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.courseDescription}>
          This course will teach you advanced React Native concepts and help you
          build professional mobile applications.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Buy button pressed')}>
          <Text style={styles.buttonText}>Buy Course</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>navigation.navigate('ChatScreen')}
        style={styles.button} >
          <Text style={styles.buttonText}>Message Instructor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  instructorName: {
    fontSize: 16,
    color: '#555',
  },
  content: {
    marginBottom: 16,
  },
  courseDescription: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseDetailScreen;
