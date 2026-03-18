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

import React, { useState, createContext, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const StatisticsContext = createContext<any>(null);

const StatisticsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState(Array(9).fill(0));
  const updateStats = (num: number) => {
    const newStats = [...stats];
    newStats[num - 1] += 1;
    setStats(newStats);
  };
  const clearStats = () => setStats(Array(9).fill(0));

  return (
    <StatisticsContext.Provider value={{ stats, updateStats, clearStats }}>
      {children}
    </StatisticsContext.Provider>
  );
};

function HomeScreen({ navigation }: any) {
  const [currentNumber, setCurrentNumber] = useState('...');
  const { updateStats } = useContext(StatisticsContext);

  useFocusEffect(useCallback(() => { return () => setCurrentNumber('...'); }, []));

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 9) + 1;
    setCurrentNumber(randomNum.toString());
    updateStats(randomNum);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}><Text style={styles.headerTitle}>Number Generator</Text></View>
      <View style={styles.content}>
        <View style={styles.numberCircle}><Text style={styles.displayNumber}>{currentNumber}</Text></View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={generateRandomNumber}><Text style={styles.buttonText}>GENERATE</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statistics')}><Text style={styles.buttonText}>VIEW STATS</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function StatisticsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>Statistics</Text></View>
      <View style={styles.content}><Text style={{color: '#fff'}}>List implementation coming in next update...</Text></View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.buttonText}>BACK</Text></TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#b08968' },
  header: { height: 60, backgroundColor: '#7f5539', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  numberCircle: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center' },
  displayNumber: { fontSize: 80, fontWeight: 'bold', color: '#fff' },
  footer: { padding: 20, gap: 15 },
  button: { backgroundColor: '#7f5539', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});