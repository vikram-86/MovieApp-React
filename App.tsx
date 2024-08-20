import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MovieDetailScreen from './src/screens/MovieDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Popular" component={HomeScreen}/>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Detail" component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

 // return <HomeScreen/>;
}

