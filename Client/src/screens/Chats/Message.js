import { StyleSheet, Text, View, StatusBar, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ip, key } from "@env"
import io from "socket.io-client"

const socket = io("http://192.168.97.96:5000")

const Message = ({ navigation, route }) => {
    const { user, page } = route.params
    const [loginuser, setLoginUser] = useState();
    const [socket, setSocket] = useState()
    const [fUser, setFuser] = useState();
    const [chat, setChat] = useState([]);
    const [currentMessage, setCurrentMessage] = useState()
    const [roomid, setRoomid] = useState()
    const [userid, setUserid] = useState()
    const [loading, setLoading] = useState(false)

    const sortid = async (id1, id2) => {
        if (id1 > id2) {
            return id1 + id2;
        }
        else {
            return id2 + id1;
        }
    }


    const sendMessage = async () => {
        try {
            const messagedata = {
                message: currentMessage,
                roomid,
                senderid: loginuser._id,
                recieverid: fUser._id,
                senderUserName: fUser.username,
                recieverUserName: loginuser.username
            }


            const response = await fetch(`${ip}/savemessage`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    messagedata
                })
            })

            if (response.status != 200) {
                setCurrentMessage("")
                alert("Something Went Wrong")
            }
            else {
                socket?.emit("sendMessage", messagedata)

                loadMessage(roomid)

                setCurrentMessage("")

            }

        } catch (error) {
            alert("Something Went Wrong")

        }
    }


    const fetchData = async () => {
        AsyncStorage.getItem("token").then(async (data) => {
            const response = await fetch(`${ip}/user`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": key + JSON.parse(data)
                },
                body: JSON.stringify({
                    email: user.email
                })
            })
            const result = await response.json()
            if (response.status === 200) {
                setLoginUser(result.loginuser);
                setFuser(result.fuser);
                let temproomid = await sortid(result.loginuser._id, result.fuser._id)
                setRoomid(temproomid)
                socket?.emit("joinRoom", { roomid: temproomid, user: result.loginuser })
                setLoading(true);
                loadMessage(temproomid)
                setLoading(false)
            }
            else {
                alert(result.message)
                navigation.navigate("Login")
            }
        }).catch((error) => {
            alert("Something Went Wrong")
        })



    }
    const scrollViewRef = useRef();


    const loadMessage = async (roomid) => {
        try {
            const response = await fetch(`${ip}/getmessages`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    roomid
                })
            })
            const result = await response.json()

            if (response.status === 200) {
                setChat(result)
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

        }).catch((err) => {
            alert("Something Went Wrong")

        })
        fetchData();
    }, [])
    useEffect(() => {
        loadMessage(roomid);
    }, [chat])
    useEffect(() => {
        socket?.on("reciveMessage", (data) => {
            loadMessage(roomid)
        })
    }, [socket])
    return (
        <View style={styles.container}>
            <View style={styles.s1}>
                <TouchableOpacity onPress={() => {

                    page === "allchats" ?
                        navigation.navigate("Allchats") :
                        navigation.navigate('OtherProfile', {
                            User: user
                        })

                }
                } style={styles.goback}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                </TouchableOpacity>

                <Image source={{ uri: fUser?.profilepic }} style={styles.profilepic} />

                <Text style={styles.username}>{fUser?.username}</Text>
            </View>



            <ScrollView style={styles.messageView}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {
                    chat.map((item, index) => {
                        return (
                            <View style={styles.message} key={index}>
                                {
                                    item.senderid == loginuser._id &&
                                    <View style={styles.messageRight}>
                                        <Text style={styles.messageTextRight}>{item.message}</Text>
                                    </View>
                                }
                                {
                                    item.senderid != loginuser._id && item != '' &&
                                    <View style={styles.messageLeft}>
                                        <Text style={styles.messageTextLeft}>{item.message}</Text>
                                    </View>
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>


            <View style={styles.sbottom}>
                <TextInput style={styles.sbottominput} placeholder='Type a message'
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => setCurrentMessage(text)}
                    value={currentMessage}
                />
                {loading ?
                    <ActivityIndicator />
                    :
                    <TouchableOpacity style={styles.sbottombtn}>
                        {
                            currentMessage ?
                                <MaterialIcons name="send" size={24} color="white"
                                    onPress={() => sendMessage()}
                                /> :
                                <MaterialIcons name="send" size={24} color="grey" />
                        }


                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    profilepic: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    username: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    s1: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#111111",
        padding: 10,
    },
    sbottom: {
        width: '100%',
        height: 50,
        backgroundColor: '#111111',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        borderRadius: 30,
    },
    sbottominput: {
        width: '80%',
        height: 40,
        fontSize: 17,
        color: 'white',
    },

    message: {
        width: '100%',
        // padding:10,
        borderRadius: 10,
        // marginVertical:5,
        // backgroundColor:'red',
    },
    messageView: {
        width: '100%',
        marginBottom: 50,
    },
    messageRight: {
        width: '100%',
        alignItems: 'flex-end',
        // backgroundColor:'red'
    },
    messageTextRight: {
        color: 'white',
        backgroundColor: '#1e90ff',
        // width:'min-content',
        minWidth: 100,
        padding: 10,
        fontSize: 17,
        borderRadius: 20,
        margin: 10,
    },
    messageLeft: {
        width: '100%',
        alignItems: 'flex-start',
        // backgroundColor:'red'
    },
    messageTextLeft: {
        color: 'white',
        backgroundColor: '#222222',
        color: 'white',
        fontSize: 17,
        minWidth: 100,
        padding: 10,
        borderRadius: 20,
        margin: 10,
    },
})