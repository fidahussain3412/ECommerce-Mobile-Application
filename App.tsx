import 'react-native-gesture-handler';
import { RegisterPage } from './Components/RegisterPage';
import { FirstPage } from './Components/FirstPage';
import React from 'react';
import {Company} from './Components/Company'
import {Store} from './Components/Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {

  Text,
  
  View,
} from 'react-native';

const stack=createStackNavigator();
function Mystack()
{
return(
 <stack.Navigator >
<stack.Screen name='FirstPage' component={FirstPage}   options={{ headerShown: false }}  />
<stack.Screen name='RegisterPage' component={RegisterPage}/>
<stack.Screen name='store' component={Store}/>
<stack.Screen name='company' component={Company}/>
</stack.Navigator> 


);

}

const App=()=>

{
return(



 <NavigationContainer>
 <Mystack/>

 </NavigationContainer>


//<RegisterPage/>

);


}


export default App;
