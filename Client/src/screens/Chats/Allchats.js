import { ScrollView, StyleSheet, Text, TouchableOpacity, Image, TextInput, View, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from '../Profile/UserCard';
import { key, ip } from "@env"
const Allchats = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [loginUser, setLoginUser] = useState();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState([]);
  const [recievers, setRecievers] = useState([])
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

        setLoginUser(result.loginuser);
        fetchMessagedUser(result.loginuser._id)
      }
      else {
        alert("Something Went Wrong")
      }
    } catch (error) {
      
      alert("Something Went Wrong")

    }
  }
  const fetchMessagedUser = async (_id) => {
    try {

      const response = await fetch(`${ip}/getmessageduser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: _id
        })
      })

      const result = await response.json();
      if (response.status === 200) {

        setChats(result);
      }
      else {
        alert("Something Went Wrong")
      }
    } catch (error) {
      
      alert("Something Went Wrong")

    }
  }


  const fetchChats = async () => {
    try {
      setLoading(true)
      if (keyword === "") {
        setError(true)
        setRecievers([])
        setLoading(false)
        return;
      }
      const response = await fetch(`${ip}/searchuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword,
          id: 1,
          _id: loginUser?._id
        })
      })

      const result = await response.json();

      if (result.length === 0) {
        setError(true)
        setRecievers([])
      }
      else if (response.status === 200) {
        setError(false)
        setRecievers(result);
      }
      else {
        setRecievers([])
        setError(true)
        alert("Something Went Wrong");
      }
    } catch (error) {
      
      alert("Something went wrong")
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchChats();
  }, [keyword])
  useEffect(() => {
    AsyncStorage.getItem("token").then(async (data) => {
      if (data === null) {
        alert("You must be log in")
        navigation.navigate("Login")
      }
      const temp = await JSON.parse(data)
      fetchData(temp);


    }).catch((err) => {
      
      alert("Something Went Wrong")

    })
  }, [])
  return (
    <ScrollView style={styles.container}>
      <Ionicons name="chevron-back-circle" size={24} color="white" style={styles.gohomeicon}

        onPress={() => navigation.navigate('Home')}
      />

      <View style={styles.c1}>
        <Text style={styles.formHead2}>Your Chats</Text>
        <TextInput style={styles.searchbar} placeholder="Search"

          onChangeText={(text) => setKeyword(text)}
        />
        {
          loading ? <ActivityIndicator style={styles.indicator} />
            :
            error && keyword != "" ? <Text style={styles.formHead}>No User Found</Text>
              :
              <ScrollView style={styles.scroll}>
                {


                  recievers?.map((ele) => {

                    return (
                      <UserCard key={ele.username} user={ele} navigation={navigation}
                        page="allchats" />
                    )
                  })
                }

              </ScrollView>

        }
      </View>
      {
        chats.length === 0
          ?
          <Text style={[styles.formHead2, { marginTop: 20, fontSize: 30 }]}>No Chats</Text>
          :
          chats?.map((user, index) => {

            return (
              <TouchableOpacity onPress={() => { navigation.navigate("Message", { user }) }} key={index}>
                <View style={styles.container1}>
                  <Image source={{ uri: user?.profilepic }} style={styles.img} />

                  <View styles={styles.c1}>
                    <Text style={styles.username}>{user?.username}</Text>

                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
    </ScrollView>
  )
}

export default Allchats

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
  },
  container1: {
    backgroundColor: "#111111",
    width: "100%",
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  gohomeicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 10,
    color: 'white',
    fontSize: 30,
  },
  formHead2: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 18,
    alignSelf: 'center',
  },
  c1: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#111111',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 18,
  },
  formHead: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50
    // backgroundColor: 'white',
  },
  c2: {
    width: '100%',
    padding: 10,
  }

})
