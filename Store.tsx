import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

function Product({ navigation, route }) {
  const [productsdata, setproductsdata] = useState('');

  useEffect(() => {
    fetch('http://192.168.84.235/products.php', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!productsdata) {
          setproductsdata(data);
        }
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const imagesMap = {
    1: require('../Pictures/shoe1.jpg'),
    2: require('../Pictures/shoe2.jpg'),
    3: require('../Pictures/shoe3.jpg'),
    4: require('../Pictures/shoe4.jpg'),
    5: require('../Pictures/shoe5.jpg'),
    6: require('../Pictures/shoe6.jpg'),
  };

  const Buy = (props) => {
    console.log(props.name);
    navigation.navigate('Cart', { name: props.name, price: props.price, email: route.params.email, password: route.params.password });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => { Buy({ name: item.title, price: item.price }) }} style={{ borderColor: 'black', borderWidth: 2, borderRadius: 10, }}>
      <View style={styles.productContainer}>
        <View>
          <Image source={imagesMap[item.id]} style={styles.productImage} />
          <Text style={styles.productPrice}>{item.price}</Text>
          <Text style={styles.productTitle}>{item.title}</Text>
        </View>
        <View style={styles.productItem}></View>
      </View>
    </TouchableOpacity>
  );

  const numColumns = productsdata.length >= 2 ? 2 : 1;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products are here</Text>
      <FlatList
        data={productsdata}
        key={numColumns}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
}

function Cart({ route, navigation }) {
  if (!route.params || !route.params.name || !route.params.price || !route.params.email || !route.params.password) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error</Text>
        <Text style={styles.errorMessage}>No items in the cart.</Text>
      </View>
    );
  }

  const { name, price, email, password } = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    console.log(email);
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPayment = price * quantity;

  const confirmOrder = () => {
    fetch('http://192.168.84.235/order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}&productName=${name}&amount=${totalPayment}`,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.status === 'success') {
          Alert.alert('Success', 'Order confirmed!');
          navigation.goBack();
        } else {
          Alert.alert('Error', 'Order confirmation failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>Price: PKR {price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleDecrease}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrease}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalPayment}>Total: PKR{totalPayment}</Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={confirmOrder}
      >
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
}


//history


function History({ route }) {
  const email = route.params.email;
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const getBill = () => {
    fetch('http://192.168.84.235/History.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}`,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.status === 'success') {
          setOrderHistory(data.orders);
          calculateTotalAmount(data.orders);
        } else {
          Alert.alert('Error', 'Order confirmation failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const calculateTotalAmount = orders => {
    const total = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    getBill();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
        Order History
      </Text>

      {orderHistory.map(order => (
        <View
          key={order.id}
          style={{
            borderWidth: 2,
            borderColor: 'yellow',
            // padding: 10,
            marginBottom: 10,
            borderRadius: 8,
            paddingLeft: 10
          }}
        >
          <Text style={{ fontSize: 16, backgroundColor: 'black', color: 'yellow' }}>ID: {order.id}</Text>
          <Text style={{ fontSize: 16, backgroundColor: 'black', color: 'yellow' }}>Email: {order.email}</Text>
          <Text style={{ fontSize: 16, backgroundColor: 'black', color: 'yellow' }}>Amount: ${order.amount}</Text>
          <Text style={{ fontSize: 16, backgroundColor: 'black', color: 'yellow' }}>Product Title: {order.product_title}</Text>
        </View>
      ))}

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
        Total Amount: PKR{totalAmount}
      </Text>
    </ScrollView>
  );
}

export default History;


//hiatory ended
const drawer = createDrawerNavigator();

function MyDrawer({ email, password }) {
  return (
    <drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db', // Set your desired background color here
        },
        headerTintColor: '#fff', // Set text color for the header
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <drawer.Screen name="Dashboard" component={Dashboard} initialParams={{ email, password }} />
      <drawer.Screen name="products" component={Product} initialParams={{ email, password }} />
      <drawer.Screen name="Cart" component={Cart} />
      <drawer.Screen name="History" component={History} initialParams={{ email, password }} />
    </drawer.Navigator>
  );
}

function Dashboard({ route }) {
  const email = route.params.email;
  console.log(email);
  return (
    <View>
      <Text style={{textAlign:"center",fontSize:30,fontWeight:'bold',marginTop:10}}>.Sneakers</Text>
      <Image source={require('../Pictures/shoe1.jpg')} style={{marginLeft:100}}/>
      <View style={{ width: 330, borderWidth: 2, margin: 50, borderRadius: 10 }}>
        <Text style={styles.welcomeText}>Welcome to Dashboard, {email}!</Text>
        <Text style={styles.infoText}>Explore and Buy your Favourite products.</Text>
        {/* Add more Dashboard components here */}
      </View>
    </View>

  );
}


export const Store = ({ route }) => {
  const { email, password } = route.params;
  console.log(email);
  console.log(password);
  return <MyDrawer email={email} password={password} />;
};

export default Store;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  productItem: {
    alignItems: 'flex-end',
  },
  productImage: {
    width: 170,
    height: 170,
    borderRadius: 8,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 16,
    color: '#007AFF',
  },
  productTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatList: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  totalPayment: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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