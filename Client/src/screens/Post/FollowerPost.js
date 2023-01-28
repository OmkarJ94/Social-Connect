import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import PostCard from './PostCard';
import { ip, key } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
const FollowerPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async (token) => {
        try {
            const data = await fetch(`${ip}/getpost`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": key + token
                },
            })
            const result = await data.json();

            if (data.status === 200) {
                setPosts(result);

            }
            else {
                alert("Something Went Wrong")
            }
        } catch (error) {

            alert("Something Went Wrong")

        }
    }


    useEffect(() => {
        AsyncStorage.getItem("token").then(async (data) => {
            if (data === null) {
                alert("You must be log in")
                navigation.navigate("Login")
            }



            fetchData(JSON.parse(data));
        }).catch((error) => {

            alert("Something Went Wrong")

        })

    }, [])
    return (
        <>
            {loading ?
                <ActivityIndicator />
                :
                <ScrollView>
                    <View style={styles.container}>
                        {
                            posts.map((post, i) => {

                                return (

                                    <PostCard key={i} post={post} />

                                )
                            })
                        }
                    </View>
                </ScrollView>}
        </>
    );
};



export default FollowerPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,

    },


});