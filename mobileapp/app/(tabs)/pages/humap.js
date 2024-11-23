import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const HUMap = () => {
return (
    <View style={styles.container}>
    <MapView
        style={styles.map}
        initialRegion={{
        latitude: 24.90610,
        longitude: 67.13825, 
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        }}
    >
        <Marker
        coordinate={{ latitude: 24.8949, longitude: 67.1394 }}
        title="Habib University"
        description="Habib University, Karachi"
        />
    </MapView>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#77074e',
},
map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},
});

export default HUMap;