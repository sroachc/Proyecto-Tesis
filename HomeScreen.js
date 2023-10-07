import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Esta es la pantalla principal</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
        <Text>Agregar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;