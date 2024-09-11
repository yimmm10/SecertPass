import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import CryptoJS from 'crypto-js';

export default function EncryptDecryptScreen() {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  // AES-256 Encryption function
  const encryptText = () => {
    if (!key || key.length >= 8) {  // Ensure the key is 8 characters (256-bit key)
      Alert.alert('Error', 'Please enter a valid 8-character key.');
      return;
    }

    if (inputText.length > 0) {
      try {
        const keyParsed = CryptoJS.enc.Utf8.parse(key);
        const ivGenerated = CryptoJS.lib.WordArray.random(16); // Generate random 16-byte IV (128-bit)
        const encrypted = CryptoJS.AES.encrypt(inputText, keyParsed, { iv: ivGenerated }).toString();
        
        setIv(ivGenerated.toString(CryptoJS.enc.Hex)); // Save IV for display in hex
        setCipherText(encrypted); // Save encrypted text
        Alert.alert('Success', 'Text successfully encrypted');
      } catch (error) {
        Alert.alert('Error', `Encryption failed. ${error.message}`);
      }
    } else {
      Alert.alert('Error', 'Please enter text to encrypt.');
    }
  };

  // AES-256 Decryption function
  const decryptText = () => {
    if (!key || key.length >= 8) {  // Ensure the key is 8 characters (256-bit key)
      Alert.alert('Error', 'Please enter a valid 8-character key.');
      return;
    }

    if (cipherText.length > 0 && iv.length === 8) { // Ensure IV is 8 hex characters (16 bytes)
      try {
        const ivParsed = CryptoJS.enc.Hex.parse(iv); // Parse IV from hex
        const keyParsed = CryptoJS.enc.Utf8.parse(key);
        const decryptedBytes = CryptoJS.AES.decrypt(cipherText, keyParsed, { iv: ivParsed });
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8); // Convert decrypted bytes to text

        if (decrypted) {
          setDecryptedText(decrypted);
          Alert.alert('Success', 'Text successfully decrypted');
        } else {
          Alert.alert('Error', 'Decryption failed: Decrypted result is empty.');
        }
      } catch (error) {
        Alert.alert('Error', `Decryption failed. ${error.message}`);
      }
    } else {
      Alert.alert('Error', 'Please enter valid cipher text and IV.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>AES-256 Encryption/Decryption</Text>

      {/* Encryption Section */}
      <TextInput
        style={styles.input}
        placeholder="Message"
        multiline={true}
        value={inputText}
        onChangeText={setInputText}
      />

      <TextInput
        style={styles.input}
        placeholder="Key (8 characters)"
        secureTextEntry={true}
        value={key}
        onChangeText={setKey}
      />

      <TextInput
        style={styles.input}
        placeholder="IV (Auto-generated)"
        value={iv}
        editable={false} // IV is auto-generated on encryption
      />

      {/* Encrypt Button */}
      <TouchableOpacity style={styles.button} onPress={encryptText}>
        <Text style={styles.buttonText}>Encrypt</Text>
      </TouchableOpacity>

      {/* Display Encrypted Text */}
      {cipherText ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Cipher: {cipherText}</Text>
        </View>
      ) : null}

      {/* Decryption Section */}
      <TextInput
        style={styles.input}
        placeholder="Cipher Text"
        multiline={true}
        value={cipherText}
        onChangeText={setCipherText}
      />

      <TextInput
        style={styles.input}
        placeholder="IV"
        value={iv}
        onChangeText={setIv}
      />

      <TextInput
        style={styles.input}
        placeholder="Key (8 characters)"
        secureTextEntry={true}
        value={key}
        onChangeText={setKey}
      />

      {/* Decrypt Button */}
      <TouchableOpacity style={styles.button} onPress={decryptText}>
        <Text style={styles.buttonText}>Decrypt</Text>
      </TouchableOpacity>

      {/* Display Decrypted Text */}
      {decryptedText ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Decrypted Text: {decryptedText}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 20,
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
    backgroundColor: '#000',
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
  resultBox: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultText: {
    color: '#333',
    fontSize: 16,
  },
});