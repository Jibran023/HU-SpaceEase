import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const ViewStatus = ({ navigation }) => {
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Classroom 101', date: '2024-11-01', status: 'Approved' },
    { id: 2, name: 'Main Hall', date: '2024-11-05', status: 'Pending' },
    { id: 3, name: 'Physics Lab', date: '2024-11-10', status: 'Rejected' },
    { id: 4, name: 'Classroom 202', date: '2024-11-12', status: 'Approved' },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleClearStatuses = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to clear all statuses?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => setBookings([]) },
      ],
      { cancelable: true }
    );
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.dateText}>Booked on: {item.date}</Text>
      <Text style={styles.statusText}>
        Status: <Text style={styles[item.status.toLowerCase()]}>{item.status}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearStatuses} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Bookings Section */}
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.roomsSection}
        />
      ) : (
        <Text style={styles.noBookingsText}>No bookings to display</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77074e',
    paddingTop: 10,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#e3d6f0',
  },
  navButton: {
    backgroundColor: 'white',
    borderColor: '#4e00c2',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  navButtonText: {
    color: '#4e00c2',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  roomsSection: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  bookingItem: {
    width: 300,
    maxWidth: 310,
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    height: 120,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e00c2',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  approved: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  rejected: {
    color: 'red',
  },
  noBookingsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ViewStatus;
