import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const UserCrudView = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    rut: '',
    nom_usuario: '',
    apellidos: '',
    edad: '',
    genero: '',
    celular: '',
    correo: '',
    contrasena: '',
    direccion: '',
    tipoUsuario: '',
    comuna: '',
    fk_rol_usuario: '',
  });

  const [comunas, setComunas] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState('');
  const [comunasLoaded, setComunasLoaded] = useState(false);
  const [selectedTipoUsuario, setSelectedTipoUsuario] = useState('');
  const [selectedRolUsuario, setSelectedRolUsuario] = useState('');
  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [rolesUsuario, setRolesUsuario] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
    fetchComunas();
    fetchTiposUsuarios();
    fetchRolesUsuarios();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://190.44.53.185:3300/api/usuarios');
      setUsers(response.data.usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

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

  const createUser = async () => {
    try {
      if (!selectedComuna || !selectedTipoUsuario || !selectedRolUsuario) {
        Alert.alert('Error', 'Completa todos los campos obligatorios');
        return;
      }

      await axios.post('http://190.44.53.185:3300/api/usuarios', {
        ...newUser,
        comuna: parseInt(selectedComuna),
        fk_tipo_usuario: parseInt(selectedTipoUsuario),
        fk_rol_usuario: parseInt(selectedRolUsuario),
      });

      Alert.alert('Éxito', 'Usuario creado con éxito');
      fetchUsers();

      setNewUser({
        rut: '',
        nom_usuario: '',
        apellidos: '',
        edad: '',
        genero: '',
        celular: '',
        correo: '',
        contrasena: '',
        direccion: '',
        tipoUsuario: '',
        comuna: '',
        fk_rol_usuario: '',
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      Alert.alert('Error', 'Hubo un error al crear el usuario');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://190.44.53.185:3300/api/usuarios/${userId}`);
      Alert.alert('Éxito', 'Usuario eliminado con éxito');
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      Alert.alert('Error', 'Hubo un error al eliminar el usuario');
    }
  };

  const editUser = (userId) => {
    const userToEdit = users.find((user) => user.cod_usuario === userId);

    if (userToEdit) {
      // Navegar a la vista de edición y pasar la información del usuario
      navigation.navigate('EditUser', { user: userToEdit });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>GESTIÓN DE USUARIO</Text>
      <Text style={styles.label}>CREACIÓN DE NUEVO USUARIO</Text>
      <TextInput
        placeholder="Rut"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, rut: text })}
      />


      <TextInput
        placeholder="Nombres"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, nom_usuario: text })}
      />

      <TextInput
        placeholder="Apellidos"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, apellidos: text })}
      />

      <TextInput
        placeholder="Edad"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, edad: text })}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Género"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, genero: text })}
      />

      <TextInput
        placeholder="Celular"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, celular: text })}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, correo: text })}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        onChangeText={(text) => setNewUser({ ...newUser, contrasena: text })}
        secureTextEntry
      />

      {comunasLoaded && (
        <View style={styles.input}>
          <Picker
            style={styles.picker}
            selectedValue={selectedComuna}
            onValueChange={(itemValue) => setSelectedComuna(itemValue)}
          >
            <Picker.Item label="Selecciona una Comuna" value="" />
            {comunas.map((comuna, index) => (
              <Picker.Item key={index} label={comuna.comuna} value={comuna.cod_comuna} />
            ))}
          </Picker>
        </View>
      )}

      {comunasLoaded && (
        <View style={styles.input}>
          <Picker
            style={styles.picker}
            selectedValue={selectedTipoUsuario}
            onValueChange={(itemValue) => setSelectedTipoUsuario(itemValue)}
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
            selectedValue={selectedRolUsuario}
            onValueChange={(itemValue) => setSelectedRolUsuario(itemValue)}
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

      <TouchableOpacity onPress={createUser} style={styles.button}>
        <Text style={styles.buttonText}>CREAR USUARIO</Text>
      </TouchableOpacity>

      {/* LISTA DE USUARIOS EDITAR ELIMINAR  */}
      <Text style={styles.label}>LISTA DE USUARIOS</Text>
      <View style={styles.userList}>
        <View style={styles.userItem}>
          <Text style={{ fontWeight: 'bold' }}>ID</Text>
          <Text style={{ fontWeight: 'bold' }}>Nombre</Text>
          <Text style={{ fontWeight: 'bold' }}>Acciones</Text>
        </View>

        {users.map((user) => (
          <View key={user.cod_usuario} style={styles.userItem}>
            <Text>{`${user.cod_usuario} ${user.nom_usuario.split(' ')[0]} `}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.editButton} onPress={() => editUser(user.cod_usuario)}>
                <Icon name="edit" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteUser(user.cod_usuario)} style={styles.deleteButton}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  userList: {
    width: '80%',
    marginBottom: 10,
    margintop: 20,
    padding: 20,
    paddingHorizontal: 8,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    width: '70%',
    height: 50,
    marginTop: 0,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  button: {
    borderRadius: 15,
    marginTop: 5,
    width: '70%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 25,
    color: 'black',
    marginBottom: 40,
  },
  buttonText: {
    color: 'black',  
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  picker: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 10,
    height: 0,
  },
});

export default UserCrudView;