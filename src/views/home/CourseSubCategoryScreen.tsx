import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const CourseSubCategoryScreen = () => {

  const navigation = useNavigation();

  const danceSubcategories = [
    'Kathak',
    'Hip Hop',
    'Ballet',
    'Salsa',
    'Breakdance',
    'Bharatanatyam',
    'Contemporary',
    'Jazz',
    'Tap Dance',
    'Flamenco',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryTitle}>Dance</Text>
      </View>

      <View style={styles.subcategoryContainer}>
        {danceSubcategories.map((subcategory, index) => (
          <TouchableOpacity
          onPress={()=>navigation.navigate('CourseCatScreen')}
            key={index}
            style={styles.subcategoryButton}
          >
            <Text style={styles.subcategoryButtonText}>{subcategory}</Text>
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
