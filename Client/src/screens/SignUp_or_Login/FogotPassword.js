import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ip } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage'
const FogotPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [Loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const data = await fetch(`${ip}/sendotp?id=2`, {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          id: 2
        })
      })

      const result = await data.json();
      if (data.status === 200) {
        alert(result.message);
        navigation.navigate("Enterotp", {
          email,
          code: result.code,
          "forgetPassword": true
        })
      }
      else {
        alert(result.message);
      }

    } catch (error) {
      alert("Something went wrong");
    }
    setLoading(false)
  }

  useEffect(() => {
    AsyncStorage.getItem("token").then((data) => {
      if (data === null) {
        alert("You must be log in")
        navigation.navigate("Login")
      }
      setUser(JSON.parse(data))
    }).catch((err) => {
      alert("Something Went Wrong")

    })
  }, [])

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://www.clipartmax.com/png/small/160-1601180_visit-ja-org-instagram-red-icon-png.png" }} style={styles.img} />
      <Text style={styles.title}>Enter Email</Text>
      <TextInput placeholder="Enter Your Email" style={styles.ip} onChangeText={(text) => { setEmail(text) }} />

      <Text style={[styles.forgot, { marginBottom: 25 }]}>Go To&nbsp;
        <Text style={[styles.forgot, { color: "#fff", marginBottom: 10 }]} onPress={() => {
          navigation.navigate("Login")
        }}>
          Login
        </Text>
      </Text>
      {Loading ?
        <ActivityIndicator />
        : <TouchableOpacity style={styles.touchable} onPress={handleSubmit}><Text style={styles.signup}>Send OTP</Text></TouchableOpacity>}
      <Text style={styles.note}>We are sending otp to given email id</Text>
    </View >
  )
}

export default FogotPassword

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