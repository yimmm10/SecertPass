import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // import db และ auth สำหรับ Firebase

export default function MainProjectScreen({ navigation }) {
  const [application, setApplication] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [strength, setStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[\W_]/.test(password)) score += 1;
    return score;
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    const strengthScore = checkPasswordStrength(password);
    setStrength(strengthScore);
    setPasswordStrength(strengthScore > 4 ? 'Strong' : strengthScore > 2 ? 'Medium' : 'Weak');
  };

  const saveData = async () => {
    if (!application || !username || !password) {
      alert('Please enter application, username, and password');
      return;
    }

    try {
      const user = auth.currentUser; // Get current user
      if (!user) {
        alert('User not logged in');
        return;
      }

      await addDoc(collection(db, 'userPasswords'), {
        application: application,
        username: username,
        password: password,
        note: note || '',
        createdAt: serverTimestamp(), // Store timestamp
        userId: user.uid, // Store the current user's ID
      });

      alert('Data saved successfully');
      navigation.navigate('Home2');

      // Clear input fields
      setApplication('');
      setUsername('');
      setPassword('');
      setNote('');
    } catch (error) {
      console.error('Error saving data: ', error);
      alert('Error saving data');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Application"
        value={application}
        onChangeText={setApplication}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true} // Hide password by default
      />
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${strength * 20}%`, backgroundColor: strength > 4 ? 'green' : strength > 2 ? 'orange' : 'red' }
          ]}
        />
      </View>
      <Text style={styles.strengthText}>Password Strength: {passwordStrength}</Text>

      <TextInput
        style={styles.input}
        placeholder="Note"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  strengthText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
