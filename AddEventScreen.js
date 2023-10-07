import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function AddEventScreen({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleAddEvent = () => {
    // Aquí puedes enviar los datos del evento a tu servidor o base de datos
    // Puedes usar las variables eventName, participants, category y description
    // Luego, puedes navegar de regreso a la pantalla principal
    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>Ingresa los datos del evento</Text>
      <TextInput
        placeholder="Nombre del evento"
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />
      <TextInput
        placeholder="Cantidad de participantes"
        value={participants}
        onChangeText={(text) => setParticipants(text)}
      />
      <TextInput
        placeholder="Categoría"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Agregar Evento" onPress={handleAddEvent} />
    </View>
  );
}

export default AddEventScreen;import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function AddEventScreen({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleAddEvent = () => {
    // Aquí puedes enviar los datos del evento a tu servidor o base de datos
    // Puedes usar las variables eventName, participants, category y description
    // Luego, puedes navegar de regreso a la pantalla principal
    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>Ingresa los datos del evento</Text>
      <TextInput
        placeholder="Nombre del evento"
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />
      <TextInput
        placeholder="Cantidad de participantes"
        value={participants}
        onChangeText={(text) => setParticipants(text)}
      />
      <TextInput
        placeholder="Categoría"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Agregar Evento" onPress={handleAddEvent} />
    </View>
  );
}

