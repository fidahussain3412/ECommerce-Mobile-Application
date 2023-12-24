import React from "react";
import { useState } from "react";
import { Text,View,TextInput,Button,StyleSheet } from "react-native";
 export const FirstPage=({navigation})=>

{

  const[email,setemail]=useState('fida');
  const[password,setpassword]=useState('jhjh');

const HandleLogin=()=>
{
fetch('http://192.168.1.6/Login.php',{
  method:"POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  
  body: `email=${email}&password=${password}`,

})
.then(response => response.json())
.then(data => {
  console.log(data);
  if(data.status=="success"&&data.role=="store")
  {navigation.navigate('store', {email:email})}
 else if(data.status=="success"&&data.role=="company")
  {navigation.navigate('company', {email:email})}
  // Handle success or error based on the response from the server
})
.catch(error => {
  console.error('Error:', error);
});

}


  
return(

<View>
<Text style={{ textAlign: "center", fontSize: 25, backgroundColor: "skyblue", height: 60, paddingTop: 10 }}>Abbottabad Medicose!</Text>
<TextInput placeholder="email" style={mystyles.input} onChangeText={(tx)=>{setemail(tx)}}></TextInput>
<TextInput placeholder="Password" style={mystyles.input} onChangeText={(tx)=>{setpassword(tx)}}></TextInput>
<Button title="Signin" onPress={()=>{HandleLogin()}}></Button>
<View style={{marginTop:10}}>
<Button title="Register" onPress={()=>{navigation.navigate('RegisterPage')}}></Button>
</View>


</View>




);



}
const mystyles = StyleSheet.create({
    input: { borderColor: 'black', borderWidth: 1, margin: 5 }
  });