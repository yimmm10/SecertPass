import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [application, setApplication] = useState(item.application);
  const [username, setUsername] = useState(item.username);
  const [password, setPassword] = useState(item.password);
  const [note, setNote] = useState(item.note);
  const [showPassword, setShowPassword] = useState(false); // สถานะการแสดง/ซ่อน password
  const Spacer = ({ height }) => <View style={{ height }} />;

  // ฟังก์ชันอัพเดตข้อมูล
  const updateData = async () => {
    const docRef = doc(db, 'userPasswords', item.id);
    await updateDoc(docRef, {
      application,
      username,
      password,
      note,
    });
    Alert.alert('Update Successful', 'Your password details have been updated.');
    navigation.goBack();
  };

  // ฟังก์ชันลบข้อมูล
  const deleteData = async () => {
    const docRef = doc(db, 'userPasswords', item.id);
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this password?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deleteDoc(docRef);
            Alert.alert('Delete Successful', 'Your password has been deleted.');
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Application</Text>
      <TextInput
        style={styles.input}
        value={application}
        onChangeText={setApplication}
        placeholder="Application"
      />
    <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
    <Text style={styles.label}>Password</Text>  
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
    <Text style={styles.label}>Note</Text>  
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Note (optional)"
      />

    <Spacer height={10} />

      <TouchableOpacity style={styles.buttonupdate} onPress={updateData}> 
                <Text style={styles.btnupdateText}>Update</Text>
      </TouchableOpacity>

      <Spacer height={10} />

      <TouchableOpacity style={styles.buttondelete} onPress={deleteData}>
                <Text style={styles.btndeleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonupdate: {
    backgroundColor: '#5383C3',
    padding: 15,
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center', // จัดปุ่มให้อยู่ตรงกลาง
    alignItems: 'center', // จัดข้อความในปุ่มให้อยู่ตรงกลาง
},
buttondelete: {
    backgroundColor: '#2c3539',
    padding: 15,
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center', // จัดปุ่มให้อยู่ตรงกลาง
    alignItems: 'center', // จัดข้อความในปุ่มให้อยู่ตรงกลาง
},
btnupdateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
},
btndeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
},
});
