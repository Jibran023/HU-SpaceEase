import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './pages/login'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './pages/dashboard';
import BookRoom from './pages/book_a_room';
import BookingForm from './pages/book_a_room_form';
import AdminLogin from './pages/adminlogin';
import AdminDashboard from './pages/admin_dashboard';
import UnderConstruction from './pages/underConstruction';
import ManageRoom from './pages/manage_rooms';
import HUMap from './pages/humap';
import ViewStatus from './pages/view_status';
import ManageStatus from './pages/manage_status';
import About from './pages/about';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
        <Stack.Screen name="BookRoom" component={BookRoom} options={{headerShown: false}} />
        <Stack.Screen name="BookingForm" component={BookingForm} options={{headerShown: false}} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="UnderConstruction" component={UnderConstruction} options={{ headerShown: false }} />
        <Stack.Screen name="ManageRoom" component={ManageRoom} options={{ headerShown: false }} />
        <Stack.Screen name="HUMap" component={HUMap} options={{ headerShown: false }} />
        <Stack.Screen name="ViewStatus" component={ViewStatus} options={{ headerShown: false }} />
        <Stack.Screen name="ManageStatus" component={ManageStatus} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});