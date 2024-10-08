import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Spacer = ({ height }) => <View style={{ height }} />;

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Secret Password</Text>
      </View>
      <Spacer height={20} />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainProject')}>
      <Text style={styles.buttonText}>จัดเก็บรหัสผ่านของท่าน</Text>
      </TouchableOpacity>
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>ยินดีต้อนรับ</Text>

        <Spacer height={20} />

        <Text style={styles.descriptionText}>
          เข้าสู่ระบบจัดการรหัสผ่านที่มีความปลอดภัยมากที่สุดในขณะนี้
        </Text>
        <Text style={styles.questionText}>ท่านต้องการจะปรึกษาในด้านใด?</Text>
        </View>
        <Spacer height={10} />
        
        
        <View style={styles.buttoncontainer}>
          
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  },
  header: {
    backgroundColor: '#000', // Header background color
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text in the header
  },
  content: {
    marginTop: 50, // Spacing between the header and content
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // Darker text color for readability
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#000', // Slightly lighter gray
    textAlign: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#555',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow effect
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  buttoncontainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
});