import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Styles } from '../constants/Style';
import Spacer from '../components/Spacer';
import { SetNewPassword } from '../utilities/auth';
import Loading from '../components/Loading';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import Message from '../components/Message';
import SecureInput from '../components/SecureInput';


const NewPassword = (props) => {
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)

  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }


  
  const onReset = async () => {
    
    if (password !== passwordConfirm) {
      setError('Password confirmation does not match')
      setPassword('')
      setPasswordConfirm('')
      setLoading(false)
    } else {
      const userData = {
        passwordConfirm,
        password,     
      }
      setLoading(true)
    const user= await SetNewPassword(username, password)
  
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
      setPassword('')
      setUsername('')
      setLoading(false)
        // The error happens when the supplied username/email does not exist in the Cognito user pool
    }else {
      setError(Language.UnknownError)
      setLoading(false)
       console.log(user);
    }
    }


    setLoading(false)

    if (signUpResult.message) {
      setError(signUpResult.message)
    } else {
      props.navigation.navigate('Confirm', { caregiverData })
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

            
      <SecureInput
        value={props.password}
        setValue={props.onChangePassword}
      />

      <Text style={Styles.label} >
        { Language.Password }
      </Text>

      <SecureInput
        value={props.passwordConfirm}
        setValue={props.onChangePasswordConfirm}
      />

      <Text style={Styles.label} >
        { Language.Confirm } { Language.Password }
      </Text>

            <Spacer large />

            <View  style={{ alignItems:'center' }}>
            <TouchableOpacity
              style={Styles.mainButton}
              onPress={onSignIn}
            >
              <Text style={Styles.buttonText}>{ Language.Confirm }</Text>
            </TouchableOpacity>
            </View>
            
            <View  style={{ alignItems:'flex-end' }}>
            <TouchableOpacity
              style={Styles.sendCode}
              onPress={onReset}
            >
              <Text style={Styles.resendButton}>{ Language.ResetPassword }</Text>
            </TouchableOpacity>
            </View>
          </View>
      }
    </Backdrop>
  )
}
}

export default NewPassword
