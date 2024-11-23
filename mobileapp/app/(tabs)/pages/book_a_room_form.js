import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';

function BookingForm({ navigation }) {
    const [userData] = useState({
        name: 'John Doe',
        studentID: '123456789',
        batch: '2023',
        room: 'Library',
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedAdminRights, setAcceptedAdminRights] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!startDate || !endDate || !time || !reason || !acceptedTerms || !acceptedAdminRights) {
            setError('Please fill in all fields and accept the terms.');
        } else if (new Date(startDate) > new Date(endDate)) {
            setError('Start date cannot be later than the end date.');
        } else {
            setError('');
            Alert.alert('Booking Submitted', 'Your booking has been submitted successfully.');
            console.log('Booking details:', { ...userData, startDate, endDate, time, reason });
        }
    };

    const roomImages = {
        Library: require('../../../assets/images/audi.jpg'),
        Auditorium: require('../../../assets/images/audi.jpg'),
        'Classroom A': require('../../../assets/images/audi.jpg'),
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Book a Room</Text>
            
            <View style={styles.form}>
                <Text style={styles.label}>Your Name</Text>
                <TextInput
                    style={styles.input}
                    value={userData.name}
                    editable={false}
                />

                <Text style={styles.label}>Batch Number</Text>
                <TextInput
                    style={styles.input}
                    value={userData.batch}
                    editable={false}
                />

                <Text style={styles.label}>Student ID</Text>
                <TextInput
                    style={styles.input}
                    value={userData.studentID}
                    editable={false}
                />

                <Text style={styles.label}>Room Name</Text>
                <TextInput
                    style={styles.input}
                    value={userData.room}
                    editable={false}
                />

                <Text style={styles.label}>Start Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={startDate}
                    onChangeText={setStartDate}
                />

                <Text style={styles.label}>End Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={endDate}
                    onChangeText={setEndDate}
                />

                <Text style={styles.label}>Booking Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="HH:MM"
                    value={time}
                    onChangeText={setTime}
                />

                <Text style={styles.label}>Reason for Booking</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={4}
                    placeholder="Enter the reason for booking"
                    value={reason}
                    onChangeText={setReason}
                />

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={acceptedTerms ? 'checked' : 'unchecked'}
                        onPress={() => setAcceptedTerms(!acceptedTerms)}
                        color="#77074e"
                    />
                    <Text style={styles.checkboxLabel}>
                        I accept the rules and regulations for booking the room.
                    </Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={acceptedAdminRights ? 'checked' : 'unchecked'}
                        onPress={() => setAcceptedAdminRights(!acceptedAdminRights)}
                        color="#77074e"
                    />
                    <Text style={styles.checkboxLabel}>
                        The admin reserves the right to cancel the booking if you don't show up within 5-10 minutes.
                    </Text>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Booking</Text>
                </TouchableOpacity>
            </View>

            {userData.room && (
                <View style={styles.imageContainer}>
                    <Image
                        source={roomImages[userData.room]}
                        style={styles.roomImage}
                        resizeMode="cover"
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#77074e',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxWidth: 500,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#77074e',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderColor: '#e98ece',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        flex: 1,
        color: '#77074e',
        fontSize: 14,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#77074e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    roomImage: {
        width: 300,
        height: 200,
        borderRadius: 10,
        borderBottomWidth: 10, 
        borderBottomColor: '#ffffff', 
    },
    
});

export default BookingForm;

