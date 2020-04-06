import React, { useState } from 'react'
import {
  Image, Picker, Text, TextInput, TouchableOpacity, View
} from 'react-native'
import { Icon } from 'react-native-elements';
import { Styles } from '../constants/Style';
import Language from '../languages'
import SecureInput from './SecureInput';
import { Relation, RelationStrings } from '../constants/Enrollment';
import TextField from 'react-native-md-textinput';


const GuardianEntry = (props) => {
  const [hideId, setHideId] = useState(true)


  const toggleHideId = () => setHideId(!hideId)


  const getRelationItems = () => {
    return Object.values(Relation).map((relation, i) => {
      return (
        <Picker.Item
          key={i}
          label={RelationStrings[relation]}
          value={relation}
        />
      )
    })
  }


  return (
    <View>
      <Text style={[Styles.h1, Styles.raleway]} >
        { Language.Guardian }
      </Text>

      <Image
        style={Styles.img}
        source={require('../assets/images/guardian.png')}
      />

      <TextField
        style={Styles.textfield}
        label=   { Language.FirstName }
        value={props.firstName}
        onChangeText={props.setFirstName}
      />



      <TextField
        style={Styles.textfield}
        value={props.lastName}
        label=  { Language.LastName }
        onChangeText={props.setLastName}
      />



      <TextField
        value={props.address}
        style={Styles.textfield}
        label=  { Language.Location }
        onChangeText={props.setAddress}
      />

     

      <TextField
        value={props.city}
        style={Styles.textfield}
        label=  { Language.City }
        onChangeText={props.setCity}
      />

   
      <TextField
        style={Styles.textfield}
        maxLength={11}
        value={props.phone}
        keyboardType="number-pad"
        label= { Language.Phone }
        onChangeText={props.setPhone}
      />

     

      <View style={Styles.rowElements} >
        <View style={Styles.rowElement} >
          <View style={Styles.financePickerContainer} >
            <Picker
              style={Styles.financePicker}
              selectedValue={props.relation}
              onValueChange={(value, pos) => props.setRelation(value)}
            >
              { getRelationItems() }
            </Picker>
          </View>

          <Text style={Styles.label} >
            { Language.Relationship }
          </Text>
        </View>

        <View style={Styles.rowElement} >
          <TextField
            value={props.govtId}
            label= { Language.IdentificationNumber }
            setValue={props.setGovtId}
          />

          
        </View>
      </View>
    </View>
  )
}

export default GuardianEntry
