import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { ip } from "@env"


const Signup_Enterusername = ({ navigation, route }) => {
  let { email } = route.params

  const [username, setusername] = useState('')
  const [Loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const data = await fetch(`${ip}/changeusername`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, username
        })
      })
      const result = await data.json();
      if (data.status === 200) {
        alert(result.message)
        navigation.navigate("EnterPasswords", {
          email
        })
      }
      else {
        alert(result.message)
      }
    } catch (error) {
      alert("Something went wrong")
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("Login")}>
        <AntDesign name="back" size={24} color="gray" />
        <Text style={{ color: "gray", fontSize: 15, marginLeft: 5 }}>Go Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: "https://www.clipartmax.com/png/small/160-1601180_visit-ja-org-instagram-red-icon-png.png" }} style={styles.img} />
      <Text style={styles.title}>Choose A Username</Text>
      <TextInput placeholder="Enter A Username" style={styles.ip} onChangeText={(text) => { setusername(text) }} />


      {Loading ? <ActivityIndicator /> : <TouchableOpacity style={styles.touchable1} onPress={handleSubmit
      }><Text style={styles.signup}>Next</Text></TouchableOpacity>}
    </View >
  )
}

export default Signup_Enterusername


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
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

  },
  touchable1: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 15
  },
  touchable: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 20,
    alignItems: 'center'
  },
  signup: {

    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  }
})