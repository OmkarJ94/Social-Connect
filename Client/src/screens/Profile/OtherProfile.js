import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip, key } from "@env"
const OtherProfile = ({ navigation, route }) => {
    const { User } = route.params
    const [loginUser, setLoginUser] = useState()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState()
    const [isFollow, setisFollow] = useState(false)
    const [posts, setPost] = useState([])
    const [token, setToken] = useState()
    const fetchPost = async () => {
        try {
            
            const data = await fetch(`${ip}/getallposts`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email: User?.email
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
    const fetchData = async (token) => {
        try {
            const data = await fetch(`${ip}/user`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": key + token
                },
                body: JSON.stringify({
                    email: User.email
                })

            })

            const result = await data.json();

            setUser(result.fuser);

            if (User.username === result.loginuser?.username) {
                setShow(true)
            }
            if ((result.loginuser?.following).includes(result.fuser?.username)) {
                setisFollow(true)
                setShow(!show)
            }
        } catch (error) {
            
            alert("Something went wrong")
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
            fetchPost()
        }).catch((err) => {
            alert("You must be logged in")
            navigation.navigate("Login")

        })
        AsyncStorage.getItem("user").then((data) => {
            const temp = JSON.parse(data)
            setLoginUser({ username: temp?.username })
        }).catch((err) => {
            
            alert("You must be logged in")
            navigation.navigate("Login")
            return;
        })


    }, [])
    const Followthis = async () => {
        try {
            const response = await fetch(`${ip}/follouser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    loginuser: loginUser?.username,
                    follower: user?.username
                })
            })

            const result = await response.json();

            if (response.status === 200) {
                setisFollow(!isFollow)
                setUser(result.user1)
                setShow(!show)
            }
            else {
                alert("no")
            }
        } catch (error) {
            
        }
    }
    return (
        <View style={styles.container} >
            <Navbar navigation={navigation} />

            <ScrollView>
                <View style={styles.c1}>
                    <Image style={styles.profilepic} source={{ uri: user?.profilepic }} />
                    <Text style={styles.txt}>@{user?.username}</Text>
                    {!(user?.username === loginUser?.username) && <TouchableOpacity onPress={() => { Followthis() }}>
                        {isFollow ?

                            <>
                                <View style={styles.row}>
                                    <Text style={styles.follow}>Following</Text>
                                    <Text style={styles.message} onPress={() => {
                                        navigation.navigate("Message", {
                                            user
                                        })
                                    }}>Message</Text>

                                </View>
                            </>
                            :
                            <Text style={styles.follow}>Follow</Text>
                        }
                    </TouchableOpacity>}
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
                                <Text style={styles.txt2}>{(posts)?.length}</Text>
                            </View>
                        </View>

                    </View>
                    {show && <Text style={styles.description}>{user?.description}</Text>}
                </View>
                {show && <View style={styles.c1}>
                    <Text style={styles.txt}>Your Posts</Text>
                    <View style={styles.c13}>
                        {
                            posts?.length === 0 ?
                                <Text style={[styles.txt, { fontSize: 15 }]}>{user?.username} have not posted anything yet.</Text>

                                : posts?.map((ele, index) => {

                                    return (
                                        <Image key={index} source={{ uri: ele?.url }} style={styles.postpic} />
                                    )
                                })
                        }
                    </View>

                </View>}

            </ScrollView>
            <Footer navigation={navigation} />
        </View >
    )
}

export default OtherProfile

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
    row: {
        flexDirection: 'row',
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
    message: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20
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
    follow: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: '#0AD6A0',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20
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