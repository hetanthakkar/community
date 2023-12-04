import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
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
  

const CourseCategoryScreen = () => {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity 
        onPress={()=>navigation.navigate('CourseDetailScreen')}
        style={styles.itemContainer}>
          <Text style={styles.index}>{index + 1}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.courseName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
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
  });