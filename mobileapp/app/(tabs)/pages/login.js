import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

console.log(Camera);
function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false); 
  const cameraRef = useRef(null);

  
  useEffect(() => { // requesting camera permissions on mount
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermissions();
  }, []);

  const sampleCredentials = {
    email: 'js08312@st.habib.edu.pk',
    password: 'mazerunner',
  };

  const handleLogin = () => {
    if (email === sampleCredentials.email && password === sampleCredentials.password) {
      navigation.navigate('Dashboard'); 
    } else {
      alert('Invalid email or password. Please try again.');
    }
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
          routes: [{ name: 'Dashboard' }],
        });
      } else {
        Alert.alert('Authentication Failed', 'Fingerprint authentication was not successful.');
      }
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      Alert.alert('Error', 'An unexpected error occurred during authentication.');
    }
  };

  const handleFaceRecognition = () => {
    if (hasPermission) {
      setIsCameraVisible(true); 
    } else {
      Alert.alert('Permission Denied', 'Camera access is required.');
    }
  };

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={Camera?.Constants?.Type?.front || 'front'} 
        ref={cameraRef}
      />
      <TouchableOpacity
        style={styles.closeCameraButton}
        onPress={() => setIsCameraVisible(false)}
      >
        <Text style={styles.closeCameraText}>Close Camera</Text>
      </TouchableOpacity>
    </View>
  );

  if (isCameraVisible && hasPermission) {
    return renderCamera();
  }

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
            <View style={styles.biometricContainer}>
              <TouchableOpacity onPress={handleFingerprintLogin}>
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
            <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')} style={styles.adminLink}>
              <Text style={styles.adminLinkText}>Login as admin</Text>
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
  adminLink: {
    marginTop: 15,
  },
  adminLinkText: {
    color: '#77074e',
    textDecorationLine: 'underline',
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
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  closeCameraButton: {
    marginTop: 20,
    backgroundColor: '#77074e',
    padding: 10,
    borderRadius: 5,
  },
  closeCameraText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;
