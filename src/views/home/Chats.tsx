import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { horizontalScale } from './util/theme'
import { useNavigation } from '@react-navigation/native'

const Chats = () => {
  const navigation = useNavigation()
  // const {userId, setUserId} = useContext(UserType)
  // const [friends, setFriends] = useState([])
  
  
  // useEffect(() => {
  //   fetchFriends()
  // }, [])
  
  // const fetchFriends = () =>{
  //    try{
  //     axios.get(`http://localhost:8000/accepted-friends/${userId}`)
  //    .then((response)=>{
  //     console.log(response.data);
  //     setFriends(response.data.friends)
  //     })
  //    }catch(err){
  //        console.log('error',err);
  //    }
  // }
  
  return (
    <View style={{
      flex:1
    }}>
<FlatList
data={friends}
renderItem={({item})=>{
return(
  <TouchableOpacity 
  
  onPress={()=>navigation.navigate('ChatScreen',{
    // recepientId : item._id
  })}
  style={{
    marginVertical:10,
    height:60,
    marginHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:0.3,
    borderBottomColor:'gray',
    paddingBottom:10
  }}>
    <Image
    resizeMode='contain'
    style={{
      width:50,
      height:50,
      borderRadius:30
    }}
    source={item?.image}
    /> 
    <View style={{
      marginHorizontal:10,
      width:200
    }}>
    <Text style={{
      fontWeight:'bold'
    }}>{item?.name}</Text>
    <Text style={{
      marginTop:4,
      color:'gray'
    }}>last messages comes here</Text>
    </View>
    <Text style={{
     
      color:'gray',
      marginLeft:horizontalScale(50)
    }}>3:00 pm</Text>
  </TouchableOpacity>
)
}}
/>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({})


const friends = [
  {
    name:'Hetan',
    image:require('./assets/1.jpg')
  },
  {
    name:'Harsha Teja',
    image:require('./assets/2.jpg')
  },
  {
    name:'Sarita',
    image:require('./assets/3.jpg')
  }
]