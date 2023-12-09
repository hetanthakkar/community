import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';


const data = [
    { id: '1', name: 'React Native Basics', description: 'Learn the fundamentals of React Native development.' },
    { id: '2', name: 'Advanced JavaScript', description: 'Explore advanced JavaScript concepts and features.' },
  
  ];
  



  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
    onPress={()=>navigation.navigate('CourseDetailScreen')}
    style={styles.itemContainer}>
      <Text style={styles.index}>{index + 1}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
  

const CourseCategoryScreen = (props) => {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = React.useState(false);
    const [courses, setCourses] = React.useState([]);


    useEffect(()=>{

      const fetchSubcategories=async()=>{
        let res2 = await fetch(`http://127.0.0.1:5000/courses`, {
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
          let courses=cat.courses
          console.log(props?.route?.params?.subcategory)
          let relevantCourses=courses?.filter((course)=>course?.subcat_id==props?.route?.params?.subcategory?.subcat_id)
          setCourses(relevantCourses)
          // props.navigation.navigate('Home');
        } else {
          
          Alert.alert('Enter valid email/password');
        }
      }
    
      fetchSubcategories()
    },[])

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

   if (courses && courses.length>0){ 
  return (
    <FlatList
      data={courses}
      renderItem={({ item, index }) => (
        <TouchableOpacity 
        onPress={()=>navigation.navigate('CourseDetailScreen',{course:item})}
        style={styles.itemContainer}>
       <View style={styles.card}>
      <Text style={styles.title}>Description: {item?.description}</Text>
      <Text style={styles.content}>Content: {item?.content}</Text>
      <Text style={styles.details}>
        Lessons: {item?.number_of_lessons} | Price: ${item?.price} | Ratings: {item?.ratings}
      </Text>
    </View>

        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  )}
  else{
    return <ActivityIndicator/>
  }
}

export default CourseCategoryScreen


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
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    content: {
      fontSize: 16,
      marginBottom: 8,
    },
    details: {
      fontSize: 14,
      color: '#666',
    },
  });