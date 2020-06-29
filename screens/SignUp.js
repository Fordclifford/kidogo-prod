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
  
  const [centreName, setCentreName] = useState('')
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState('')
  const [country, setCountry] = useState('+254#Kenya')
  const [city, setCity] = useState('')
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [soundObject, setSoundObject] = useState(null)

  const onNext = async () => {
    setLoading(true)

    if (centreName== '') {
      setError(Language.CenterRequired)
    //  setPassword('')
     // setPasswordConfirm('')
      setLoading(false)
      return
      
    } 
    if (location== '') {
      setError(Language.LocationRequired)
    //  setPassword('')
     // setPasswordConfirm('')
      setLoading(false)
      return
    }

    if (city== '') {
      setError(Language.CityRequired)
    //  setPassword('')
     // setPasswordConfirm('')
      setLoading(false)
      return
    }
    
  
     
      const signupData = {
        id: uuid(),
        lastUpdate: GetShortDate(-1),
        centreName,
        address,
        location,
        city,
        country
       
      }
    
      props.navigation.navigate('SignUp1', { signupData })
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
              country={country}
              location={location}
              city={city}
              onChangeCountry={setCountry}
              onChangeCentreName={setCentreName}
              onChangeAddress={setAddress}
              onChangeLocation={setLocation}
              onChangeCity={setCity}
              setCountry={setCountry}
              setLocation={setLocation}
              setCity={setCity}
            />

<Spacer large />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={Styles.mainButton}
              onPress={onNext}
            >
              <Text style={Styles.buttonText}>
                {Language.Next}
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
