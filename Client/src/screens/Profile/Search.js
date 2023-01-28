import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import UserCard from './UserCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ip } from "@env"
const Search = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(true)
  const fetchAllUsers = async () => {
    try {

      setLoading(true)
      if (keyword === "") {
        setError(true)
        setUsers([])
        setLoading(false)
        return;
      }
      const data = await fetch(`${ip}/searchuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          keyword
        })
      });
      const result = await data.json();
      if ((result.data).length === 0) {
        setError(true)
        setUsers([])
      }

      else if (data.status === 200) {
        setError(false)
        setUsers(result.data)
      }
      else {
        setUsers([])
        setError(true)
        alert("Something Went Wrong");
      }
    } catch (error) {
      
      alert("Something Went Wrong");
    }
    setLoading(false)
  }
  useEffect(() => {
    AsyncStorage.getItem("token").then((data) => {
      if (data === null) {
        alert("You must be log in")
        navigation.navigate("Login")
      }

    }).catch((err) => {
      alert("Something Went Wrong")

    })
    fetchAllUsers()
  }, [keyword])

  return (
    <View style={styles.container}>
      <Navbar />
      <TextInput style={styles.searchbar} placeholder="Search"

        onChangeText={(text) => setKeyword(text)}
      />
      {
        loading ? <ActivityIndicator style={styles.indicator} />
          :
          error ? <Text style={styles.formHead}>No User Found</Text>
            :
            <ScrollView style={styles.scroll}>
              {


                users?.map((ele) => {

                  return (
                    <UserCard key={ele.username} user={ele} navigation={navigation} />
                  )
                })
              }

            </ScrollView>

      }
      <Footer navigation={navigation} page="Search" />
    </View >
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 60,
    fontSize: 18,
    alignSelf: 'center',
  },
  scroll: {
    width: "95%",
    marginTop: 20,
    alignSelf: 'center',
  },

  formHead: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50
    // backgroundColor: 'white',
  },
  indicator: {
    marginTop: 50
  }

})
