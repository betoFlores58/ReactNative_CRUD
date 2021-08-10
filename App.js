import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="UsersList" options={{ title: "Users List" }} component={UsersList} />
      <Stack.Screen name="CreateUser" options={{ title: "Create User" }} component={CreateUserScreen} />
      <Stack.Screen name="UserDetail" options={{ title: "User Detail" }} component={UserDetailScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}