import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ManageRoom = ({ navigation }) => {
  const initialRooms = [
    { id: 1, type: 'Classroom', name: 'Classroom 101', description: 'A medium-sized classroom with seating capacity for 40 students.', image: require('../../../assets/images/audi4.jpg') },
    { id: 2, type: 'Hall', name: 'Main Hall', description: 'A spacious hall suitable for events and seminars.', image: require('../../../assets/images/audi4.jpg') },
    { id: 3, type: 'Classroom', name: 'Classroom 202', description: 'A small classroom perfect for group studies.', image: require('../../../assets/images/audi4.jpg') },
    { id: 4, type: 'Lab', name: 'Computer Lab', description: 'Equipped with high-end computers for coding and simulations.', image: require('../../../assets/images/audi4.jpg') },
    { id: 5, type: 'Lab', name: 'Physics Lab', description: 'Fully equipped for experimental physics.', image: require('../../../assets/images/audi4.jpg') },
    { id: 6, type: 'Hall', name: 'Mini Auditorium', description: 'A smaller space ideal for presentations and meetings.', image: require('../../../assets/images/audi4.jpg') },
    { id: 7, type: 'Classroom', name: 'Classroom 303', description: 'A large classroom for lectures and seminars.', image: require('../../../assets/images/audi4.jpg') },
    { id: 8, type: 'Lab', name: 'Chemistry Lab', description: 'Laboratory equipped for chemistry experiments.', image: require('../../../assets/images/audi4.jpg') },
    { id: 9, type: 'Hall', name: 'Conference Room', description: 'Room equipped with projectors and sound systems for meetings.', image: require('../../../assets/images/audi4.jpg') },
  ];

  const [rooms, setRooms] = useState(initialRooms);
  const [filter, setFilter] = useState('All');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleInsertRoom = () => {
    const newRoom = {
      id: rooms.length + 1,
      type: 'Classroom',
      name: `Classroom ${rooms.length + 1}`,
      description: `A newly added classroom for various purposes.`,
      image: require('../../../assets/images/audi4.jpg'),
    };
    setRooms([...rooms, newRoom]);
  };

  const handleDeleteRoom = (roomId) => {
    Alert.alert(
      "Delete Room",
      "Are you sure you want to delete this room?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => setRooms(rooms.filter(room => room.id !== roomId)) }
      ]
    );
  };

  const filteredRooms = filter === 'All' ? rooms : rooms.filter(room => room.type === filter);

  const renderRoomItem = ({ item }) => (
    <View style={styles.roomItem}>
      <View style={styles.details}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>
        <Image source={item.image} style={styles.roomImage} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRoom(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* filter section */}
      <View style={styles.filterSection}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
        <Picker
          selectedValue={filter}
          style={styles.picker}
          onValueChange={(itemValue) => setFilter(itemValue)}
        >
          <Picker.Item label="All Rooms" value="All" />
          <Picker.Item label="Classrooms" value="Classroom" />
          <Picker.Item label="Halls" value="Hall" />
          <Picker.Item label="Labs" value="Lab" />
        </Picker>
      </View>

      {/* rnsert room button */}
      <View style={styles.insertButtonContainer}>
        <TouchableOpacity style={styles.insertButton} onPress={handleInsertRoom}>
          <Text style={styles.insertButtonText}>Insert New Room</Text>
        </TouchableOpacity>
      </View>

      {/* rooms section code */}
      <FlatList
        data={filteredRooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.roomsSection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77074e',
    paddingTop: 0, 
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#e3d6f0',
    marginBottom: 20,
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
  picker: {
    height: 51,
    width: 170,
    color: '#000', // Set picker text color to black for visibility
  },
  roomsSection: {
    alignItems: 'center',
  },
  roomItem: {
    width: '90%', 
    maxWidth: 310, 
    height: 310,
    padding: 15, 
    marginVertical: 8, 
    borderRadius: 10,
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  details: {
    alignItems: 'center',
    marginBottom: 15,
  },
  roomName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4e00c2',
  },
  roomDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  roomImage: {
    width: 130,
    height: 130,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 100,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  insertButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  insertButton: {
    backgroundColor: '#ffa500', // Different color for insert button
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  insertButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageRoom;
