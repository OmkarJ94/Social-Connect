import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "@env"
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (!email || !password) {
        alert("Enter Valid Credentials");
      }
      else {
        const data = await fetch(`${ip}/login`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(
            {
              email, password
            }
          )
        })

        const result = await data.json();

        if (data.status === 200) {
          alert(result.message);
          await AsyncStorage.setItem("token", JSON.stringify(result.token))
          await AsyncStorage.setItem("user", JSON.stringify(result.user))
          navigation.navigate("Home")
        }
        else {
          alert(result.message);
        }
      }
    } catch (error) {

      alert("Something Went Wrong");
    }
    setLoading(false)
  }


  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://www.clipartmax.com/png/small/160-1601180_visit-ja-org-instagram-red-icon-png.png" }} style={styles.img} />
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Enter Your Email" style={styles.ip} onChangeText={(text) => setEmail(text)} />
      <TextInput placeholder="Enter Your Password" style={styles.ip} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
      <Text style={[styles.forgot, { color: "#fff" }]} onPress={() => {
        navigation.navigate("FogotPassword")
      }}>
        Forgot Password
      </Text>
      <Text style={[styles.forgot, { marginBottom: 25 }]}>Don't have an account?
        <Text style={[styles.forgot, { color: "#fff", marginBottom: 10 }]} onPress={() => {
          navigation.navigate("Signup_Email")
        }}>
          Sign Up
        </Text>
      </Text>
      {Loading ?
        <ActivityIndicator />
        : <TouchableOpacity style={styles.touchable} onPress={handleSubmit}><Text style={styles.signup}>Log In</Text></TouchableOpacity>}
    </View >
  )
}

export default Login

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