import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip, key } from "@env"
const User = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [posts, setPost] = useState([]);
  const [token, setToken] = useState()
  const fetchData = async (token) => {
    try {
      const data = await fetch(`${ip}/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": key + token
        },

      })

      const result = await data.json();

      if (data.status === 200) {
        setUser(result.loginuser);
        fetchPost(result.loginuser.email)
      }
      else if (data.status === 401 || data.status === 403) {
        alert(result.message);
        navigation.navigate("Login")
      }
      else {
        alert("Something went wrong")

      }
    } catch (error) {

      alert("Something went wrong")
    }
  }

  const fetchPost = async (email) => {
    try {

      const data = await fetch(`${ip}/getallposts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email
        })

      })

      const result = await data.json();

      if (data.status === 200) {

        setPost(result)
      }
      else {
        alert("Something Went Wrong")
      }
    } catch (error) {

      alert("Something Went Wrong")

    }
  }
  useEffect(() => {
    AsyncStorage.getItem("token").then((data) => {
      if (data === null) {
        alert("You must be log in")
        navigation.navigate("Login")
      }
      setToken(JSON.parse(data))
      fetchData(JSON.parse(data));

    }).catch((err) => {
      alert("Something Went Wrong")

    })

  }, [])



  return (
    <View style={styles.container} >
      <Navbar page="profile" navigation={navigation} />
      <Ionicons name="refresh" size={24} color="white" style={styles.icon} onPress={() => { fetchData(token) }} />
      <ScrollView>
        <View style={styles.c1}>
          <Image style={styles.profilepic} source={{ uri: user?.profilepic }} />
          <Text style={styles.txt}>@{user?.username}</Text>
          <View style={styles.c11}>
            <View style={styles.c111}>
              <Text style={styles.txt1}>Follwers</Text>
              <Text style={styles.txt2}>{(user?.followers)?.length}</Text>
            </View>

            <View style={styles.c111}>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Following</Text>
                <Text style={styles.txt2}>{(user?.following)?.length}</Text>
              </View>
            </View>

            <View style={styles.c111}>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Posts</Text>
                <Text style={styles.txt2}>{posts?.length}</Text>
              </View>
            </View>

          </View>
          <Text style={styles.description}>{user?.description}</Text>
        </View>
        <View style={styles.c1}>
          <Text style={styles.txt}>Your Posts</Text>
          <View style={styles.c13}>
            {
              posts.length === 0 ?
                <Text style={[styles.txt, { fontSize: 15 }]}>You have not posted anything yet.</Text>

                : posts?.map((ele, index) => {

                  return (
                    <Image key={index} source={{ uri: ele?.url }} style={styles.postpic} />
                  )
                })
            }
          </View>

        </View>

      </ScrollView>
      <Footer navigation={navigation} page="User" />
    </View >
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profilepic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10
  },
  icon: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    fontSize: 30
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  txt1: {
    color: 'white',
    fontSize: 15,
  },
  txt2: {
    color: 'white',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white'
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
    backgroundColor: '#111111',
    width: '100%',
    padding: 10,
    paddingVertical: 20,
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 5
  },
  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center'
  },
  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  refresh: {
    position: 'absolute',
    top: 50,
    right: 5,
    zIndex: 1,
  }
})