import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { Styles } from '../constants/Style';
import Language from '../languages'
import TextField from 'react-native-md-textinput';


const ContactEntry = (props) => {
  return (
    <View>
      <Text style={[Styles.h1, Styles.raleway]} >
        { Language.Contact }
      </Text>

      <Image
        style={Styles.img}
        source={require('../assets/images/econtact.png')}
      />

      <TextField
        style={Styles.textfield}
        label=  { Language.FirstName }
        value={props.firstName}
        onChangeText={props.setFirstName}
      />

  

      <TextField
        style={Styles.textfield}
        value={props.lastName}
        label= { Language.LastName }
        onChangeText={props.setLastName}
      />


      <TextField
        style={Styles.textfield}
        maxLength={11}
        label= { Language.Phone }
        value={props.phone}
        keyboardType="number-pad"
        onChangeText={props.setPhone}
      />

   
    </View>
  )
}

export default ContactEntry
