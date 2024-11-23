import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

function Dashboard() {
    const images = [
        require('../../../assets/images/audi.jpg'),
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <View style={styles.container}>
        {/* <Navbar isAdmin={false} /> */}
        <View style={styles.titleBanner}>
            <Text style={styles.titleText}>HU-SpaceEase</Text>
        </View>
        <View style={styles.slideshowContainer}>
            <Image source={images[currentImageIndex]} style={styles.slideshowImage} />
        </View>
        {/* <RoomCards /> */}
        {/* <ServicesSection /> */}
        <View style={styles.footerBar}>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:servicedesk@habib.edu.pk')}>
            <Text style={styles.footerLink}>servicedesk@habib.edu.pk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://habibuniversity.sharepoint.com/sites/Student/application-handbook')}>
            <Text style={styles.footerLink}>Application Handbook</Text>
            </TouchableOpacity>
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
      height: '35%',
      backgroundColor: 'linear-gradient(135deg, #4e00c2, #77074e, #9a0aff)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
    },
    slideshowContainer: {
      width: '100%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    slideshowImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    footerBar: {
      backgroundColor: '#5e007a',
      width: '100%',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    footerLink: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 20,
      textDecorationLine: 'underline',
    },
  });

export default Dashboard;