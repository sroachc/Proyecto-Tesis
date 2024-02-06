import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const HomeAdmin = ({ navigation }) => {
  const navigateToUserCrudView = () => {
    navigation.navigate('AdminScreen'); 
  };
  
  const [statsData, setStatsData] = useState(null);
  const navigateToEventCrudView = () => {
    navigation.navigate('EventCrudView'); // Asegúrate de tener la pantalla EventCrudScreen configurada en tu stack de navegación
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ADMINISTRADOR</Text>    

      <TouchableOpacity style={styles.boton} onPress={navigateToUserCrudView}>
        <Text style={styles.textoBoton}>Gestión de Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={navigateToEventCrudView}>
        <Text style={styles.textoBoton}>Gestión de Eventos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tituloGrafico: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
  },
  boton: {
    backgroundColor: '#FA8E7D', // Color de fondo del botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default HomeAdmin;