import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function Navbar({isAdmin}) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigation = useNavigation();

    const toggleDropdown = () => {
        // setDropdownOpen(!dropdownOpen);
    };

    const handleDashboard = () => {
        // navigation.navigate(isAdmin ? 'Superuser' : 'Dashboard'); // Adjust route names as per your app
    };

    const handleBookRoom = () => {
        // navigation.navigate('Books');
    };

    const handleStatus = () => {
        // navigation.navigate('ViewStatus');
    };

    const handleMap = () => {
        // navigation.navigate('HUmap');
    };

    const handleRoomRequests = () => {
        // navigation.navigate('RoomRequests');
    };

    const handleLogin = () => {
        // navigation.navigate('Login');
    };

    const handleRefresh = () => {
        setDropdownOpen(false); // Close dropdown when refreshing
    };

    return (
        <View style={styles.navbar}>
            <Text style={styles.navbarTitle}>HU-SpaceEase</Text>
            <View style={styles.navbarIcons}>
                <TouchableOpacity onPress={handleBookRoom}>
                    <Text style={styles.navbarLink}>Book a Room</Text>
                </TouchableOpacity>

                {/* Show "Manage Room Requests" link only for admin */}
                {isAdmin && (
                    <TouchableOpacity onPress={handleRoomRequests}>
                        <Text style={styles.navbarLink}>Manage Room Requests</Text>
                    </TouchableOpacity>
                )}

                {/* Show "View Status" link only for normal users */}
                {!isAdmin && (
                    <TouchableOpacity onPress={handleStatus}>
                        <Text style={styles.navbarLink}>View Status</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleMap}>
                    <Text style={styles.navbarLink}>HU-Map</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDashboard}>
                    <Icon name="home" size={24} color="white" style={styles.navbarIcon} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={toggleDropdown}>
                    <Icon name="bars" size={24} color="white" style={styles.navbarIcon} />
                </TouchableOpacity>
            </View>

            {/* Dropdown menu */}
            <Modal
                visible={dropdownOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setDropdownOpen(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setDropdownOpen(false)}>
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={handleLogin} style={styles.dropdownButton}>
                            <Text style={styles.dropdownText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRefresh} style={styles.dropdownButton}>
                            <Text style={styles.dropdownText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#77074e',
        padding: 15,
        width: '100%',
        borderRadius: 10,
    },
    navbarTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    navbarIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navbarLink: {
        marginRight: 15,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navbarIcon: {
        marginLeft: 15,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    dropdownMenu: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        width: 120,
    },
    dropdownButton: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    dropdownText: {
        color: '#77074e',
        fontWeight: 'bold',
    },
});

export default Navbar;