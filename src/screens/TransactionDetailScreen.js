import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExpenseContext } from '../context/ExpenseContext';

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;
  const { formatAmount } = React.useContext(ExpenseContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Details</Text>

      <View style={styles.detailCard}>
        <DetailItem label="Amount" value={formatAmount(transaction.amount, transaction.type)} valueStyle={{ color: transaction.type === 'Debit' ? 'red' : 'green', fontWeight: 'bold' }} />
        <DetailItem label="Date" value={transaction.date} />
        <DetailItem label="Description" value={transaction.description} />
        <DetailItem label="Category" value={transaction.category} />
        <DetailItem label="Location" value={transaction.location} />
        <DetailItem label="Type" value={transaction.type} />
      </View>
    </View>
  );
};

const DetailItem = ({ label, value, valueStyle = {} }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20, 
    backgroundColor: '#f0f2f5' },

  header: { fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' },

  detailCard: { backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 15, 
    elevation: 3 },

  item: { flexDirection: 'row',
     justifyContent: 'space-between', 
     paddingVertical: 10, 
     borderBottomWidth: 1,
      borderBottomColor: '#eee' },

  label: { fontSize: 16, 
    color: '#555' },

  value: { fontSize: 16,
     color: '#000', 
     maxWidth: '60%' },
});

export default TransactionDetailScreen;