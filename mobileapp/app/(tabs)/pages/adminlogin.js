import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

function AdminLogin() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);
    const cameraRef = useRef(null);

    const sampleCredentials = {
        email: 'js08312@st.habib.edu.pk',
        password: 'mazerunner',
    };

    const handleAdminLogin = () => {
      if (email === sampleCredentials.email && password === sampleCredentials.password) {
          navigation.navigate('AdminDashboard'); 
        } else {
          alert('Invalid email or password. Please try again.');
        }
    };

    const handleBackToLogin = () => {
      navigation.navigate('Login');
    };

    const handleFingerprintLogin = async () => {
        try {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          if (!compatible) {
            Alert.alert('Device not compatible', 'Your device does not support biometric authentication.');
            return;
          }
      
          const biometricRecords = await LocalAuthentication.isEnrolledAsync();
          if (!biometricRecords) {
            Alert.alert('No Biometrics', 'No biometric records found. Please set up biometrics in your device settings.');
            return;
          }
      
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Fingerprint',
            fallbackLabel: 'Enter Password',
          });
      
          if (result.success) {
            console.log('Authentication successful');
            navigation.reset({
              index: 0,
              routes: [{ name: 'AdminDashboard' }], 
            });
          } else {
            Alert.alert('Authentication Failed', 'Fingerprint authentication was not successful.');
          }
        } catch (error) {
          console.error('Fingerprint authentication error:', error);
          Alert.alert('Error', 'An unexpected error occurred during authentication.');
        }
    };

    // for face recognition
    const handleFaceRecognition = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
      } else {
        Alert.alert('Permission Denied', 'Camera access is required for face recognition.');
      }
    };

    const onFacesDetected = ({ faces }) => {
      if (faces.length > 0) {
        Alert.alert('Face Recognized', 'Face recognition successful!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }
    };

    const renderCamera = () => {
      return (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          onCameraReady={() => setCameraReady(true)}
          onFacesDetected={cameraReady ? onFacesDetected : undefined}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
          }}
          ref={cameraRef}
        />
      );
    };

    

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Admin Login</Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your admin email"
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
                <TouchableOpacity style={styles.button} onPress={handleAdminLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.biometricContainer}>
                  <TouchableOpacity >
                    <View style={styles.fingerprintIconContainer}>
                      <MaterialIcons name="fingerprint" size={45} color="#77074e" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleFaceRecognition}>
                    <View style={styles.faceRecognitionContainer}>
                      <MaterialIcons name="face" size={45} color="#77074e" />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back to User Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#77074e', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#ffffff', 
        borderRadius: 10,
        alignItems: 'center',
    },
    heading: {
        fontSize: 28,
        color: '#77074e',
        marginBottom: 30,
        fontWeight: 'bold',
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
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    button: {
        backgroundColor: '#77074e',
        paddingVertical: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#77074e',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    backButtonText: {
        color: '#77074e',
        fontSize: 16,
        fontWeight: 'bold',
    },
    biometricContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-evenly', 
      alignItems: 'center',
      marginTop: 15,
      width: '100%',
    },
    fingerprintIconContainer: {
      borderWidth: 2,
      borderColor: '#77074e',
      borderRadius: 0,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    faceRecognitionContainer: {
      borderWidth: 2,
      borderColor: '#77074e',
      borderRadius: 0,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default AdminLogin;
