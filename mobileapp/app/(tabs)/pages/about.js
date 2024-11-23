import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const About = ({ navigation }) => {
const aboutData = [
    {
    id: 1,
    title: 'Alizain Merchant',
    description: 'Age: 22 | Frontend/Backend Developer | HU CS 25',
    image: require('../../../assets/images/alizain.jpg'),
    },
    {
    id: 2,
    title: 'Wajeeh Haider',
    description: 'Age: 21 | Frontend/Backend Developer | HU CS 26',
    image: require('../../../assets/images/wajeeh.jpg'),
    },
    {
    id: 3,
    title: 'Jibran Sheikh',
    description: 'Age: 21 | Frontend/Backend Developer | HU CS 26.',
    image: require('../../../assets/images/jibran.jpg'),
    },
];

const handleBack = () => {
    navigation.goBack();
};

const renderCardItem = ({ item }) => (
    <View style={styles.card}>
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
);

return (
    <View style={styles.container}>
    
    <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
        <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.navButtonPlaceholder} /> 
    </View>

    {/* cards */}
    <FlatList
        data={aboutData}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardsContainer}
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
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
headerTitle: {
    textAlign: 'center',
    color: '#4e00c2',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
},
navButtonPlaceholder: {
    width: 100, 
},
cardsContainer: {
    alignItems: 'center',
},
card: {
    width: '90%',
    maxWidth: 310,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
},
cardImage: {
    width: 130,
    height: 130,
    borderRadius: 5,
    marginBottom: 10,
},
cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e00c2',
    marginBottom: 5,
},
cardDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
},
});

export default About;

