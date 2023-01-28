import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Otp = ({ navigation, route }) => {
  let { code, email, forgetPassword } = route.params
  const [otp, setOtp] = useState('')
  const handleSubmit = () => {
    try {
      if (code == otp) {
        if (forgetPassword) {
          navigation.navigate("EnterPasswords", {
            email
          })
        }
        else {

          navigation.navigate("Signup_username", {
            email
          })
        }

      }
      else {
        alert("Invalid OTP")
      }
    } catch (error) {
      alert("Invalid OTP")

    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://www.clipartmax.com/png/small/160-1601180_visit-ja-org-instagram-red-icon-png.png" }} style={styles.img} />
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.note}>Enter the OTP sent to your email id</Text>
      <TextInput placeholder="Enter Your OTP" style={styles.ip} onChangeText={(text) => { setOtp(text) }} />

      <TouchableOpacity style={styles.touchable} onPress={handleSubmit}><Text style={styles.signup} >Next</Text></TouchableOpacity>
    </View >
  )
}

export default Otp

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
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
  note: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,

  },
  forgot: {
    color: 'gray',
    fontSize: 15,
    textAlign: 'right',
    width: '80%',
    marginVertical: 10,
  },
  touchable: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  signup: {

    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  }
})