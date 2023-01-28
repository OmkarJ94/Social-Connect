import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Footer = ({ navigation, page }) => {
  const active = {
    backgroundColor: "white",
    borderRadius: 50,
    fontSize: 30,
    padding: 10,
    color: "black"
  }
  return (
    <View style={styles.container}>
      {page === "Home" ? <Entypo name="home" size={24} color="black" style={ active} onPress={() => { navigation.navigate("Home") }} /> :
        <Entypo name="home" size={24} color="black" style={styles.icon1} onPress={() => { navigation.navigate("Home") }} />}

      {page === "Search" ? <FontAwesome name="search" size={24} color="black" style={ active} onPress={() => { navigation.navigate("Search") }} />
        :
        <FontAwesome name="search" size={24} color="black" style={styles.icon1} onPress={() => { navigation.navigate("Search") }} />
      }
      {page === "Notification" ? <FontAwesome name="heart-o" size={24} color="black" style={ active} onPress={() => { navigation.navigate("Notification") }} />
        :
        <FontAwesome name="heart-o" size={24} color="black" style={styles.icon1} onPress={() => { navigation.navigate("Notification") }} />}
      {page === "User" ? <FontAwesome name="user-circle" size={24} color="black" style={ active} onPress={() => { navigation.navigate("User") }} /> : <FontAwesome name="user-circle" size={24} color="black" style={styles.icon1} onPress={() => { navigation.navigate("User") }} />}
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#111111",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    paddingVertical: 10
  },
  icon1: {
    color: "white",
    fontSize: 30,
    borderRadius: 50,
    fontSize: 30,
    padding: 5,
  }

})