import React, {useEffect,useState} from 'react'
import { View,Text,ScrollView,TouchableOpacity,StyleSheet,ActivityIndicator,TextInput, Alert } from 'react-native'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {

    const initalState = {
        id: "",
        name: "",
        email: "",
        phone: ""
    };
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(initalState)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("users").doc(id)
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id
        });
        setLoading(false);
    };
    
    useEffect(() => {
    getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (value,prop) => {
        setUser({...user,[prop]:value});
    };

    const deleteUser = async() => {
        setLoading(true)
        const dbRef = firebase.db.collection("users").doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate("UsersList");
    }
    const UpdateUser = async() => {
        const dbRef = firebase.db.collection("users").doc(user.id);
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        })
        setUser(initalState)
        props.navigation.navigate("UsersList");
    }
    const confirmationAlert = () => {
        Alert.alert('Remove the user','Are you sure.?',
        {text: 'Yes', onPress: () => deleteUser()},
        {text: 'No', onPress: () => console.log(false)},)
    }


    if (loading) {
        return(
            <View>
                <ActivityIndicator style={{margin:10}} size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <ScrollView style={{marginTop:15}}>
            <View style={styles.inputs}>
                <TextInput keyboardAppearance='light' value={user.name} keyboardType='default' placeholder="Username" onChangeText={(value) => handleChangeText(value,"name") } />
            </View>
            <View style={styles.inputs}>
                <TextInput placeholder="Email" value={user.email} keyboardAppearance='dark' keyboardType='email-address' onChangeText={(value) => handleChangeText(value,"email") } />
            </View>
            <View style={styles.inputs}>
                <TextInput placeholder="Phone number" value={user.phone} keyboardAppearance='dark' keyboardType='phone-pad' onChangeText={(value) => handleChangeText(value,"phone") } />
            </View>
            <View style={{alignSelf:'center',margin:15}}>
                <TouchableOpacity onPress={() => UpdateUser()} style={{backgroundColor:'blue',padding:7,borderRadius:10,margin:7}}>
                    <Text style={{fontWeight:'bold'}}>Update user</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmationAlert()} style={{backgroundColor:'red',padding:7,borderRadius:10,margin:7}}>
                    <Text style={{fontWeight:'bold'}}>Delete user</Text>
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

export default UserDetailScreen