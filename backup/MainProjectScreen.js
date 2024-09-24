import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function MainProjectScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Web , setWeb] = useState('');
  const [note, setNote] = useState('');

  const handleSave = () => {
    // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
    if (!username || !password || !Web || !note) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน!');
      return;
    }

    // บันทึกข้อมูลไปยังฐานข้อมูลหรือทำการประมวลผลอื่นๆ
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Web:', Web);
    console.log('Note:', note);

    // แสดง Alert เมื่อบันทึกสำเร็จ
    Alert.alert('บันทึกสำเร็จ', 'ข้อมูลถูกบันทึกเรียบร้อยแล้ว!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เพิ่มข้อมูลของคุณ</Text>
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
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Web"
        value={Web}
        onChangeText={setWeb}
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#888',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
