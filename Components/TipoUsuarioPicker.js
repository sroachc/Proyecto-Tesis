import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

const TipoUsuarioPicker = ({ selectedType, onSelectType }) => {
  const [tiposUsuario, setTiposUsuario] = useState([]);

  useEffect(() => {
    axios.get('http://190.44.53.185:3300/api/tiposUsuarios')
      .then(response => setTiposUsuario(response.data))
      .catch(error => console.error('Error al obtener tipos de usuario:', error));
  }, []);

  return (
    <View>
      <Text>Tipo de Usuario:</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={onSelectType}
        style={styles.picker}
        itemStyle={styles.itemStyle}
      >
        <Picker.Item label="Selecciona un Tipo de Usuario" value="" />
        {tiposUsuario.map(tipo => (
          <Picker.Item key={tipo.cod_tipo_usuario} label={tipo.tipo_usuario} value={tipo.cod_tipo_usuario.toString()} />
        ))}
      </Picker>
    </View>
  );
};


export default TipoUsuarioPicker;