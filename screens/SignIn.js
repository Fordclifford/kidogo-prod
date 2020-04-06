import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextInput, Text, AsyncStorage,TouchableOpacity, View } from 'react-native'
import { Styles } from '../constants/Style';
import Spacer from '../components/Spacer';
import { SignInCaregiver } from '../utilities/auth';
import Loading from '../components/Loading';
import { ListDB } from '../utilities/dbstore';
import { CreateCaregiver } from '../utilities/localstore';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import Message from '../components/Message';
import SecureInput from '../components/SecureInput';
import { CAREGIVER } from '../constants/Store';
import userStore from '../utilities/store';
import {saveUser}  from '../constants/User'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'
import TextField from 'react-native-md-textinput';


const SignIn = (props) => {

  
  //console.log(userStore.getState())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [soundObject, setSoundObject] = useState(null)
 
  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }

 
  
  const onForgot = async () => {
    setLoading(true)
    props.navigation.navigate('Forgot')
  }
  const onSignIn = async () => {
    if (username == "") {
      setError(Language.usernameEmpty)
     
      
      setLoading(false)
      return;
    }
    if (password == "") {
      setError(Language.passwordEmpty)
     
      setLoading(false)
      return;
    }
    setLoading(true)
    
    const user= await SignInCaregiver(username, password)
   
    if(user.code){
     // console.log(user.code+"result")
      if (user.code === 'UserNotConfirmedException') {
        
        setError(Language.AccountNotConfirmed)
        setPassword('')
        setUsername('')
        setLoading(false)
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
    } else if (user.code === 'PasswordResetRequiredException') {
      setError(Language.ResetMessage)
      setPassword('')
      setUsername('')
      setLoading(false)
    
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
    } else if (user.code === 'NotAuthorizedException') {
      setError(Language.InvalidPassword)
      setPassword('')
     
      setLoading(false)
        // The error happens when the incorrect password is provided
    } else if (user.code === 'UserNotFoundException') {
      setError(Language.InvalidUsername)
      setPassword('')
      setUsername('')
      setLoading(false)
        // The error happens when the supplied username/email does not exist in the Cognito user pool
    } 
    else if (user.code === 'NetworkError') {
      setError(Language.NetwordError)
    
      setLoading(false)
        // The error happens when the supplied username/email does not exist in the Cognito user pool
    }else {
      setError(Language.UnknownError)
      setLoading(false)
       console.log(user);
    }
    }



    const caregiversResp = await ListDB(CAREGIVER)
    const caregivers = caregiversResp["data"]["listCaregivers"]["items"]

    for (const caregiver of caregivers) {
      if (caregiver.username === username) {
       userStore.dispatch(saveUser(caregiver));
    
        await CreateCaregiver(caregiver)
        console.log(userStore.getState())
        break
      }
    }
   

    setLoading(false)

    props.navigation.navigate('Dash')
  }
  const toggleHelpAudio = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync()
        setSoundObject(null)
      } else {
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../assets/audio/signin.mp3'))
        await soundObject.playAsync()
        setSoundObject(soundObject)
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <Backdrop>
        <Message text={message} />

      {loading
        ? <Loading />
        : <View>
            <Spacer large />

            <Text style={[Styles.h1, { fontSize: 35 }, Styles.raleway]} >
              { Language.SignIn }
            </Text>

            <TextInput
              style={Styles.input}
              value={username}
              onChangeText={setUsername}
              blurOnSubmit={false}
            />

            <Text style={Styles.label} >
              { Language.Username }
            </Text>

            <SecureInput
              value={password}
              setValue={setPassword}
            />

            <Text style={Styles.label} >
              { Language.Password }
            </Text>

            <Spacer large />

            <View  style={{ alignItems:'center' }}>
            <TouchableOpacity
              style={Styles.mainButton}
              onPress={onSignIn}
            >
              <Text style={Styles.buttonText}>{ Language.SignIn }</Text>
            </TouchableOpacity>
            </View>
            
            <View  style={{ alignItems:'flex-end' }}>
            <TouchableOpacity
              style={Styles.sendCode}
              onPress={() => props.navigation.navigate('Forgot')}
            >
              <Text style={Styles.resendButton}>{ Language.ResetPassword }</Text>
            </TouchableOpacity>
            </View>
          </View>
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


export default SignIn

