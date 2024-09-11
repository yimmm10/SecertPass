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


/*import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CryptoJS from 'crypto-js';

export default function ExampleScreen() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [password, setPassword] = useState(''); // User-defined key for AES encryption
  const [iv, setIv] = useState(''); // IV for encryption and decryption
  const [cipherText, setCipherText] = useState(''); // Cipher text input for decryption

  // AES-256 Encryption function
  const encryptPassword = () => {
    if (!password || password.length < 8) {
      Alert.alert('Error', 'Please enter a valid key (at least 8 characters long).');
      return;
    }

    if (inputText.length > 0) {
      try {
        const key = CryptoJS.enc.Utf8.parse(password); // Convert password to key
        const ivGenerated = CryptoJS.lib.WordArray.random(16); // Generate a random IV for encryption
        const encrypted = CryptoJS.AES.encrypt(inputText, key, { iv: ivGenerated }).toString();
        const encryptedWithIv = ivGenerated.toString(CryptoJS.enc.Hex) + encrypted; // Attach IV to the encrypted text
        setEncryptedText(encryptedWithIv);
        setIv(ivGenerated.toString(CryptoJS.enc.Hex)); // Display IV to user for later use
        Alert.alert('Success', 'Text successfully encrypted');
      } catch (error) {
        Alert.alert('Error', 'Encryption failed.');
      }
    } else {
      Alert.alert('Error', 'Please enter text to encrypt.');
    }
  };

  // AES-256 Decryption function
  const decryptPassword = () => {
    if (!password || password.length < 8) {
      Alert.alert('Error', 'Please enter a valid key (at least 8 characters long).');
      return;
    }

    if (cipherText.length > 0 && iv.length === 32) {
      try {
        const ivParsed = CryptoJS.enc.Hex.parse(iv); // Parse the IV input
        const key = CryptoJS.enc.Utf8.parse(password); // Convert password to key
        const bytes = CryptoJS.AES.decrypt(cipherText, key, { iv: ivParsed });
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (decrypted) {
          setDecryptedText(decrypted);
          Alert.alert('Success', 'Text successfully decrypted');
        } else {
          Alert.alert('Error', 'Decryption failed.');
        }
      } catch (error) {
        Alert.alert('Error', 'Decryption failed.');
      }
    } else {
      Alert.alert('Error', 'Please enter valid cipher text and IV.');
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
        placeholder="Enter text to encrypt"
        value={inputText}
        onChangeText={setInputText}
      />

      <TouchableOpacity style={styles.button} onPress={encryptPassword}>
        <Text style={styles.buttonText}>ENCRYPT</Text>
      </TouchableOpacity>

      {encryptedText ? (
        <>
          <Text style={styles.resultText}>Encrypted Text: {encryptedText}</Text>
          <Text style={styles.resultText}>IV: {iv}</Text>
        </>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Enter cipher text to decrypt"
        value={cipherText}
        onChangeText={setCipherText}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter IV (in hex)"
        value={iv}
        onChangeText={setIv}
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
*/