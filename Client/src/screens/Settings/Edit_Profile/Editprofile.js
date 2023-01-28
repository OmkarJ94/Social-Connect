import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
    const logout = () => {
        AsyncStorage.removeItem('token').then(() => {
            alert('Logged out successfully')
            navigation.navigate('Login')
        })
    }
    return (
        <View>
            <View style={styles.container}>
                <Ionicons name="chevron-back-circle" size={24} color="white" style={styles.gohomeicon}

                    onPress={() => navigation.navigate('Setting')}
                />
                <Text style={styles.formHead}>Edit Profile</Text>
                <View style={styles.list}>
                    <Text style={styles.txt1}
                        onPress={() => navigation.navigate('UploadProfile')}
                    >Change Profile Picture</Text>
                    <Text style={styles.txt1}
                        onPress={() => navigation.navigate('EditUserName')}
                    >Change Username</Text>
                    <Text style={styles.txt1} onPress={()=> navigation.navigate('EditDescription')}>Change Descrption</Text>

                </View>
            </View>
        </View>
    )
}

export default EditProfile


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    gohomeicon: {
        position: 'absolute',
        top: 20,
        left: 5,
        zIndex: 10,
        color: 'white',
        fontSize: 30,
    },
    txt1: {
        marginTop: 20,
        color: 'white',
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    formHead: {
        fontSize: 30,
        
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        // backgroundColor: 'white',
    },
    list: {
        marginLeft: 10
    },
    formInput: {
        width: '80%',
        // height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
    },
    formbtn: {
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        marginVertical: 10,
    },
    formTextLinkRight: {
        color: 'gray',
        fontSize: 15,
        textAlign: 'right',
        width: '80%',
        marginVertical: 10,
    },
    formTextLinkCenter: {
        color: 'gray',
        fontSize: 16,
    },
    formHead2: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        // fontWeight: 'bold',
        // backgroundColor: 'white',
    },
    formHead3: {
        fontSize: 20,
        // backgroundColor: 'white',
        color: 'grey',
        textAlign: 'center',
        fontWeight: '400',
        padding: 10,
        borderRadius: 10,
        width: '80%',
        marginVertical: 10,
    }
})