import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

//vistas
import HomeScreen from "./vistas/HomeScreen";
import SettingsScreen from "./vistas/MisEventosView";
import StackScreen from "./vistas/StackScreen";
import EventCreate from "./vistas/EventCreate";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MisEventosView from "./vistas/MisEventosView";

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen"
        >
            <HomeStackNavigator.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            <HomeStackNavigator.Screen
                name="Stack"
                component={StackScreen}
            />
        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'purple',
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={MyStack}
                options={{
                    tabBarIcon:({color, size}) => (
                        <MaterialCommunityIcons name="home" size={24} color={color} />  
                    ),
                    tabBarBadge:3,
                    headerShown: false,
                }}

            />
            <Tab.Screen name="Encuentros" component={MisEventosView}/>
            <Tab.Screen name="EvntCreate" component={EventCreate}/>
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
