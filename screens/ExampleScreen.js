import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CryptoJS from 'crypto-js';

export default function ExampleScreen() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [password, setPassword] = useState(''); // User-defined key for AES encryption
  const [encryptLength, setEncryptLength] = useState(''); // Number of characters to encrypt
  const [decryptLength, setDecryptLength] = useState(''); // Number of characters to decrypt

  // AES-256 Encryption function
  const encryptPassword = () => {
    if (!password || password.length < 8) {
      Alert.alert('Error', 'Please enter a valid key (at least 8 characters long).');
      return;
    }

    const textToEncrypt = inputText.substring(0, parseInt(encryptLength)); // Encrypt specified number of characters
    if (textToEncrypt.length > 0) {
      try {
        const key = CryptoJS.enc.Utf8.parse(password); // Convert password to key
        const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV for encryption
        const encrypted = CryptoJS.AES.encrypt(textToEncrypt, key, { iv: iv }).toString();
        const encryptedWithIv = iv.toString(CryptoJS.enc.Hex) + encrypted; // Attach IV to the encrypted text
        setEncryptedText(encryptedWithIv);
        Alert.alert('Success', 'Text successfully encrypted');
      } catch (error) {
        Alert.alert('Error', 'Encryption failed.');
      }
    } else {
      Alert.alert('Error', 'Please enter valid text and number of characters to encrypt.');
    }
  };

  // AES-256 Decryption function
  const decryptPassword = () => {
    if (!password || password.length < 8) {
      Alert.alert('Error', 'Please enter a valid key (at least 8 characters long).');
      return;
    }

    if (encryptedText) {
      try {
        const iv = CryptoJS.enc.Hex.parse(encryptedText.substring(0, 32)); // Extract IV from the encrypted text
        const encryptedData = encryptedText.substring(32); // Extract encrypted data
        const key = CryptoJS.enc.Utf8.parse(password); // Convert password to key
        const bytes = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv });
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        const textToDecrypt = decrypted.substring(0, parseInt(decryptLength)); // Decrypt specified number of characters
        if (textToDecrypt.length > 0) {
          setDecryptedText(textToDecrypt);
          Alert.alert('Success', 'Text successfully decrypted');
        } else {
          Alert.alert('Error', 'Please enter valid decryption length.');
        }
      } catch (error) {
        Alert.alert('Error', 'Decryption failed.');
      }
    } else {
      Alert.alert('Error', 'No text to decrypt. Please encrypt text first.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AES-256 Encryption/Decryption</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter custom key (min 8 characters)"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={inputText}
        onChangeText={setInputText}
      />

      <TextInput
        style={styles.input}
        placeholder="Characters to Encrypt"
        keyboardType="numeric"
        value={encryptLength}
        onChangeText={setEncryptLength}
      />

      <TouchableOpacity style={styles.button} onPress={encryptPassword}>
        <Text style={styles.buttonText}>ENCRYPT</Text>
      </TouchableOpacity>

      {encryptedText ? (
        <Text style={styles.resultText}>Encrypted Text: {encryptedText}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Characters to Decrypt"
        keyboardType="numeric"
        value={decryptLength}
        onChangeText={setDecryptLength}
      />

      <TouchableOpacity style={styles.button} onPress={decryptPassword}>
        <Text style={styles.buttonText}>DECRYPT</Text>
      </TouchableOpacity>

      {decryptedText ? (
        <Text style={styles.resultText}>Decrypted Text: {decryptedText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
