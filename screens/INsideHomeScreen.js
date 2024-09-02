import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Spacer = ({ height }) => <View style={{ height }} />

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Secert Password</Text>
      </View>
      
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>ยินดีต้อนรับ</Text>
        
        <Spacer height={20} />

        <Text style={styles.descriptionText}>
          เข้าสู่ระบบจัดการจัดผ่านที่มีความปลอดภัยมากที่สุดในขณะนี้
        </Text>
        <Text style={styles.questionText}>ท่านต้องการจะปรึกษาในด้านใด?</Text>
        <Spacer height={20} />
        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainProject')}>
          <Text style={styles.buttonText}>จัดเก็บรหัสผ่านของท่าน</Text>
        </TouchableOpacity>
        
        <Spacer height={10} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exam')}>
          <Text style={styles.buttonText}>ทดสอบระบบจัดการรหัสผ่าน</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 280,
    
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
    color: '#555', // Slightly lighter gray
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
    backgroundColor: '#666',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '80%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // For Android shadow effect
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});

/*import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
const HomeScreen = () => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>StorngPassword</Text>
      </View>


      <Text style={styles.welcomeText}>ยินดีต้อนรับ</Text>
      <Text style={styles.descriptionText}>
        เข้าสู่ระบบจัดการจัดผ่านที่มีความปลอดภัยมากที่สุดในขณะนี้
      </Text>
      <Text style={styles.questionText}>ท่านต้องการจะปรึกษาในด้านใด?</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>เก็บรหัสผ่านของท่าน</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ทดสอบระบบจัดการรหัสผ่าน</Text>
      </TouchableOpacity>
    </View>
  );
};
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // เปลี่ยนสีพื้นหลังตามต้องการ
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // เปลี่ยนสีพื้นหลังส่วนหัว
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4285F4',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
})
*/
