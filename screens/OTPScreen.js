import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, MultiFactorResolver, PhoneAuthProvider, signInWithPhoneNumber } from 'firebase/auth'; // Import required methods
import { auth } from '../firebaseConfig'; // Import Firebase config

export default function OTPScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  useEffect(() => {
    const authInstance = getAuth();
    const currentUser = authInstance.currentUser;

    if (currentUser) {
      setEmail(currentUser.email);
      // Check if MFA is enabled
      if (currentUser.multiFactor.enrolledFactors.length > 0) {
        setMfaEnabled(true);
      }
      setLoading(false);
    } else {
      onAuthStateChanged(authInstance, (user) => {
        if (user) {
          setEmail(user.email);
          if (user.multiFactor.enrolledFactors.length > 0) {
            setMfaEnabled(true);
          }
        } else {
          Alert.alert('Error', 'No user is signed in.');
        }
        setLoading(false);
      });
    }
  }, []);

  const sendOtp = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber({
        phoneNumber: phoneNumber,
        // You can also set options like 'timeout' if necessary
      });
      setVerificationId(verificationId);
      Alert.alert('OTP Sent', 'Check your phone for the OTP.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please check your phone number.');
    }
  };

  const verifyOtp = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const user = getAuth().currentUser;

    if (user) {
      try {
        const multiFactorResolver = new MultiFactorResolver(user);
        await multiFactorResolver.resolveSignIn(credential);
        Alert.alert('OTP Verified', 'Your OTP has been successfully verified.', [
          { text: 'OK', onPress: () => navigation.navigate('Home2') },
        ]);
      } catch (error) {
        Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
      }
    } else {
      Alert.alert('Error', 'No user is signed in.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Registered Email</Text>
      <Text style={styles.email}>{email}</Text>

      {mfaEnabled ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={sendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.text}>MFA is not enabled for this account.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#666',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
