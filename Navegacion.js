import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//vistas
import HomeScreen from "./vistas/HomeScreen";
import SettingsScreen from "./vistas/SettingsScreen";
import StackScreen from "./vistas/StackScreen";
import EventCreate from "./vistas/EventCreate";

const Tab = createBottomTabNavigator();


function MyTabs(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
            <Tab.Screen name="EvntCreate" component={EventCreate}/>
        </Tab.Navigator>
    );
}

export default function Navegation() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}
