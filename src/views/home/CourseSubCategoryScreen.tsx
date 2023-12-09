import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

const CourseSubCategoryScreen = (props) => {
  console.log(props?.route?.params?.name,"tech")
  const [subCategories,setSubCategories]=useState([])
  useEffect(()=>{

    const fetchSubcategories=async()=>{
      let res2 = await fetch(`http://127.0.0.1:5000/categories/${props?.route?.params?.id}/subcategories`, {
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
        let subcategories=cat.subcategories
        setSubCategories(subcategories)
        // props.navigation.navigate('Home');
      } else {
        
        Alert.alert('Enter valid email/password');
      }
    }
  
    fetchSubcategories()
  },[])
  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryTitle}>{props?.route?.params?.name}</Text>
      </View>

      <View style={styles.subcategoryContainer}>
        {subCategories?.length>0&&subCategories?.map((subcategory, index) => (
          <TouchableOpacity
          onPress={()=>navigation.navigate('CourseCatScreen',{subcategory})}
            key={index}
            style={styles.subcategoryButton}
          >
            <Text style={styles.subcategoryButtonText}>{subcategory?.name}</Text>
          </TouchableOpacity>
        ))}
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
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subcategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subcategoryButton: {
    width: '48%', 
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  subcategoryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseSubCategoryScreen;
