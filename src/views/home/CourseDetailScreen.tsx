import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Toast from 'react-native-toast-message';

const CourseDetailScreen = (props) => {

  const[teacher,setTeacher]=useState(null)
  const navigation = useNavigation();
  useEffect(()=>{

    const fetchSubcategories=async()=>{
      let res2 = await fetch(`http://127.0.0.1:5000/get_teacher?id=${props?.route?.params?.course?.teacher_id}/subcategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log("res2 sub",res2)
      
      if (res2.ok) {
        // const data = await res.text();
        const cat= await res2.json()
        // let subcategories=cat.subcategories
        setTeacher(cat)
        // props.navigation.navigate('Home');
      } else {
        
        Alert.alert('Enter valid email/password');
      }
    }
  
    fetchSubcategories()
  },[])

  const addToCart=async()=>{
    let student_id=await AsyncStorage.getItem("user_id")
    console.log("hye",props?.route?.params?.course)
    let res = await fetch('http://127.0.0.1:5000/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        student_id: Number(student_id),
        course_id: props?.route?.params?.course?.cid,
      }),
    });
    console.log("res2 sub",res)
    
    if (res.ok) {
      // const data = await res.text();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Added to Cart',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40, // Adjust the top offset as needed
      });
      // props.navigation.navigate('Home');
    } else {
      
      Alert.alert('Enter valid email/password');
    }
  }

  const addToWishList=async()=>{
    
    let student_id=await AsyncStorage.getItem("user_id")
    console.log("hye",props?.route?.params?.course)
    let res = await fetch('http://127.0.0.1:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        student_id: Number(student_id),
        course_id: props?.route?.params?.course?.cid,
      }),
    });
    console.log("res2 sub",res)
    
    if (res.ok) {
      // const data = await res.text();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Added to cart',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40, // Adjust the top offset as needed
      });
      // props.navigation.navigate('Home');
    } else {
      
      Alert.alert('Enter valid email/password');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseTitle}>{props?.route?.params?.course?.description}</Text>
        <Text style={styles.instructorName}>Instructor:{teacher && teacher?.username}</Text>
      </View>

      <View style={styles.content}>
  
        <Text style={styles.courseDescription1}>
         Content: {props?.route?.params?.course?.content}

        </Text>
        <Text style={styles.courseDescription1}>
         Email: {teacher?.email}

        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Buy button pressed')}>
          <Text style={styles.buttonText}>Buy Course</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>navigation.navigate('ChatScreen',{teacher})}
        style={styles.button} >
          <Text style={styles.buttonText}>Message Instructor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>addToWishList()}
        style={styles.button} >
          <Text style={styles.buttonText}>Add to wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>addToCart()}
        style={styles.button} >
          <Text style={styles.buttonText}>Add to Cart</Text>
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
    marginBottom: 26,
    marginTop:-20
  },
  courseDescription: {
    fontSize: 18,
    color: '#333',
  },
  courseDescription1: {
    fontSize: 18,
    color: '#333',
    marginTop:20,
  },
  footer: {
    // flexDirection: 'row',
    // padding:20
    // justifyContent: 'space-between',
  },
  button: {
    // flex: 1,
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop:20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseDetailScreen;
