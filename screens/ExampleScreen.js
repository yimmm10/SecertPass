import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function PasswordList () {
const PasswordList = () => {
  const [passwords, setPasswords] = useState([
    { id: 1, name: 'EX:PASS1', detail: 'รายละเอียดของรหัสผ่าน 1' },
    { id: 2, name: 'EX:PASS2', detail: 'รายละเอียดของรหัสผ่าน 2' },
    // ... เพิ่มรายการรหัสผ่านอื่นๆ
  ]);

  const handlePasswordPress = (item) => {
    // นำทางไปยังหน้าจอแสดงรายละเอียดรหัสผ่าน
    console.log('Navigate to detail screen for password:', item.name);
    // ในส่วนนี้ คุณจะใช้ navigation library เช่น React Navigation เพื่อนำทาง
  };

  return (
    <View>
      <Text>รายการรหัสผ่าน</Text>
      <TouchableOpacity>
        <Text>+</Text> {/* ปุ่มเพิ่มรหัสผ่าน */}
      </TouchableOpacity>
      <FlatList
        data={passwords}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePasswordPress(item)}>
            <TextInput value={item.name} editable={false} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
}


