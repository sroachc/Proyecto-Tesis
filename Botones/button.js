import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";

export default function ButtonGradient (){

    return(
        <TouchableOpacity style={styles.container}>
            <LinearGradient 
                colors={['#58D3F7', '#7401DF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}} 
                style={styles.button}
            >
                <Text style={styles.text}>Publicar</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({

        container: {
            flex:1,
            width:120
        },

        text: {
            fontSize: 14,
            color: '#fff',
            fontWeight: 'bold',
        },
        button: {
            height: 50,
            borderRadius: 25,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
        },
});