import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { firebase } from "../../../firebase/Config"
import * as ImagePicker from 'expo-image-picker';
import { ip } from "@env"
const UploadProfile = ({ navigation }) => {
    const [image, setImage] = useState()
    const [user, setUser] = useState()
    const [Loading, setLoading] = useState(false)

    useEffect(() => {


        AsyncStorage.getItem("user").then((data) => {
            if (data === null) {
                alert("You must be log in")
                navigation.navigate("Login")
              }
            setUser(JSON.parse(data))

        }).catch((err) => {
            alert("You must be logged in")
            return;
        })
    }, [])

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync
                (
                    {
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    }

                )

            if (!result.canceled) {
                const source = { uri: result.assets[0].uri }
                setImage(source)
                const response = await fetch(result.assets[0].uri)
                const blob = await response.blob();
                const filename = result.assets[0].uri.substring(result.assets[0].uri)

                const ref = firebase.storage().ref().child(filename)

                const snapshot = await ref.put(blob)
                const url = await snapshot.ref.getDownloadURL();

                return url;
            }
            else {
                return null;
            }
        } catch (error) {
            
        }
    }


    const handleSubmit = async () => {
        try {
            setLoading(true)
            let url = await pickImage()
            if (url) {
                const data = await fetch(`${ip}/setprofilepicture`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user?.email,
                        url
                    })
                })

                const result = await data.json();
                if (data.status === 200) {
                    alert(result.message)
                    navigation.navigate('Editprofile')
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
            <Ionicons name="chevron-back-circle" size={24} color="white" style={styles.gohomeicon}

                onPress={() => navigation.navigate('Editprofile')}
            />
            <Ionicons name="refresh" size={24} color="black" />
            <Image source={{ uri: "https://www.clipartmax.com/png/small/160-1601180_visit-ja-org-instagram-red-icon-png.png" }} style={styles.img} />
            {/* <Text style={styles.title}>Enter Passwords</Text> */}
            <Text style={styles.note}>Choose a profile picture</Text>


            {Loading ? <ActivityIndicator /> : <TouchableOpacity style={styles.touchable} onPress={handleSubmit}><Text style={styles.signup}>Upload</Text></TouchableOpacity>}
        </View >
    )
}

export default UploadProfile


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
    },
    gohomeicon: {
        position: 'absolute',
        top: 20,
        left: 5,
        zIndex: 10,
        color: 'white',
        fontSize: 30,
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
        marginBottom: 10

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