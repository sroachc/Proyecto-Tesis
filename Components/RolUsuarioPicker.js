import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

const RolUsuarioPicker = ({ selectedRole, onSelectRole }) => {
  const [rolesUsuario, setRolesUsuario] = useState([]);

  useEffect(() => {
    axios.get('http://190.44.53.185:3300/api/rolesUsuario')
      .then(response => setRolesUsuario(response.data))
      .catch(error => console.error('Error al obtener roles de usuario:', error));
  }, []);

  return (
    <View>
      <Text>Rol de Usuario:</Text>
      <Picker
        selectedValue={selectedRole}
        onValueChange={onSelectRole}
        style={styles.picker}
        itemStyle={styles.itemStyle}
      >
        <Picker.Item label="Selecciona un Rol de Usuario" value="" />
        {rolesUsuario.map(rol => (
          <Picker.Item key={rol.cod_rol_usuario} label={rol.rol_usuario} value={rol.cod_rol_usuario.toString()} />
        ))}
      </Picker>
    </View>
  );
};



export default RolUsuarioPicker;