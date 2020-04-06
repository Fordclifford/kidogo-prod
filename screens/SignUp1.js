import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,Image
} from 'react-native';
import TextField from 'react-native-md-textinput';
import { Audio } from 'expo-av'
import { Styles, Size } from '../constants/Style';
import { Icon } from 'react-native-elements'
import uuid from 'uuid'
import Loading from '../components/Loading'
import Spacer from '../components/Spacer'
import CaregiverEntry from '../components/CaregiverEntry'
import Message from '../components/Message';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import { GetShortDate } from '../utilities/dates';


const SignUp1 = (props) => {
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


  const onNext = async () => {
    setLoading(true)


    if (password !== passwordConfirm) {
      setError(Language.PasswordMismatch)
      setPassword('')
      setPasswordConfirm('')
      setLoading(false)
    } else {
      const signup1Data = {
        id: uuid(),
        lastUpdate: GetShortDate(-1),
        username,
        password,
        passwordConfirm,
        email,
        firstName,
        lastName,
        phone
      }
    
      props.navigation.navigate('SignUp', { signup1Data })
     
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
    } catch (error) {
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
      <ScrollView style={Styles.container} >
      <Text style={[Styles.h1, { fontSize: 35 }, Styles.raleway]} >
        { Language.Caregiver }
      </Text>

      <Image
        source={require('../assets/images/caregiver.png')}
        style={Styles.img}
      />


      <TextField
      
      value={firstName}
        style={Styles.textfield}
        label= { Language.FirstName }
        blurOnSubmit={false}
       onChangeText={setFirstName}
      />

    

        <TextField
        value={lastName}
        style={Styles.textfield}
        blurOnSubmit={false}
        setValue={setLastName}
        label=  { Language.LastName }
        onChangeText={setLastName}
      />



      <TextField
       style={Styles.textfield}
        value={email}
        //value="cmasi@techsavanna.technology"
        label=  { Language.Email }
        onChangeText={setEmail}
      />

     
      <TextField
  style={Styles.textfield}
        keyboardType="number-pad"
        value={phone}
        prefix="+254"
      //  value="711401187"
        label= { Language.Phone }
        onChangeText={setPhone}
      />
      
      <TextField
        style={Styles.textfield}
        label= { Language.Username }
        value={username}
       // value="TestAccount"
        onChangeText={setUsername}
        blurOnSubmit={false}
      />

      <TextField
        value={password}
     
        style={Styles.textfield}
        onChangeText={setPassword}
        label= { Language.Password }
      />

      

      <TextField
        style={Styles.textfield}
         label= { Language.Confirm +" "+ Language.Password}
        value={passwordConfirm}
        //value="TestAccount#123"
        onChangeText={setPasswordConfirm}
    
      />

    
    </ScrollView>
 


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

export default SignUp1
