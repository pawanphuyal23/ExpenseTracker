
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ExpenseContext } from '../context/ExpenseContext';

const TransactionItem = ({ transaction, onPress, formatAmount }) => {
  const isDebit = transaction.type === 'Debit';
  const amountColor = isDebit ? '#D32F2F' : '#388E3C'; 

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(transaction)}>
      <View style={styles.textGroup}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.category}>{transaction.category} - {transaction.date}</Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {formatAmount(transaction.amount, transaction.type)}
      </Text>
    </TouchableOpacity>
  );
};

const DashboardScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const { expenses, formatAmount } = useContext(ExpenseContext);

  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={signOut} title="Logout" color="#D32F2F" />
      ),
      headerLeft: () => null, 
    });
  }, [navigation, signOut]);

  const handleTransactionPress = (transaction) => {
    navigation.navigate('TransactionDetail', { transaction });
  };

  const totalBalance = expenses.reduce((sum, exp) => {
    if (exp.type === 'Debit') return sum - exp.amount;
    if (exp.type === 'Credit') return sum + exp.amount;
    return sum; // Refunds are generally balance neutral or handled differently
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>
          ${totalBalance.toFixed(2)}
        </Text>
      </View>

      <View style={styles.actionRow}>
        <Text style={styles.listHeader}>Recent Transactions</Text>
        <Button title="+ Add Expense" onPress={() => navigation.navigate('AddExpense')} color="#1976D2" />
      </View>
      
      {expenses.length === 0 ? (
        <Text style={styles.noTransactions}>No transactions yet. Add one!</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem 
              transaction={item} 
              onPress={handleTransactionPress} 
              formatAmount={formatAmount} 
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: '#f0f2f5' },

  summaryCard: { backgroundColor: '#fff', 
    padding: 20, 
    margin: 10, 
    borderRadius: 10, 
    elevation: 5, 
    alignItems: 'center' },

  balanceLabel: { fontSize: 18, 
    color: '#555' },

  balanceAmount: { fontSize: 32, 
    fontWeight: 'bold', 
    color: '#1976D2', 
    marginTop: 5 },

  actionRow: { flexDirection: 'row', 
    justifyContent: 'space-between',
     alignItems: 'center', 
     paddingHorizontal: 10, 
     paddingVertical: 5 },

  listHeader: { fontSize: 18, 
    fontWeight: '600', 
    color: '#333' },

  itemContainer: { flexDirection: 'row', 
    justifyContent: 'space-between',
     padding: 15,
      marginHorizontal: 10,
       marginVertical: 4, 
       backgroundColor: '#fff',
        borderRadius: 8, 
        elevation: 2 },

  textGroup: { flex: 1, 
    marginRight: 10 },

  description: { fontSize: 16, 
    fontWeight: 'bold',
     color: '#333' },

  category: { fontSize: 14, 
    color: '#777' },

  amount: { fontSize: 16,
     fontWeight: 'bold', 
     minWidth: 80, 
     textAlign: 'right' },

  noTransactions: { textAlign: 'center',
     marginTop: 50, 
     fontSize: 16, 
     color: '#999' }
});

export default DashboardScreen;