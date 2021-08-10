import React, {useEffect,useState} from 'react'
import { View,Text,ScrollView,TouchableOpacity } from 'react-native'
import firebase from '../database/firebase'
import { ListItem,Avatar } from 'react-native-elements/dist'

const UsersList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot =>{
            const users = []
            querySnapshot.docs.forEach(doc => {
                const {name,email,phone} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            })
            setUsers(users)
        })
    },[])

    return (
        <ScrollView>
            <TouchableOpacity style={{backgroundColor:'purple',alignSelf:'center',margin:10,padding:7}} onPress={() => props.navigation.navigate('CreateUser')}>
                <Text style={{color:'white'}}>Create users</Text>
            </TouchableOpacity>
            {
                users.map(user => {
                    return(
                        <ListItem 
                            key={user.id}
                            bottomDivider
                            onPress={() => {props.navigation.navigate('UserDetail',{userId: user.id})
                            }}
                        >
                            <ListItem.Chevron/>
                            <Avatar source={{uri:'https://picsum.photos/50'}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>Email: {user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default UsersList
