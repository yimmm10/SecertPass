import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Spacer = ({ height }) => <View style={{ height }} />;

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        // Check if both email and password are provided
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        if (!password.trim()) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        // Firebase authentication sign-in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successful login
                navigation.navigate('OTP'); // Navigate to OTP screen
            })
            .catch((error) => {
                // Handle errors
                Alert.alert('Error', error.message);
            });
    };

    const handlePasswordReset = () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email to reset password');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Success', 'Password reset email sent!');
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity onPress={handlePasswordReset}>
                <Text style={styles.linkText}>You Forgot Password? Reset here!</Text>
            </TouchableOpacity>

            <Spacer height={20} />

            <TouchableOpacity style={styles.buttonlogin} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
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
    linkText: {
        fontSize: 16,
        color: 'gray',
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginTop: 20,
    },
});
