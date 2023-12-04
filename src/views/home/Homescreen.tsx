import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Homescreen = () => {
const navigation = useNavigation()

return (
    <View style={{
        marginTop:40
    }}>
    <View>
    <TouchableOpacity 
        onPress={()=>navigation.navigate('CoursesNavigator')}
    style={styles.button}>
       <Text>Courses</Text>
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={()=>navigation.navigate('ChatsNavigator')}
    style={styles.button}>
       <Text>Chats</Text>
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={()=>navigation.navigate('CourseSubCatScreen')}
    style={styles.button}>
       <Text>Rooms</Text>
    </TouchableOpacity>
    <TouchableOpacity 
 onPress={()=>navigation.navigate('MapScreen')}
    style={styles.button}>
       <Text>Map</Text>
    </TouchableOpacity>
    </View>
    <FlatList
    data={genreDummy}
    renderItem={({item})=>{
    return(
    <TouchableOpacity
    style={{
        width:'100%',
        height:40,
        backgroundColor:'#b2b4b8',
        marginVertical:4
    }}>
    <Text>{item.name}</Text>
    </TouchableOpacity>)
    }}
    />
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
button:{
width:40,
height:40,
backgroundColor:'gray'
}
})



const genreDummy = [
    {
    name:'Dance',
    id:1
    },
    {
    name:'Coding',
    id:2    
    },
    {
    name:'Sports',
    id:3
    }
]