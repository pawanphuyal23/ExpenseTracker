import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { ExpenseContext } from '../context/ExpenseContext';
import { Picker } from '@react-native-picker/picker';

const TRANSACTION_TYPES = ['Debit', 'Credit', 'Refund'];
const CATEGORIES = ['Shopping', 'Travel', 'Utility', 'Food', 'Entertainment', 'Other'];

const AddExpenseScreen = ({ navigation }) => {
  const { addExpense } = useContext(ExpenseContext);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState(TRANSACTION_TYPES[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);

  const validateAndAdd = () => {
    if (!date || !amount || !description || !location || !type || !category) {
      return Alert.alert('Validation Error', 'All fields are required.');
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return Alert.alert('Validation Error', 'Amount must be a positive number.');
    }
    
    // Simple date format validation (e.g., YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return Alert.alert('Validation Error', 'Date must be in YYYY-MM-DD format.');
    }

    addExpense({
      date,
      amount: parseFloat(amount),
      description,
      location,
      type,
      category,
    });

    Alert.alert('Success', 'Transaction added successfully!');
    navigation.goBack(); // Return to the dashboard
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>New Transaction</Text>

      <CustomInput label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} placeholder="2025-10-31" />
      <CustomInput label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="e.g., 45.99" />
      <CustomInput label="Description" value={description} onChangeText={setDescription} placeholder="e.g., Dinner at Italian Place" />
      <CustomInput label="Location" value={location} onChangeText={setLocation} placeholder="e.g., Main Street Store" />

      <Text style={styles.pickerLabel}>Transaction Type</Text>
      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        {TRANSACTION_TYPES.map(t => <Picker.Item key={t} label={t} value={t} />)}
      </Picker>

      <Text style={styles.pickerLabel}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {CATEGORIES.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>
      
      <View style={styles.buttonContainer}>
        <Button title="Add Transaction" onPress={validateAndAdd} color="#4CAF50" />
      </View>
    </ScrollView>
  );
};

const CustomInput = ({ label, ...props }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} {...props} />
    </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' },

  header: { fontSize: 24, 
    fontWeight: 'bold',
     marginBottom: 20, 
     textAlign: 'center', 
     color: '#333' },

  inputGroup: { marginBottom: 15 },

  label: { fontSize: 16,
     marginBottom: 5, 
     color: '#555' },

  input: { borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    borderRadius: 5 },

  pickerLabel: { fontSize: 16, 
    marginTop: 10, 
    marginBottom: 5, 
    color: '#555' },

  picker: { height: 50, 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginBottom: 15 },

  buttonContainer: { marginTop: 20 },
});

export default AddExpenseScreen;