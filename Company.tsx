import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from  "react";
import {View, FlatList, Image, Text } from "react-native";



function Product()

{

return(

<View>

<Text>products are here</Text>

</View>


);

}
// function 2
function Cart()

{

return(

<View>

<Text>i will have the components added to the carts poe shwe?</Text>

</View>


);

}

const drawer=createDrawerNavigator();
function MyDrawer() {
    return (

      

      <drawer.Navigator>
        <drawer.Screen name="products" component={Product} />
        <drawer.Screen name="Cart" component={Cart} />
      </drawer.Navigator>
      
    );
  }

export const Company=()=>

{
//functions 


//write functions before me
return(

//<View>


<MyDrawer/>

//</View>

);

}





export default Company;