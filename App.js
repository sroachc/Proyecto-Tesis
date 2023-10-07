import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './AppNavigation';
import React from 'react';
import { View } from 'react-native';

export default function App() {
  return (  
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
  );
}


