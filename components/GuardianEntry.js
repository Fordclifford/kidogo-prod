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
import  counties from '../assets/counties.json';
import { City, CityStrings } from '../constants/Enrollment';

const GuardianEntry = (props) => {
  const [hideId, setHideId] = useState(true)


  const toggleHideId = () => setHideId(!hideId)
  const getCounties = () => {
  return Object.values(counties).map((counties, i) => {
    return (
      <Picker.Item
        key={i}
        label={counties.name}
        value={counties.name}
      />
    )
  })
}


const getCity = () => {
  return Object.values(City).map((city, i) => {
    return (
      <Picker.Item
        key={i}
        label={CityStrings[city]}
        value={city}
      />
    )
  })
}

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



<View style={Styles.rowElement} >
<Text style={Styles.label} >
            { Language.Location }
          </Text>
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={props.address}
              onValueChange={(value, pos) => props.setAddress(value)}
            >           
               <Picker.Item label='Select' value='' />   
              { getCounties() }
            </Picker>
          </View>
          
          </View>


          <View style={Styles.rowElement} >
          <Text style={Styles.label} >
            { Language.City }
          </Text>
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={props.city}
              onValueChange={(value, pos) => props.setCity(value)}
            >
              
              { getCity() }
            </Picker>
          </View>
         
          </View>
 

      <TextField
        style={Styles.textfield}
        maxLength={11}
        value={props.phone}
        keyboardType="number-pad"
        label= { Language.Phone }
        onChangeText={props.setPhone}
      />
       <TextField
            value={props.govtId}
            label= { Language.IdentificationNumber }
               onChangeText={props.setGovtId}
          />

     

      <View style={Styles.rowElements} >
        <View style={Styles.rowElement} >
        <Text style={Styles.label} >
            { Language.Relationship }
          </Text>
          <View style={Styles.financePickerContainer} >
            <Picker
              style={Styles.financePicker}
              selectedValue={props.relation}
              onValueChange={(value, pos) => props.setRelation(value)}
            >
              <Picker.Item label='Select' value=''></Picker.Item>
              { getRelationItems() }
            </Picker>
          </View>

         
        </View>

      </View>
    </View>
  )
}

export default GuardianEntry
