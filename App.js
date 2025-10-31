import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { ExpenseProvider } from './src/context/ExpenseContext';

// Screens
import SignInScreen from './src/screens/SignInScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';

const Stack = createNativeStackNavigator();

// Screens accessible after login
const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#1976D2' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
    <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add New Transaction' }} />
    <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} options={{ title: 'Transaction Details' }} />
  </Stack.Navigator>
);

// Screen accessible before login
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

// Root Navigator that switches based on authentication
const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// Main App component wrapped in all contexts
export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <RootNavigator />
      </ExpenseProvider>
    </AuthProvider>
  );
}