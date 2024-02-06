import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const EditUserView = ({ route, navigation }) => {
  const { user } = route.params;
  const [editedUser, setEditedUser] = useState({
    rut: user.rut,
    nom_usuario: user.nom_usuario,
    apellidos: user.apellidos,
    edad: user.edad.toString(),
    genero: user.genero,
    celular: user.celular.toString(),
    correo: user.correo,
    contrasena: user.contrasena,
    direccion: user.direccion,
    comuna: user.fk_comuna.toString(),
    tipoUsuario: user.fk_tipo_usuario.toString(),
    rolUsuario: user.fk_rol_usuario,
  });

  const [comunas, setComunas] = useState([]);
  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [rolesUsuario, setRolesUsuario] = useState([]);
  const [comunasLoaded, setComunasLoaded] = useState(false);

  useEffect(() => {
    fetchComunas();
    fetchTiposUsuarios();
    fetchRolesUsuarios();
  }, []);

  const fetchComunas = async () => {
    try {
      const response = await axios.get('http://190.44.53.185:3300/comunas');
      setComunas(response.data);
      setComunasLoaded(true);
    } catch (error) {
      console.error('Error al obtener las comunas:', error);
    }
  };

  const fetchTiposUsuarios = async () => {
    try {
      const response = await axios.get('http://190.44.53.185:3300/tiposUsuario');
      setTiposUsuario(response.data);
    } catch (error) {
      console.error('Error al obtener tipos de usuario:', error);
    }
  };

  const fetchRolesUsuarios = async () => {
    try {
      const response = await axios.get('http://190.44.53.185:3300/rolesUsuario');
      setRolesUsuario(response.data);
    } catch (error) {
      console.error('Error al obtener roles de usuario:', error);
    }
  };

  const updateUser = async () => {
    try {
      // Validaciones de campos, si es necesario

      // Lógica para actualizar el usuario en el servidor
      await axios.put(`http://190.44.53.185:3300/api/usuarios/${user.cod_usuario}`, {
        ...editedUser,
      });

      Alert.alert('Éxito', 'Usuario actualizado con éxito');
      // Puedes redirigir a la vista principal o realizar alguna otra acción después de la actualización
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Alert.alert('Error', 'Hubo un error al actualizar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>EDITAR USUARIO</Text>
         
    <TextInput
      placeholder="Rut"
      style={styles.input}
      value={editedUser.rut}
      onChangeText={(text) => setEditedUser({ ...editedUser, rut: text })}
    />

    <TextInput
      placeholder="Nombres"
      style={styles.input}
      value={editedUser.nom_usuario}
      onChangeText={(text) => setEditedUser({ ...editedUser, nom_usuario: text })}
    />

    <TextInput
      placeholder="Apellidos"
      style={styles.input}
      value={editedUser.apellidos}
      onChangeText={(text) => setEditedUser({ ...editedUser, apellidos: text })}
    />

    <TextInput
      placeholder="Edad"
      style={styles.input}
      value={editedUser.edad}
      onChangeText={(text) => setEditedUser({ ...editedUser, edad: text })}
      keyboardType="numeric"
    />

    <TextInput
      placeholder="Género"
      style={styles.input}
      value={editedUser.genero}
      onChangeText={(text) => setEditedUser({ ...editedUser, genero: text })}
    />

    <TextInput
      placeholder="Celular"
      style={styles.input}
      value={editedUser.celular}
      onChangeText={(text) => setEditedUser({ ...editedUser, celular: text })}
      keyboardType="numeric"
    />

    <TextInput
      placeholder="Correo electrónico"
      style={styles.input}
      value={editedUser.correo}
      onChangeText={(text) => setEditedUser({ ...editedUser, correo: text })}
      keyboardType="email-address"
    />

    <TextInput
      placeholder="Contraseña"
      style={styles.input}
      value={editedUser.contrasena}
      onChangeText={(text) => setEditedUser({ ...editedUser, contrasena: text })}
      secureTextEntry
    />

    <TextInput
      placeholder="Dirección"
      style={styles.input}
      value={editedUser.direccion}
      onChangeText={(text) => setEditedUser({ ...editedUser, direccion: text })}
    />
      {/* Otros campos similares */}
      
      {comunasLoaded && (
  <View style={styles.input}>
    <Picker
      style={styles.picker}
      selectedValue={editedUser.comuna}
      onValueChange={(itemValue) => setEditedUser({ ...editedUser, comuna: itemValue })}
    >
      <Picker.Item label="Selecciona una Comuna" value="" />
      {comunas.map((comuna, index) => (
        <Picker.Item key={index} label={comuna.comuna} value={comuna.cod_comuna.toString()} />
      ))}
    </Picker>
  </View>
)}

{comunasLoaded && (
  <View style={styles.input}>
    <Picker
      style={styles.picker}
      selectedValue={editedUser.tipoUsuario}
      onValueChange={(itemValue) => setEditedUser({ ...editedUser, tipoUsuario: itemValue })}
    >
      <Picker.Item label="Selecciona un Tipo" value="" />
      {tiposUsuario.map((tipo_usuario, index) => (
        <Picker.Item
          key={index}
          label={tipo_usuario.tipo_usuario}
          value={tipo_usuario.cod_tipo_usuario.toString()}
        />
      ))}
    </Picker>
  </View>
)}

{comunasLoaded && (
  <View style={styles.input}>
    <Picker
      style={styles.picker}
      selectedValue={editedUser.fk_rol_usuario}
      onValueChange={(itemValue) => setEditedUser({ ...editedUser, fk_rol_usuario: itemValue })}
    >
      <Picker.Item label="Selecciona un Rol" value="" />
      {rolesUsuario.map((rol, index) => (
        <Picker.Item
          key={index}
          label={rol.rol_usuario}
          value={rol.cod_rol_usuario.toString()}
        />
      ))}
    </Picker>
  </View>
)}


      <TouchableOpacity onPress={updateUser} style={styles.button}>
        <Text style={styles.buttonText}>ACTUALIZAR USUARIO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default EditUserView;