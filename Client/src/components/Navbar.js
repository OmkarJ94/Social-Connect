import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Navbar = ({ navigation, show, page }) => {
    return (
        <View style={styles.container}>

            <Image source={{ uri: "https://www.clipartmax.com/png/small/160-1601180_visit-ja-org-instagram-red-icon-png.png" }} style={styles.img} />
            {show &&
                <>
                    <MaterialIcons name="add-to-photos" size={24} style={styles.icon2} color="white" onPress={() => { navigation.navigate("AddPost") }} />
                    <Entypo name="chat" size={24} color="white" style={styles.icon} onPress={() => {
                        navigation.navigate("Allchats")
                    }} />

                </>
            }
            {
                page === "profile" &&
                <>
                    <MaterialIcons name="add-to-photos" size={24} style={styles.icon2} color="white" onPress={() => { navigation.navigate("AddPost") }}/>

                    <AntDesign name="setting" size={24} color="black" style={styles.icon1} onPress={() => { navigation.navigate("Setting") }} />
                </>
            }
        </View>
    )
}

export default Navbar


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: '#111111',

    },
    img: {
        resizeMode: "contain",
        width: 30,
        height: 30,
        borderRadius: 50,
        marginLeft: 25

    },
    icon2: {
        position: "absolute",
        right: 70,
        top: 10,
        fontSize: 30,
    },
    icon: {
        marginRight: 20,
        fontSize: 30,
        // marginTop:60
    }
    ,
    icon1: {
        color: 'white',
        fontSize: 30,
        marginRight: 20
    },

})