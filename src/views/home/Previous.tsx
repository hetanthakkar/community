import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';

const data = [
  { id: '1', name: 'React Native Basics', description: 'Learn the fundamentals of React Native development.' },
  { id: '2', name: 'Advanced JavaScript', description: 'Explore advanced JavaScript concepts and features.' },

];

const renderItem = ({ item, index }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.index}>{index + 1}</Text>
    <View style={styles.textContainer}>
      <Text style={styles.courseName}>{item.content}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

const Previous = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [courses, setCourses] = React.useState([]);


  const fetch_cart=async()=>{
    let student_id=await AsyncStorage.getItem("user_id")
    let res = await fetch(`http://127.0.0.1:5000/cart/${student_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    
    if (res.ok) {
      let ct=[]
      const data = await res.text();
      let cart=JSON.parse(data).cart
      console.log("cart items are ",cart)
      for (let i=0; i<cart.length;i++){
        let res1 = await fetch(`http://127.0.0.1:5000/courses/${cart[i].cid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (res1.ok) {

          const data = await res1.text();
          console.log("data",JSON.parse(data))
          ct.push(JSON.parse(data))
      }
      setCourses(ct)
    }
      // props.navigation.navigate('Home');
    } else {
      console.error('Error:', res.statusText);
      // Alert.alert('Enter valid email/password');
    }
  }

  useEffect(()=>{

    fetch_cart()
  },[])

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  return (
    <FlatList
      data={courses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 15,
  },
  index: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#3498db',
  },
  textContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default Previous;
