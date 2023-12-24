import React, { useState } from "react";
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet,Alert } from "react-native";

export const RegisterPage = ({navigation}) => {
  const options = ['store', 'company'];
  const [selectedoption, setselectedoption] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [age, setage] = useState('');
  const [Password, setpassword] = useState('');

  const Submit = () => {
  
    if(name.length>3 && email.includes('@gmail.com') && Password.length>4&&selectedoption)
    {
    fetch('http://192.168.1.6/Register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${name}&age=${age}&email=${email}&password=${Password}&selectedOption=${selectedoption}`,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
 

          if (data.status==='success') {
            // Show success alert
            Alert.alert('Success', 'Registration successful!');
            navigation.navigate('FirstPage');

          } else {
            // Show error alert
            Alert.alert('Error', 'Registration failed. Please try again.');
          }

        
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    else
    {
      
      console.log("fill the fields")
      Alert.alert("All fields are mendatory");
  }
  };

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 25, backgroundColor: "skyblue", height: 60, paddingTop: 10 }}>Abbottabad Medicose!</Text>
      <TextInput placeholder="name" onChangeText={(tx) => { setname(tx) }} style={mystyles.input}></TextInput>
      <TextInput placeholder="age" onChangeText={(tx) => { setage(tx) }} style={mystyles.input}></TextInput>

      <TextInput placeholder="email" onChangeText={(tx) => { setemail(tx) }} style={mystyles.input}></TextInput>
      <TextInput placeholder="Password" onChangeText={(tx) => { setpassword(tx) }} style={mystyles.input}></TextInput>

      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => { setselectedoption(option) }}
            style={{ backgroundColor: option === selectedoption ? 'green' : 'white' }}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Register" onPress={() => { Submit() }}></Button>
    </View>
  );
};

const mystyles = StyleSheet.create({
  input: { borderColor: 'black', borderWidth: 1, margin: 5 }
});
