import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import UserCrudView from './vistas admin/UserCrudView'; // Reemplaza 'path-to' con la ruta correcta
import HomeAdmin from './vistas admin/HomeAdmin'; // Reemplaza 'path-to' con la ruta correcta
import { MaterialCommunityIcons, FontAwesome5, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ label, focused }) => (
  <Text style={{ color: focused ? 'white' : 'white', fontWeight: 'bold', fontSize: 12 }}>
    {label}
  </Text>
);

function AdminTabs({ setUserLoggedIn }) {
  return (
    <Tab.Navigator
      initialRouteName="HomeAdmin"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#FA8E7D',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeAdmin"
        component={HomeAdmin}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => <CustomTabBarLabel label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="AdminCrud"
        component={UserCrudView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-cog" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => <CustomTabBarLabel label="Admin CRUD" focused={focused} />,
        }}
      />
      {/* Puedes agregar más pestañas según sea necesario */}
    </Tab.Navigator>
  );
}

export default AdminTabs;