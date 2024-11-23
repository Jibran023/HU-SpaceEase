import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const ManageStatus = ({ navigation }) => {
  const [requests, setRequests] = useState([
    { id: 1, roomName: 'Classroom 101', userName: 'Alizain Merchant', date: '2024-11-01', status: 'Pending' },
    { id: 2, roomName: 'Main Hall', userName: 'Jibran Sheikh', date: '2024-11-01', status: 'Pending' },
    { id: 3, roomName: 'Physics Lab', userName: 'Wajeeh Haider', date: '2024-11-01', status: 'Pending' },
    { id: 4, roomName: 'Classroom 202', userName: 'Muaaz Shaheen', date: '2024-11-01', status: 'Pending' },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const updateStatus = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.roomName}>{item.roomName}</Text>
      <Text style={styles.userName}>User: {item.userName}</Text>
      <Text style={styles.dateText}>Booked on: {item.date}</Text>
      <Text style={styles.statusText}>
        Status: <Text style={styles[item.status.toLowerCase()]}>{item.status}</Text>
      </Text>
      {item.status === 'Pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => updateStatus(item.id, 'Approved')}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => updateStatus(item.id, 'Rejected')}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Requests Section */}
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.requestsSection}
        />
      ) : (
        <Text style={styles.noRequestsText}>No requests to manage</Text>
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
    justifyContent: 'flex-start',
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
  requestsSection: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  requestItem: {
    width: 300,
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e00c2',
    marginBottom: 5,
  },
  userName: {
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
  noRequestsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  declineButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ManageStatus;
