/*
PROJECT: PROG20261 Assignment N2
AUTHOR: Hisham (H²) El-Shiraida 
COMMANDS USED:
1. npx create-expo-app AssignmentN2
2. npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
3. npx expo install @expo/vector-icons
RESOURCES:
- React Navigation: https://reactnavigation.org/docs/getting-started
- React Context API: https://react.dev/learn/passing-data-deeply-with-context
*/

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import React, { createContext, useCallback, useContext, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// GLOBAL STATE (CONTEXT API)
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

// HOME SCREEN
function HomeScreen({ navigation }: any) {
  const [currentNumber, setCurrentNumber] = useState<string | number>("...");
  const [isShuffling, setIsShuffling] = useState(false);
  const { updateStats } = useContext(StatisticsContext);

  // Requirement: Reset number to "..." when coming back to screen
  useFocusEffect(
    useCallback(() => {
      return () => setCurrentNumber("...");
    }, []),
  );

  const generateRandomNumber = () => {
    if (isShuffling) return;
    setIsShuffling(true);

    let ticks = 0;
    // NUMBER SHUFFLER
    const interval = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * 9) + 1);
      ticks++;

      if (ticks >= 10) {
        clearInterval(interval);
        const finalNum = Math.floor(Math.random() * 9) + 1;
        setCurrentNumber(finalNum);
        updateStats(finalNum);
        setIsShuffling(false);
      }
    }, 50);
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
        <TouchableOpacity
          style={[styles.button, isShuffling && { opacity: 0.7 }]}
          onPress={generateRandomNumber}
          disabled={isShuffling}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Statistics")}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>View Statistics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// STATISTICS SCREEN
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
        <View style={styles.headerLeftGroup}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Statistics</Text>
        </View>
      </View>

      <FlatList
        data={stats}
        renderItem={renderStatRow}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listPadding}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={clearStats}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Clear Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// NAVIGATION WRAPPER
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

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b08968",
  },
  header: {
    height: 60,
    backgroundColor: "#7f5539",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  headerLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backBtn: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  displayNumber: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    padding: 20,
    gap: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#7f5539",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    minWidth: 140,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  listPadding: {
    paddingVertical: 40,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
  },
  statLabel: {
    color: "#fff",
    fontSize: 18,
    marginRight: 8,
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
