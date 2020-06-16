import React, { useState } from 'react'
import {
  View, Text, TextInput, Image,Picker
} from 'react-native'
import { Styles } from '../constants/Style';
import TextField from 'react-native-md-textinput';
import Language from '../languages'
import  countries from '../assets/countries.json';

const CentreEntry = (props) => {

  
  const getGenderItems = () => {
   
    return Object.values(countries).map((countries, i) => {
      return (
        <Picker.Item
          key={i}
          label={countries.name+' ('+countries.code+')'}
          value={countries.code+'#'+countries.name}
        />
      )
    })
  }
  return (
    <View>
      <Text style={Styles.h1}>Centre</Text>

      <Image
        style={Styles.img}
        source={require('../assets/images/centre.png')}
      />

      <TextField
        style={Styles.textfield}
        blurOnSubmit={false}
        value={props.centreName}
        label={Language.centreName}
        onChangeText={props.onChangeCentreName}
      />


      <TextField
      style={Styles.textfield}
        blurOnSubmit={false}
        value={props.location}
        label={Language.location}
        onChangeText={props.onChangeLocation}
      />

 

      <TextField
       style={Styles.textfield}
        blurOnSubmit={false}
        value={props.city}
        label={Language.city}
        onChangeText={props.onChangeCity}
      />

<View style={Styles.rowElement} >
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={props.country}
              onValueChange={(value, pos) => props.setCountry(value)}
            >
               <Picker.Item label='Kenya(+254)' value='+254' />
              { getGenderItems() }
            </Picker>
          </View>
          <Text style={Styles.label} >
            { Language.Country }
          </Text>
          </View>

      
    </View>
  )
}

export default CentreEntry