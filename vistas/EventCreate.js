import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView, Image } from "react-native";
import ButtonGradient from "../Botones/button";
import Categorias from "../Components/Categoria";
import Comunas from '../Components/Comuna';
import FechaPicker from '../Components/fecha';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const EventCreate = () => {
  const [eventName, setEventName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate,] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);
  const [userLimit, setUserLimit] = useState(1);
  const [userLimitError, setUserLimitError] = useState('');
  const [additionalTextInputs, setAdditionalTextInputs] = useState(['']);
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePublishEvent = async () => {
    // Prepara los datos del evento a enviar al servidor
    const eventData = {
      nombre: eventName, // Reemplaza con el nombre del evento que el usuario ingresó
      fecha: selectedDate, // Reemplaza con la fecha del evento
      descripcion: description, // Reemplaza con la descripción del evento
    };
  
    try {
      // Realiza una solicitud HTTP POST al servidor para crear el evento
      const response = await axios.post('http://192.168.100.3:3000/api/crear-eventos', eventData);
  
      // Si la solicitud fue exitosa, puedes mostrar un mensaje o realizar otras acciones necesarias
      console.log('Evento creado con éxito', response.data);
    } catch (error) {
      // En caso de error, maneja la situación, muestra un mensaje de error, etc.
      console.error('Error al crear el evento:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  useFocusEffect(() => {
    if (!hasFocused) {
      setSelectedDate(null);
      setHasFocused(true);
    }
  });

  const handleAddTextInput = () => {
    setAdditionalTextInputs([...additionalTextInputs, '']);
  }; 
  
  const handleUserLimitChange = (text) => {
    const limit = parseInt(text, 10);
    setUserLimit(limit);

    if (limit < 1) {
      setUserLimitError('La cantidad de usuarios permitidos debe ser al menos 1');
    } else {
      setUserLimitError('');
    }
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.titulo}>Crea tu Encuentro</Text>
      <TextInput
        placeholder="Nombre del Encuentro"
        style={styles.textinput}
        value={eventName}
        onChangeText={text => setEventName(text)}
      />
      <Categorias
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Comunas
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Text>Selecciona la fecha</Text>
      <FechaPicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />
      <Text>Cantidad de usuarios permitidos:</Text>
      <TextInput
        placeholder="Cantidad mínima: 1"
        style={styles.textinput}
        keyboardType="phone-pad"
        value={userLimit.toString()}
        onChangeText={handleUserLimitChange}
      />
      {userLimitError && (
        <Text style={styles.errorText}>{userLimitError}</Text>
      )}
      <Text>Descripción del Encuentro:</Text>
      <TextInput
        placeholder="Escribe una descripción aquí"
        style={styles.descriptionInput}
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={handleDescriptionChange}
      />
      <Button title="Agregar Campo de Texto" onPress={handleAddTextInput} />
      {additionalTextInputs.map((value, index) => (
        <TextInput
          key={index}
          placeholder="Campo de Texto Adicional"
          style={styles.textinput}
          value={value}
          onChangeText={(text) => {
            const updatedInputs = [...additionalTextInputs];
            updatedInputs[index] = text;
            setAdditionalTextInputs(updatedInputs);
          }}
        />
      ))}
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={styles.selectedImage}
        />
      )}
      <TouchableOpacity onPress={selectImage}>
        <Text>Selecciona una imagen</Text>
      </TouchableOpacity>
      <ButtonGradient  onPress={handlePublishEvent}/>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

export default EventCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  textinput: {
    borderWidth: 1,
    paddingStart: 85,
    borderColor: 'gray',
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#D8D8D8',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '80%',
    height: 100, // Ajusta la altura según tus necesidades
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#D8D8D8',
  },
  selectedImage: {
    width: 100, // Ajusta el ancho según tus necesidades
    height: 100, // Ajusta la altura según tus necesidades
    marginTop: 20,
    borderRadius: 10,
  },
});
