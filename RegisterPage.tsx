import React, { useState } from "react";
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";

export const RegisterPage = ({ navigation }) => {
  const options = ['store', 'company'];
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (name.length > 3 && email.includes('@gmail.com') && password.length > 4 && selectedOption) {
      setLoading(true);

      fetch('http://192.168.84.235/Register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${name}&age=${age}&email=${email}&password=${password}&selectedOption=${selectedOption}`,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);

          if (data.status === 'success') {
            Alert.alert('Success', 'Registration successful!');
            navigation.navigate('FirstPage');
          } else {
            Alert.alert('Error', 'Registration failed. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Fill in all fields");
      Alert.alert("All fields are mandatory");
    }
  };

  return (
    <View>
      <Text style={mystyles.header}>Abbottabad Medicose!</Text>
      <TextInput placeholder="Name" onChangeText={(text) => setName(text)} style={mystyles.input} />
      <TextInput placeholder="Age" onChangeText={(text) => setAge(text)} style={mystyles.input} />
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} style={mystyles.input} />
      <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry style={mystyles.input} />

      <View style={mystyles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedOption(option)}
            style={{ ...mystyles.optionButton, backgroundColor: option === selectedOption ? 'green' : 'white' }}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={mystyles.loader} />
      ) : (
        <Button title="Register" onPress={submit} />
      )}
    </View>
  );
};

const mystyles = StyleSheet.create({
  header: { textAlign: "center", fontSize: 25, backgroundColor: "skyblue", height: 60, paddingTop: 10 },
  input: { borderColor: 'black', borderWidth: 1, margin: 5, padding: 10 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  optionButton: { backgroundColor: 'white', padding: 10, margin: 5 },
  loader: { marginTop: 10 },
});
