import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก Firestore
    const q = query(collection(db, 'userPasswords'), orderBy('application'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const passwords = snapshot.docs.map(doc => ({
        id: doc.id, // เก็บ ID ของเอกสารเพื่อใช้อ้างอิง
        ...doc.data(),
      }));
      setPasswordList(passwords);
    });

    // ยกเลิกการฟังเมื่อคอมโพเนนต์ถูกทำลาย
    return () => unsubscribe();
  }, []);

  // ฟังก์ชันสำหรับแสดงรายการในรูปแบบ FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', { item })}>
      <Text style={styles.application}>{item.application}</Text>
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Secret Password</Text>
        {/* ปุ่ม + ด้านบนขวา */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MainProject')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* แสดงรายการข้อมูล */}
      <FlatList
        data={passwordList}
        renderItem={renderItem}
        keyExtractor={item => item.id} // ใช้ id เป็น key
        contentContainerStyle={styles.listContainer} // ปรับสไตล์ของ FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#5383C3',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: '#626466',
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  application: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20, // เพิ่มพื้นที่ด้านล่าง
  },
});
