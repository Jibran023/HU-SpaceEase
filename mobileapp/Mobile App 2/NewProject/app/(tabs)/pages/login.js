import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Login() {
  
    const navigation = useNavigation();
    // State for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Dummy login check or add your authentication logic here
      // if (email && password) {
      //     navigation.navigate('Dashboard'); // Navigate to Dashboard on login
      // } else {
      //     console.log('Please enter valid email and password');
      // }
      navigation.navigate('Dashboard');
    };
  
    return (
      <ImageBackground
        source={require('../../../assets/images/audi.jpg')} // Adjust this path to your image location
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.loginWrapper}>
          <View style={styles.semiCircle}>
            <Text style={styles.mainHeading}>HU-SpaceEase</Text>
            <View style={styles.formBackground}>
              <Text style={styles.loginHeading}>Welcome!</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your HU email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    loginWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    semiCircle: {
      width: '90%',
      padding: 20,
      backgroundColor: 'rgba(135, 12, 80, 0.85)',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainHeading: {
      fontSize: 32,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    formBackground: {
      width: '100%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
    },
    loginHeading: {
      fontSize: 24,
      color: '#77074e',
      marginBottom: 15,
    },
    inputGroup: {
      width: '100%',
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      color: '#77074e',
      marginBottom: 5,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
    button: {
      backgroundColor: '#77074e',
      paddingVertical: 12,
      borderRadius: 4,
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default Login;