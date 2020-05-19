import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView
} from 'react-native';
import { Audio } from 'expo-av'
import { Styles, Size } from '../constants/Style';
import { Icon } from 'react-native-elements'
import { SignUpCaregiver,sendToAPi } from '../utilities/auth'
import uuid from 'uuid'
import Loading from '../components/Loading'
import Spacer from '../components/Spacer'
import CentreEntry from '../components/CentreEntry'
import Message from '../components/Message';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import { GetShortDate } from '../utilities/dates';

const SignUp = (props) => {
  const { signup1Data } = props.navigation.state.params


  const username= signup1Data.username;
  const password=signup1Data.password;
  const phone = signup1Data.phone;

  const firstName = signup1Data.firstName;
  const lastName = signup1Data.lastName;
  const email=signup1Data.email;
  const [centreName, setCentreName] = useState('')
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState('')
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [soundObject, setSoundObject] = useState(null)

  const onSignUp = async () => {
    setLoading(true)
    

       const userData = {
        username,
        password,
        email,
        phone,
      }

      const caregiverData = {
        id: uuid(),
        lastUpdate: GetShortDate(-1),
        username,
        password,
        email,
        firstName,
        lastName,
        phone,
        centreName,
       location,
        city,
      }
  
      const signUpResult = await SignUpCaregiver(userData)

      setLoading(false)
      
      
      console.log(signUpResult)

      if (signUpResult.message) {
        setError(signUpResult.message)
        setLoading(false)

      } else {
        
        props.navigation.navigate('Confirm', { caregiverData })
      }
    
  }


  const toggleHelpAudio = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync()
        setSoundObject(null)
      } else {
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../assets/audio/signup.mp3'))
        await soundObject.playAsync()
        setSoundObject(soundObject)
      }
    } catch(error) {
      setError(error)
    }
  }


  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }


  return (
    <Backdrop>
      <Spacer height={Size.statusbar} />

      <Message text={message} />

      {loading
        ? <Loading />
        : <ScrollView >
         
            <CentreEntry
              centreName={centreName}
              address={address}
              location={location}
              city={city}
              onChangeCentreName={setCentreName}
              onChangeAddress={setAddress}
              onChangeLocation={setLocation}
              onChangeCity={setCity}
            />

            <Spacer large />
            <View  style={{ alignItems:'center' }}>
            <TouchableOpacity
              style={Styles.mainButton}
              onPress={onSignUp}
            >
              <Text style={Styles.buttonText}>
                { Language.Confirm }
              </Text>
            </TouchableOpacity>
</View>
            <Spacer height={322} />
          </ScrollView>
      }

      <TouchableOpacity
        style={Styles.helpButton}
        onPress={toggleHelpAudio}
      >
        <View style={Styles.helpButtonIcon} >
          <Icon name="record-voice-over" color="#3C233D" size={36} />
        </View>
      </TouchableOpacity>
    </Backdrop>
  )
}

export default SignUp
