import React,{ useState } from 'react'

 import TextField from 'react-native-md-textinput';
import {
  View, Text, TextInput, Image,ScrollView
} from 'react-native'
import { Styles } from '../constants/Style';
import SecureInput from './SecureInput';
import Language from '../languages'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const CaregiverEntry = (props) => {
 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [soundObject, setSoundObject] = useState(null)
  
  return (
    <ScrollView style={Styles.container} >
      <Text style={[Styles.h1, { fontSize: 35 }, Styles.raleway]} >
        { Language.Caregiver }
      </Text>

      <Image
        source={require('../assets/images/caregiver.png')}
        style={Styles.img}
      />


      <TextField
       
       // value={props.firstName}
       value="Test"
        style={Styles.textfield}
        label= { Language.FirstName }
        blurOnSubmit={false}
        setValue={setFirstName}
        onChangeText={props.onChangeFirstName}
      />

    

        <TextField
        //  value={props.lastName}
          style={Styles.textfield}
          value="Account"
        blurOnSubmit={false}
        setValue={setLast}
        label=  { Language.LastName }
        onChangeText={props.onChangeLastName}
      />



      <TextField
       style={Styles.textfield}
       // value={props.email}
        value="cmasi@techsavanna.technology"
        label=  { Language.Email }
        onChangeText={props.onChangeEmail}
      />

     
      <TextField
  style={Styles.textfield}
        keyboardType="number-pad"
        //value={props.phone}
        prefix="+254"
        value="711401187"
        label= { Language.Phone }
        onChangeText={props.onChangePhone}
      />
      
      <TextField
        style={Styles.textfield}
        label= { Language.Username }
        //value={props.username}
        value="TestAccount"
        onChangeText={props.onChangeUsername}
        blurOnSubmit={false}
      />

      <TextField
       // value={props.password}
        value="TestAccount#123"
        style={Styles.textfield}
        onChangeText={props.onChangePassword}
        label= { Language.Password }
      />

      

      <TextField
        style={Styles.textfield}
         label= { Language.Confirm +" "+ Language.Password}
        //value={props.passwordConfirm}
        value="TestAccount#123"
        onChangeText={props.onChangePasswordConfirm}
    
      />

    
    </ScrollView>
  )
}

export default CaregiverEntry