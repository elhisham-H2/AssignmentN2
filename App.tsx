/*
PROJECT: PROG20261 Assignment N2
AUTHOR: Hisham (H²) El-Shiraida 
COMMANDS USED:
1. npx create-expo-app AssignmentN2
2. npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
RESOURCES:
- React Navigation: https://reactnavigation.org/docs/getting-started
- React Context API: https://react.dev/learn/passing-data-deeply-with-context
*/

import React, { useState, createContext } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const StatisticsContext = createContext<any>(null);

const StatisticsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats] = useState(Array(9).fill(0));
  
  return (
    <StatisticsContext.Provider value={{ stats }}>
      {children}
    </StatisticsContext.Provider>
  );
};

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.placeholderText}>Home Screen Logic Coming Soon...</Text>
    </SafeAreaView>
  );
}

function StatisticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.placeholderText}>Stats Screen Logic Coming Soon...</Text>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <StatisticsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StatisticsProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#b08968', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});