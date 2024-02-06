import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SoporteScreen = () => {
  const navigation = useNavigation();
  const [solicitudes, setSolicitudes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
  
          // Obtener información del usuario
          if (token) {
            const userResponse = await axios.get('http://190.44.53.185:3300/ObtenerUsuario', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            const userInfo = userResponse.data;
            console.log('ID del usuario activo:', userInfo.cod_user);
            setUserInfo(userInfo);
  
            // Obtener solicitudes del usuario
            const solicitudesResponse = await axios.get(`http://190.44.53.185:3300/api/ObtenerSolicitudes`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              params: {
                  cod_user: userInfo.cod_user,
              },
              });
  
            const solicitudesData = solicitudesResponse.data.solicitudes;
            
            if (Array.isArray(solicitudesData)) {
              setSolicitudes(solicitudesData);
            } else {
              console.error('Los datos de solicitudes no son un array:', solicitudesData);
            }
          }
        } catch (error) {
          console.error('Error en la llamada a la API:', error);
          setError('Error al obtener la información del usuario o las solicitudes');
        }
      };
  
      fetchData();
    }, [])
  );


  const handleCasillaPress = (solicitud) => {
    // Navegar a la vista deseada, pasando la información necesaria
    navigation.navigate('DetalleSolicitudScreen', { solicitud });
  };
  
  
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonContainer}
      >
        <View style={styles.backButton}>
        <Ionicons name="ios-checkmark-circle" size={32} color="green" />
        </View>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Solicitudes</Text>
    </View>
    <ScrollView style={styles.scrollView}>
        {solicitudes.length > 0 ? (
          solicitudes.map((solicitud, index) => (
            <TouchableOpacity
              key={index}
              style={styles.infoContainer}
              onPress={() => navigation.navigate('DetalleSolicitudScreen', { solicitud: solicitud })}
            >
              <View style={styles.infoItem}>
                <Text style={styles.label}>Evento: </Text>
                <Text style={styles.info}>{solicitud.nombreEvento}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="person" size={24} color="white" style={styles.icon} />
                <Text style={styles.label}>Postulante: </Text>
                <Text style={styles.info}>{solicitud.nombrePostulante}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay solicitudes</Text>
        )}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FA8E7D',
  },
  infoContainer: {
    padding: 30,
    backgroundColor: '#FA8E7D',
    marginTop: 30,
    marginLeft: 30,
    width: '85%',
    borderRadius: 50,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  info: {
    fontSize: 16,
    color: 'white',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: '#FA8E7D',
    borderBottomColor: '#ccc',
  },
  backButtonContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 80,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Ajusta el color de fondo
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Ajusta la alineación del contenido
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10, // Ajusta el espaciado vertical
    borderBottomWidth: 1,
    backgroundColor: '#FA8E7D',
    borderBottomColor: '#ccc',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 16,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#FA8E7D',
    marginTop: 16,
    borderRadius: 10,
  },
});

export default SoporteScreen;