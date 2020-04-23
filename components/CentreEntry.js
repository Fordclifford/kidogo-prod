import React, { useState } from 'react'
import {
  View, Text, TextInput, Image,
} from 'react-native'
import { Styles } from '../constants/Style';
import TextField from 'react-native-md-textinput';
import Language from '../languages'

const CentreEntry = (props) => {
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

      
    </View>
  )
}

export default CentreEntry