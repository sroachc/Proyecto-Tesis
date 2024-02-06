import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './vistas/LoginScreen';
import RegisterScreen from './vistas/RegisterScreen';
import MyTabs from './MyTabs';
import EditarPerfil from './vistas/EditarPerfil';
import DetallesEvento from './vistas/DetallesEvento';
import DetalleEventoOrganizador from './vistas/DetalleEventoOrganizador';
import MisEventos from './vistas/MisEventosView';
import AdminScreen from './vistas admin/UserCrudView';
import SoporteScreen from './vistas/SoporteScreen';
import TerminosScreen from './vistas/TerminosScreen';
import BilleteraScreen from './vistas/BilleteraScreen';
import EditUser from './vistas admin/EditUser';
import HomeAdmin from './vistas admin/HomeAdmin';
import EventCrudView from './vistas admin/EventCrudView';
import NotificacionScreen from './vistas/NotificacionScreen';
import DetalleSolicitudScreen from './vistas/DetalleSolicitudScreen';
import UniteScreen from './vistas/UniteScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!userLoggedIn ? (
          <Stack.Screen name="Login">
            {props => (
              <LoginScreen
                {...props}
                setUserLoggedIn={setUserLoggedIn}
                setIsAdmin={setIsAdmin}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {props =>
              isAdmin ? (
                <AdminStack {...props} setUserLoggedIn={setUserLoggedIn} />
              ) : (
                <MyTabs {...props} setUserLoggedIn={setUserLoggedIn} />
              )
            }
          </Stack.Screen>
        )}

        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="DetallesEvento" component={DetallesEvento} />
        <Stack.Screen name="DetalleEventoOrganizador" component={DetalleEventoOrganizador} />
        <Stack.Screen name="MisEventos" component={MisEventos} />
        <Stack.Screen name="SoporteScreen" component={SoporteScreen} />
        <Stack.Screen name="TerminosScreen" component={TerminosScreen} />
        <Stack.Screen name="BilleteraScreen" component={BilleteraScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="EventCrudView" component={EventCrudView} />
        <Stack.Screen name="NotificacionScreen" component={NotificacionScreen} />
        <Stack.Screen name='DetalleSolicitudScreen' component={DetalleSolicitudScreen}/>
        <Stack.Screen name='UniteScreen' component={UniteScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );

} function AdminStack({ setUserLoggedIn }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeAdmin">
        {props => <HomeAdmin {...props} setUserLoggedIn={setUserLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="EditUser">
        {props => <EditUser {...props} setUserLoggedIn={setUserLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}