import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { ip } from "@env"
const ChangePassword = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [Loading, setLoading] = useState(false)
    const [token, setToken] = useState()
    const [user, setUser] = useState()
    useEffect(() => {
        AsyncStorage.getItem("token").then((data) => {
            if (data === null) {
                alert("You must be log in")
                navigation.navigate("Login")
              }
            setToken(JSON.parse(data))
        }).catch((err) => {
            alert("You must be logged in")
            return;
        })

        AsyncStorage.getItem("user").then((data) => {
            setUser(JSON.parse(data))

        }).catch((err) => {
            alert("You must be logged in")
            return;
        })
    }, [])
    const handleSubmit = async () => {
        try {
            setLoading(true)
            if ((newPassword != confirmPassword) || (oldPassword === "" || newPassword === "" || confirmPassword === "")) {
                alert("Invalid Password")

            }
            else {
                const data = await fetch(`${ip}/changepassword`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user?.email,
                        newPassword,
                        oldPassword
                    })
                })

                const result = await data.json();
                if (data.status === 200) {
                    alert(result.message)
                    navigation.navigate('Login')
                }
                else {
                    alert(result.message)
                }
            }

        }
        catch (error) {
            
            alert("Something Went Wrong")
        }
        setLoading(false)
    }



    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://www.clipartmax.com/png/small/160-1601180_visit-ja-org-instagram-red-icon-png.png" }} style={styles.img} />
            {/* <Text style={styles.title}>Enter Passwords</Text> */}
            <Text style={styles.note}>Enter Strong Password</Text>
            <TextInput secureTextEntry={true} placeholder="Enter Old Password" style={styles.ip} onChangeText={(text) => setOldPassword(text)} />
            <TextInput secureTextEntry={true} placeholder="Enter New Password" style={styles.ip} onChangeText={(text) => setNewPassword(text)} />
            <TextInput secureTextEntry={true} placeholder="Confirm Password" style={styles.ip} onChangeText={(text) => setConfirmPassword(text)} />

            {Loading ? <ActivityIndicator /> : <TouchableOpacity style={styles.touchable} onPress={handleSubmit}><Text style={styles.signup}>Submit</Text></TouchableOpacity>}
        </View >
    )
}

export default ChangePassword


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