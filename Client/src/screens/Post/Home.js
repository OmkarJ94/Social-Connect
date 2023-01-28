import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import FollowerPost from './FollowerPost'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {


  useEffect(() => {
    AsyncStorage.getItem("token").then(async (data) => {
      if (data === null) {
        alert("You must be log in")

        navigation.navigate("Login")
      }

    }).catch((error) => {

      alert("Something Went Wrong")

    })

  }, [])

  return (
    <View style={styles.container}>
      <StatusBar />
      <Navbar navigation={navigation} show={true} />

      <FollowerPost />

      <Footer navigation={navigation} page="Home" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: "25%",
  },
  img: {
    resizeMode: "contain",
    width: 70,
    height: 70,
    borderRadius: 50

  },
  ip: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

  },
  forgot: {
    color: 'gray',
    fontSize: 15,
    textAlign: 'right',
    width: '80%',
    marginVertical: 10,
  },
  touchable: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 20,
    alignItems: 'center'
  },
  touchable1: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 15
  },
  signup: {

    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  }
})