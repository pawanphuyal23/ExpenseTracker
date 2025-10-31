import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleSignIn = () => {
    if (signIn(username, password)) {
      // Navigation is implicitly handled by the root navigator based on AuthContext state
      Alert.alert('Success', 'Signed in successfully!');
    } else {
      Alert.alert('Error', 'Invalid username or password. Use "admin"/"admin".');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pawan Expense Tracker </Text>
      <TextInput
        style={styles.input}
        placeholder="Username (admin)"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password (admin)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    justifyContent: 'center',
     padding: 20, 
     backgroundColor: '#f0f2f5' },

  title: { fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center' },

  input: { borderWidth: 1,
     borderColor: '#ccc', 
     padding: 10, 
     marginBottom: 15, 
     borderRadius: 5, 
     backgroundColor: '#fff' },
});

export default SignInScreen;