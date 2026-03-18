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
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';

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

  useFocusEffect(
    useCallback(() => {
      return () => setCurrentNumber('...');
    }, [])
  );

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 9) + 1;
    setCurrentNumber(randomNum.toString());
    updateStats(randomNum);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Random Number Generator</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.displayNumber}>{currentNumber}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={generateRandomNumber} activeOpacity={0.6}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Statistics')}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>View Statistics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function StatisticsScreen({ navigation }: any) {
  const { stats, clearStats } = useContext(StatisticsContext);

  const renderStatRow = ({ item, index }: any) => (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>Number {index + 1}:</Text>
      <Text style={styles.statValue}>{item} times</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>
      <FlatList
        data={stats}
        renderItem={renderStatRow}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listPadding}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={clearStats} activeOpacity={0.6}>
          <Text style={styles.buttonText}>Clear Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function App() {
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

registerRootComponent(App);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#b08968' },
  header: {
    height: 60,
    backgroundColor: '#7f5539',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  backBtn: { position: 'absolute', left: 20 },
  backBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  displayNumber: { fontSize: 80, fontWeight: 'bold', color: '#fff' },
  footer: { padding: 20, gap: 15, flexDirection: 'row', justifyContent: 'space-evenly' },
  button: { 
    backgroundColor: '#7f5539', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 5, 
    minWidth: 150, 
    alignItems: 'center' 
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  listPadding: { padding: 20 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 },
  statLabel: { color: '#fff', fontSize: 18 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});