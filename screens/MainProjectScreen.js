import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // import db และ auth สำหรับ Firebase
import { useFocusEffect } from '@react-navigation/native'; // สำหรับการดึงข้อมูลใหม่เมื่อหน้าจอ active

export default function MainProjectScreen({ navigation }) {
  const [application, setApplication] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [strength, setStrength] = useState(0);
  const [userPasswords, setUserPasswords] = useState([]); // state สำหรับเก็บรหัสผ่านของผู้ใช้
  const [loading, setLoading] = useState(false); // สถานะโหลด
  const [error, setError] = useState(''); // สถานะข้อผิดพลาด

  // ฟังก์ชันตรวจสอบความแข็งแรงของรหัสผ่าน
  const checkPasswordStrength = (password, username) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[\W_]/.test(password)) score += 1;
    if (!password.includes(username)) score += 1; // ตรวจสอบว่ารหัสผ่านไม่ซ้ำกับชื่อผู้ใช้
    return score;
  };

  // ฟังก์ชันที่รันเมื่อเปลี่ยนรหัสผ่าน
  const handlePasswordChange = (password) => {
    setPassword(password);
    const strengthScore = checkPasswordStrength(password, username);
    setStrength(strengthScore);
    setPasswordStrength(strengthScore > 4 ? 'Strong' : strengthScore > 2 ? 'Medium' : 'Weak');
  };

  // ดึงรหัสผ่านของผู้ใช้จาก Firestore
  const fetchUserPasswords = async () => {
    setLoading(true); // เริ่มโหลด
    setError(''); // ล้าง error
    try {
      const user = auth.currentUser; // ตรวจสอบว่าผู้ใช้ล็อกอินแล้ว
      if (!user) {
        setLoading(false);
        alert('User not logged in');
        return;
      }

      const q = query(collection(db, 'userPasswords'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const passwords = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserPasswords(passwords); // บันทึกรหัสผ่านใน state
    } catch (error) {
      console.error('Error fetching user passwords: ', error);
      setError('Error fetching passwords');
    } finally {
      setLoading(false); // สิ้นสุดการโหลด
    }
  };

  // เรียกใช้ fetchUserPasswords ทุกครั้งเมื่อผู้ใช้กลับมาที่หน้าจอนี้
  useFocusEffect(
    useCallback(() => {
      fetchUserPasswords();
    }, [])
  );

  // บันทึกข้อมูลรหัสผ่าน
  const saveData = async () => {
    if (!application || !username || !password) {
      alert('Please enter application, username, and password');
      return;
    }

    try {
      const user = auth.currentUser; // ตรวจสอบว่าผู้ใช้ล็อกอินแล้ว
      if (!user) {
        alert('User not logged in');
        return;
      }

      await addDoc(collection(db, 'userPasswords'), {
        application: application,
        username: username,
        password: password,
        note: note || '',
        createdAt: serverTimestamp(), // บันทึกเวลา
        userId: user.uid, // บันทึก userId ของผู้ใช้
      });

      alert('Data saved successfully');
      navigation.navigate('Home2'); // ย้อนกลับไปหน้า Home2 หลังบันทึกสำเร็จ

      // ล้างข้อมูลที่กรอกในฟอร์ม
      setApplication('');
      setUsername('');
      setPassword('');
      setNote('');
      fetchUserPasswords(); // ดึงข้อมูลใหม่หลังบันทึก
    } catch (error) {
      console.error('Error saving data: ', error);
      alert('Error saving data');
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
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
        secureTextEntry={true} // ซ่อนรหัสผ่าน
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
