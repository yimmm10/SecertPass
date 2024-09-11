import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CryptoJS from 'crypto-js';

const Spacer = ({ height }) => <View style={{ height }} />;

export default function EncryptDecryptScreen() {
  const [textToEncrypt, setTextToEncrypt] = useState('');
  const [result, setResult] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [ivInput, setIvInput] = useState('');


  const getKey = () => {
    // Pad or truncate key to ensure it's 16 bytes (128 bits) for AES-128
    return CryptoJS.enc.Utf8.parse(keyInput.padEnd(16, ' ').substring(0, 16));
  };

  const getIv = () => {
    // Ensure IV is 16 bytes (128 bits)
    return CryptoJS.enc.Utf8.parse(ivInput.padEnd(16, ' ').substring(0, 16));
  };

  const encrypt = () => {
    try {
      const key = getKey();
      const iv = getIv();
      const ciphertext = CryptoJS.AES.encrypt(textToEncrypt, key, { iv, mode: CryptoJS.mode.CBC }).toString();
      setResult(ciphertext);
    } catch (error) {
      console.error('Error encrypting:', error);
      Alert.alert('Error', 'Error encrypting the text.');
    }
  };

  const decrypt = () => {
    try {
      const key = getKey();
      const iv = getIv();
      // Make sure the textToEncrypt is in the correct format
      const bytes = CryptoJS.AES.decrypt(textToEncrypt, key, { iv, mode: CryptoJS.mode.CBC });
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (originalText) {
        setResult(originalText);
      } else {
        Alert.alert('Error', 'Decryption failed. Please check your key and IV.');
      }
    } catch (error) {
      console.error('Error decrypting:', error);
      Alert.alert('Error', 'Error decrypting the text.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AES-128-CBC Encryption & Decryption</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to encrypt"
        value={textToEncrypt}
        onChangeText={setTextToEncrypt}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter key (up to 16 characters)"
        value={keyInput}
        onChangeText={setKeyInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter IV (up to 16 characters)"
        value={ivInput}
        onChangeText={setIvInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Result"
        value={result}
        editable={false}
      />
      <Spacer height={10} />
      <Button title="Encrypt" onPress={encrypt} />
      <Spacer height={20} />
      <Button title="Decrypt" onPress={decrypt} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});