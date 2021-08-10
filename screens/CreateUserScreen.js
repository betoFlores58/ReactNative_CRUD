import React, {useState} from 'react'
import {ActivityIndicator,View,Text,TextInput,ScrollView,StyleSheet,TouchableOpacity } from 'react-native'
import firebase from '../database/firebase';

//EVITAR WARNING
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
//----------------------

const CreateUserScreen = (props) => {
    const initalState = {
        name:'',
        email:'',
        phone:''
    };

    const [state, setState] = useState(initalState);

    const handleChangeText = (name,value) => {
        setState({...state,[name]:value})
    };

    const addNewUser = async () => {
    if (state.name === "") {
      alert("Please provide a name");
    } else {

      try {
        <ActivityIndicator style={{margin:10}} size="large" color="#0000ff" />
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
        });
        props.navigation.navigate("UsersList");
      } catch (error) {
        console.log(error)
      }
    }
  };
    return (
        <ScrollView style={{marginTop:15}}>
            <View style={styles.inputs}>
                <TextInput keyboardAppearance='light' keyboardType='default' placeholder="Username" onChangeText={(value) => handleChangeText('name',value) } />
            </View>
            <View style={styles.inputs}>
                <TextInput placeholder="Email" keyboardAppearance='dark' keyboardType='email-address' required onChangeText={(value) => handleChangeText('email',value) } />
            </View>
            <View style={styles.inputs}>
                <TextInput placeholder="Phone number" keyboardAppearance='dark' keyboardType='phone-pad' onChangeText={(value) => handleChangeText('phone',value) } />
            </View>
            <View style={{alignSelf:'center',margin:15}}>
                <TouchableOpacity onPress={() => addNewUser()} style={{backgroundColor:'orange',padding:7,borderRadius:10}}>
                    <Text style={{fontWeight:'bold'}}>Save user</Text>
                </TouchableOpacity>
            </View>
            {/*<Text style={{fontSize:10,alignSelf:'center'}} onPress={() => props.navigation.navigate("UsersList")}>Ve a la lista de usuarios</Text>*/}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    inputs:{
        flex:1,
        padding:0,
        margin:12,
        borderBottomColor:'grey',
        borderBottomWidth:1,
    }
})

export default CreateUserScreen
