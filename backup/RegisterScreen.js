import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, firestore } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { doc, setDoc } from 'firebase/firestore'; 

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    // Check if the passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    // Check if all fields are filled
    if (!username || !password || !email || !phone) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        username: username,
        email: email,
        phone: phone,
      });

      // Navigate to OTP screen with phone number
      navigation.navigate('OTP', { phoneNumber: phone });
      
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      // Handle errors
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.buttonlogin} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        width: '80%',
    },
    buttonlogin: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});