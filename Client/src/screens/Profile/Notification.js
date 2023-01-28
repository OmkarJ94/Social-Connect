import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Notification = ({ navigation }) => {

  useEffect(() => {
    AsyncStorage.getItem("token").then((data) => {
      if (data === null) {
        alert("You must be log in")
        navigation.navigate("Login")
      }
   
    }).catch((err) => {
      alert("Something Went Wrong")

    })
  }, [])
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.c1}>
        <View style={styles.notificationbar}>
          <Text style={styles.txt}>Some Notification</Text>
        </View>
      </View>
      <Footer navigation={navigation} page="Notification" />
    </View >
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  c1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  notificationbar: {
    width: '98%',
    height: 50,
    backgroundColor: '#111111',
    marginTop: 10,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#111111',
  }
})