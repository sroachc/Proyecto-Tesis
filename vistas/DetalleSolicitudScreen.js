
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import CustomModal from '../Components/CustomModal';

const DetalleSolicitudScreen = ({ route, navigation }) => {
  const { solicitud } = route.params;
  const [detallesUsuario, setDetallesUsuario] = useState({});
  const [estado, setEstado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const actualizarEstado = async (nuevoEstado) => {
    try {
     // Realiza la solicitud para actualizar el estado
     const apiUrl = `http://190.44.53.185:3300/api/actualizarestadosolicitud/${solicitud.cod_solicitud}`;
     console.log('URL de la API:', apiUrl);
   
     await axios.put(apiUrl, {
      nuevoEstado,
    });

    abrirModal()

    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('NotificacionScreen');
    }, 2000); 

    
  } catch (error) {
    console.error('Error al actualizar el estado de la solicitud:', error);
    Alert.alert('Error', 'Hubo un error al actualizar el estado de la solicitud');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // ... tu lógica actual
        // Obtener detalles del usuario postulante
        const detallesUsuarioResponse = await axios.get('http://190.44.53.185:3300/DetallesUsuario', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            cod_usuario: solicitud.fk_usuario,
          },
        });
  
        const detallesUsuario = detallesUsuarioResponse.data;
        console.log('Detalles del usuario:', detallesUsuario);
        setDetallesUsuario(detallesUsuario); // Actualiza el estado con los detalles del usuario postulante
      } catch (error) {
        console.error('Error al obtener detalles del usuario postulante:', error);
      }
    };
  
    fetchData();
  }, [solicitud.fk_usuario]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Detalles del Evento:</Text>
      <Text style={styles.info}>Nombre del Evento: {solicitud.nombreEvento}</Text>
      {/* Agrega más detalles del evento según sea necesario */}

      <Text style={styles.label}>Datos del Postulante:</Text>
      <Text style={styles.info}>Nombre del Postulante: {solicitud.nombrePostulante}</Text>
      <Text style={styles.info}>Edad: {detallesUsuario.usuario ? detallesUsuario.usuario.edad : 'No disponible'}</Text>
      <Text style={styles.info}>Correo: {detallesUsuario.usuario ? detallesUsuario.usuario.correo : 'No disponible'}</Text>
      <Text style={styles.info}>Dirección: {detallesUsuario.usuario ? detallesUsuario.usuario.direccion : 'No disponible'}</Text>
      {/* Agrega más detalles del usuario postulante según sea necesario */}

      <TouchableOpacity style={styles.buttonContainer} onPress={async () => { await actualizarEstado('Rechazado'); }}>
        <View style={styles.button}>
          <Ionicons name="close" size={24} color="white" />
          <Text style={styles.buttonText}>Rechazar</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={async () => { await actualizarEstado('Aceptado'); }}>
        <View style={styles.button}>
          <Ionicons name="checkmark" size={24} color="white" />
          <Text style={styles.buttonText}>Aceptar</Text>
        </View>
      </TouchableOpacity>
      {/* Modal para mostrar el mensaje de éxito */}
      {/* Modal para mostrar el mensaje de éxito */}
      <CustomModal visible={modalVisible} onClose={cerrarModal}>
        <Text>Solicitud procesada con éxito</Text>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#FA8E7D',
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'white',
  },
});

export default DetalleSolicitudScreen;