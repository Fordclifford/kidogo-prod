import React, { useState } from 'react'
import {
  View, Text, TextInput, Image,Picker
} from 'react-native'
import { Styles } from '../constants/Style';
import TextField from 'react-native-md-textinput';
import Language from '../languages'
import  countries from '../assets/countries.json';
import  counties from '../assets/counties.json';
import { City, CityStrings } from '../constants/Enrollment';
const CentreEntry = (props) => {

  
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

<View style={Styles.rowElement} >
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={props.location}
              onValueChange={(value, pos) => props.setLocation(value)}
            >           
               <Picker.Item label='Select' value='' />   
              { getCounties() }
            </Picker>
          </View>
          <Text style={Styles.label} >
            { Language.Location }
          </Text>
          </View>


          <View style={Styles.rowElement} >
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={props.city}
              onValueChange={(value, pos) => props.setCity(value)}
            >
              
              { getCity() }
            </Picker>
          </View>
          <Text style={Styles.label} >
            { Language.City }
          </Text>
          </View>
 

      

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