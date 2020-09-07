import React, { useState } from 'react'
import {
  DatePickerAndroid, Image, Picker, Text, TextInput, TouchableOpacity, View
} from 'react-native'
import { Styles } from '../constants/Style';
import {
  Gender, GenderStrings
} from '../constants/Enrollment';
import Language from '../languages';
import { GetShortDate } from '../utilities/dates';
import TextField from 'react-native-md-textinput';


const ChildEntry = (props) => {
  const onImmunizationChange = (immunization, i) => {
    props.setImmunization(immunization)
  }


  const getGenderItems = () => {
    return Object.values(Gender).map((gender, i) => {
      return (
        <Picker.Item
          key={i}
          label={GenderStrings[gender]}
          value={gender}
        />
      )
    })
  }


  const onDateSelection = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(1990, 0),
      })

      if (action === DatePickerAndroid.dateSetAction) {
        props.setBirthdate(new Date(year, month, day))
      }
    } catch ({ code, message }) {
      console.warn(' Cannot open date picker', message)
    }
  }


  return (
    <View>
      <Text style={[Styles.h1, Styles.raleway]} >
        { Language.Child }
      </Text>

      <Image
        style={Styles.img}
        source={require('../assets/images/child.png')}
      />

      <TextField
        style={Styles.textfield}
        value={props.firstName}
        label= { Language.FirstName }
        onChangeText={props.setFirstName}
      />

  
      <TextField
        style={Styles.textfield}
        value={props.lastName}
        label= { Language.LastName }
        onChangeText={props.setLastName}
      />

     
      <View style={Styles.rowElements} >
        
        <View style={Styles.rowElement} >
        <Text style={Styles.label} >
            { Language.Birthday }
          </Text>
          <TouchableOpacity
            onPress={onDateSelection}
          >
            <Text style={Styles.dateInput} >
              { GetShortDate(0, props.birthdate) }
            </Text>
          </TouchableOpacity>

         
        </View>

        <View style={Styles.rowElement} >
        <Text style={Styles.label} >
            { Language.Gender }
          </Text>
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={props.gender}
              onValueChange={(value, pos) => props.setGender(value)}
            >
              { getGenderItems() }
            </Picker>
          </View>

          
        </View>
      </View>

      <View style={Styles.rowElements} >
        <View style={Styles.rowElement} >
        <Text style={Styles.label} >
            { Language.Immunization }
          </Text>
          <View style={Styles.financePickerContainer} >
            <Picker
              selectedValue={props.immunization}
              style={Styles.genderPicker}
              
              onValueChange={onImmunizationChange}
            >
              <Picker.Item label={Language.Select} value=''/>
              <Picker.Item label={Language.Immunized} value={true} />
              <Picker.Item label={Language.NotImmunized} value={false} />
            </Picker>
          </View>

          
        </View>

        <View style={Styles.rowElement} />
      </View>
      <Text style={Styles.label} >
 { Language.Notes }
          </Text>

      <TextInput
        style={Styles.textArea}
        multiline={true}
     
        numberOfLines={4}
        value={props.note}
        onChangeText={props.setNote}
      />
 
     
    </View>
  )
}

export default ChildEntry
