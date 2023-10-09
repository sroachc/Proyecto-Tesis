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
        <tab.Navegator>
            <tab.Screen name="Home" component={HomeScreen}/>
            <tab.Screen name="Settings" component={SettingsScreen}/>
            <tab.Screen name="EvntCreate" component={EventCreate}/>
        </tab.Navegator>
    );
}

export default function Navegation() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}
