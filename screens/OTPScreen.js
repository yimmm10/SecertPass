
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function OTPScreen({ navigation }) {
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

useEffect(() => {
  // Generate a 6-digit OTP when the screen loads
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); 
  setGeneratedOtp(newOtp);
  console.log(`Generated OTP: ${newOtp}`); // This will display the OTP in the console
}, []);



  const verifyOtp = () => {
    if (otp === generatedOtp) {
      Alert.alert('OTP Verified', 'You have successfully verified the OTP!', [
        { text: 'OK', onPress: () => navigation.navigate('Home2') },
      ]);
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.text}>Please enter the OTP sent to your phone</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}  // Restrict to 6 digits
      />
      
      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
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
