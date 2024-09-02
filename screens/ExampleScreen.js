import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import CryptoJS from 'crypto-js';

export default function ExampleScreen() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [password, setPassword] = useState('mysecretkey'); // Key for AES encryption
  const [encryptLength, setEncryptLength] = useState(''); // Number of characters to encrypt
  const [decryptLength, setDecryptLength] = useState(''); // Number of characters to decrypt

  // AES-256 Encryption function
  const encryptPassword = () => {
    const textToEncrypt = inputText.substring(0, parseInt(encryptLength)); // Encrypt specified number of characters
    if (textToEncrypt.length > 0) {
      try {
        const key = CryptoJS.enc.Utf8.parse(password); // Convert password to key
        const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV for encryption
        const encrypted = CryptoJS.AES.encrypt(textToEncrypt, key, { iv: iv }).toString();
        const encryptedWithIv = iv.toString() + encrypted; // Attach IV to the encrypted text
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
      <Text style={styles.label}>Enter Text</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={inputText}
        onChangeText={setInputText}
      />

      <Text style={styles.label}>Characters to Encrypt</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of characters"
        keyboardType="numeric"
        value={encryptLength}
        onChangeText={setEncryptLength}
      />

      <Button title="ENCRYPT" onPress={encryptPassword} />
      <Text style={styles.text}>Encrypted Text: {encryptedText}</Text>

      <Text style={styles.label}>Characters to Decrypt</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of characters"
        keyboardType="numeric"
        value={decryptLength}
        onChangeText={setDecryptLength}
      />

      <Button title="DECRYPT" onPress={decryptPassword} />
      <Text style={styles.text}>Decrypted Text: {decryptedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
});




/*import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import CryptoJS from 'crypto-js';

export default function ExampleScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [password, setPassword] = useState('mysecretkey'); // Key for AES encryption
  const [encryptLength, setEncryptLength] = useState(''); // Number of characters to encrypt
  const [decryptLength, setDecryptLength] = useState(''); // Number of characters to decrypt

  // AES-256 Encryption function
  const encryptPassword = () => {
    const textToEncrypt = inputText.substring(0, parseInt(encryptLength)); // Encrypt specified number of characters
    if (textToEncrypt.length > 0) {
      const encrypted = CryptoJS.AES.encrypt(textToEncrypt, password).toString();
      setEncryptedText(encrypted);
      Alert.alert('Success', 'Text successfully encrypted');
    } else {
      Alert.alert('Error', 'Please enter valid text and number of characters to encrypt.');
    }
  };

  // AES-256 Decryption function
  const decryptPassword = () => {
    if (encryptedText) {
      const bytes = CryptoJS.AES.decrypt(encryptedText, password);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      const textToDecrypt = decrypted.substring(0, parseInt(decryptLength)); // Decrypt specified number of characters
      if (textToDecrypt.length > 0) {
        setDecryptedText(textToDecrypt);
        Alert.alert('Success', 'Text successfully decrypted');
      } else {
        Alert.alert('Error', 'Please enter valid decryption length.');
      }
    } else {
      Alert.alert('Error', 'No text to decrypt. Please encrypt text first.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Text</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={inputText}
        onChangeText={setInputText}
      />

      <Text style={styles.label}>Characters to Encrypt</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of characters"
        keyboardType="numeric"
        value={encryptLength}
        onChangeText={setEncryptLength}
      />

      <Button title="ENCRYPT" onPress={encryptPassword} />
      <Text style={styles.text}>Encrypted Text: {encryptedText}</Text>

      <Text style={styles.label}>Characters to Decrypt</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of characters"
        keyboardType="numeric"
        value={decryptLength}
        onChangeText={setDecryptLength}
      />

      <Button title="DECRYPT" onPress={decryptPassword} />
      <Text style={styles.text}>Decrypted Text: {decryptedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
});
*/