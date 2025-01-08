import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch('http://192.168.84.235/Getorders.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from server:', data);

      if (data.status === 'success') {
        setOrders(data.orders || []);
        console.log('Orders state:', data.orders);
      } else {
        console.error('Error fetching orders:', data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch orders when the screen is focused
      getOrders();
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, [navigation]);

  const renderItem = ({ item, index }) => {
    console.log('Rendering item:', index, item);
    return (
      <View style={[styles.orderContainer, { backgroundColor: index < orders.length && index % 2 === 0 ? '#F0F0F0' : '#FFFFFF' }]}>
        <Text style={styles.orderText}>{`ID: ${item.id}, Email: ${item.email}, Product: ${item.product_title}, Amount: ${item.amount}`}</Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products are here</Text>
      <Text style={styles.title}>Orders:</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

function Dashboard({ route }) {
  const email = route.params.email.email;

  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.welcomeText}>Welcome to Dashboard, {email}!</Text>
      <Text style={styles.infoText}>Explore and manage your company's data with ease.</Text>
      {/* Add more Dashboard components here */}
    </View>
  );
}



const Drawer = createDrawerNavigator();

function MyDrawer(email, password) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} initialParams={{ email, password }} />
      <Drawer.Screen name="Orders" component={Orders} />
    </Drawer.Navigator>
  );
}

export const Company = ({ route }) => {
  const { email, password } = route.params;
  console.log(email);
  console.log(password);
  return <MyDrawer email={email} password={password} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderContainer: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
});

export default Company;
