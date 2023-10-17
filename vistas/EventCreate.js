import React from "react";
import { StatusBar } from "react-native";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import ButtonGradient from "../Botones/button";
import Categorias from "../Components/Categoria";


const EventCreate = () => {
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Crea tu Encuentro</Text>
            <TextInput 
                placeholder="Nombre del Encuentro"
                style={styles.textinput}
            />
            <TextInput
                placeholder="Categoria del Encuentro"
                style={styles.textinput}
            />
            <Categorias
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <ButtonGradient/>
            <StatusBar style="auto"/>
        </View>
    );
}
export default EventCreate;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
    },
    textinput:{
        borderWidth:1,
        paddingStart: 85,
        borderColor: 'gray',
        padding: 10,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: '#D8D8D8',


    },
});