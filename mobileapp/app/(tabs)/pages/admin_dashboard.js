import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function AdminDashboard({ navigation }) {
    const images = [
        require('../../../assets/images/audi.jpg'),
        require('../../../assets/images/audi2.jpg'),
        require('../../../assets/images/audi3.jpg'),
    ];

    const scrollAnim = useRef(new Animated.Value(-200)).current;
    const screenWidth = Dimensions.get('window').width; // to get screen width

    const slideAnim = useRef(new Animated.Value(-300)).current; // animation for the sliding stripe | we start the animation off-screen to the left

    useEffect(() => {
        const startAnimation = () => {
          Animated.loop(
            Animated.timing(scrollAnim, {
              toValue: screenWidth, // to move right beyond the screen width
              duration: 5000, // total duration for the animation
              useNativeDriver: true,
              easing: Easing.linear, // added for smoother movement
            })
          ).start();
        };
        startAnimation();
      }, [screenWidth, scrollAnim]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const navigateTobookaroom = () => {
        navigation.navigate('BookRoom');
    }

    const navigateToConstruction = () => {
        navigation.navigate('UnderConstruction');
    };

    const navigateToManageRoom = () => {
        navigation.navigate('ManageRoom');
    };

    const navigateToManageStatus = () => {
        navigation.navigate('ManageStatus');
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBanner}>
                <Text style={styles.titleText}>HU-SpaceEase</Text>
                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                    <MaterialIcons name="more-vert" size={24} color="white" />
                </TouchableOpacity>
                {isDropdownVisible && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.dropdownMenuItem}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionButton} onPress={navigateTobookaroom}>
                    <Text style={styles.optionText}>Book a Room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={navigateToManageStatus}>
                    <Text style={styles.optionText}>Manage Status</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={navigateToConstruction}>
                    <Text style={styles.optionText}>HU Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={navigateToManageRoom}>
                    <Text style={styles.optionText}>Manage Rooms</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.slideshowContainer}>
                <Image source={images[currentImageIndex]} style={styles.slideshowImage} />
            </View>
            <View style={styles.footerBar}>
                <Image source={require('../../../assets/images/hu_loho.jpg')} style={styles.footerImage} />
                <View style={styles.footerContent}>
                    <Text style={styles.footerText}>Latest App!</Text>
                    <Text style={styles.footerDescription}>
                        Built using the latest web technologies to ensure seamless experience on every device.
                    </Text>
                </View>
            </View>
            <View style={styles.fixedStripe}>
                <Animated.View
                style={[
                    styles.slidingContent,
                    { transform: [{ translateX: scrollAnim }] },
                ]}
                >
                <Image
                    source={require('../../../assets/images/hu_loho.png')}
                    style={styles.slidingLogo}
                />
                <Text style={styles.slidingText}>Habib University</Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  titleBanner: {
      width: '100%',
      height: '9%',
      backgroundColor: '#77074e',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'relative',
  },
  titleText: {
      color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
  },
  dropdownButton: {
      position: 'absolute',
      right: 20,
      padding: 10,
  },
  dropdownMenu: {
      position: 'absolute',
      right: 10,
      top: 45,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 5,
      elevation: 5, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 1,
  },
  dropdownMenuItem: {
      padding: 10,
      color: '#77074e',
      fontWeight: 'bold',
  },
  optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
  },
  optionButton: {
    width: '48%', // Ensures buttons are aligned properly in two columns, with slight margin in between
    marginVertical: 10,
    paddingVertical: 20,
    height: 80, // Fixed height for consistency
    backgroundColor: '#000', // Black background
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#77074e', // Purple border color
    borderWidth: 4, // Thicker border for more prominence
},
  optionText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  slideshowContainer: {
      width: '100%',
      height: '28%',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
  },
  slideshowImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  footerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8f1f6',
      padding: 35,
  },
  footerImage: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginRight: 20,
  },
  footerContent: {
      flex: 1,
  },
  footerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#77074e',
  },
  footerDescription: {
      fontSize: 14,
      color: '#555',
      lineHeight: 20,
  },
  fixedStripe: {
    height: 40,
    backgroundColor: '#77074e', // Pink stripe background
    position: 'absolute',
    bottom: 0,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  slidingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  slidingLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  slidingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminDashboard;

