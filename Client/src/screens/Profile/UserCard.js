import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserCard = ({ user, navigation, page }) => {
    
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
        <TouchableOpacity onPress={() => {
            if (page === "allchats") {
                navigation.navigate("Message", { user, page: "allchats" })
            }
            else {

                navigation.navigate("OtherProfile", { User: user })
            }
        }
        }
        >
            <View style={styles.container}>
                <Image source={{ uri: user.profilepic }} style={styles.img} />

                <View styles={styles.c1}>
                    <Text style={styles.username}>{user.username}</Text>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#111111",
        width: "100%",
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    username: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10
    },

    c1: {
        marginLeft: 10,
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
    c2: {
        width: '100%',
        padding: 10,
    }
})