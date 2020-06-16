import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  View, Text, TextInput, TouchableOpacity
} from 'react-native'
import { Styles, Size } from '../constants/Style';
import {
  SignInCaregiver, ConfirmCaregiver, ResendConfirmCode
} from '../utilities/auth'
import {
  CreateCaregiver, InitDatabase, UpdateStore
} from '../utilities/localstore';
import bcrypt from 'react-native-bcrypt'
import SecureInput from '../components/SecureInput';

import Spacer from '../components/Spacer';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import Message from '../components/Message';
import Loading from '../components/Loading';
import { CreateDB } from '../utilities/dbstore';
import { CAREGIVER } from '../constants/Store';
import { SetNewPassword } from '../utilities/auth';
import {ForgotPassword,SendSms} from '../utilities/auth';
import userStore from '../utilities/store';
import {saveUser}  from '../constants/User'
import { ListDB } from '../utilities/dbstore';


const ConfirmCode = (props) => {
 
   const { userData } = props.navigation.state.params

  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  var [verificationCode, setVerificationCode] = useState(userData.code)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const countryCode = userData.countryCode
  const username= userData.username

  


  const onConfirmAttempt = async () => {

    setLoading(true)
    if (password !== passwordConfirm) {
      setError(Language.PasswodMismatch)
      setPassword('')
      setPasswordConfirm('')
      setLoading(false)
    }
 
    if (!code) {
      setError(Language.CodeMissing)
      setLoading(false)
     // return
    }
    if(verificationCode!==code){
      console.log(verificationCode)
      console.log(code)
      setError(Language.InvalidCode)
      setLoading(false)
    //  return
    }

   
     
     const result = await SetNewPassword(username.trim(), password,countryCode)
     console.log(result)

     if(result.statusCode){

if(result.statusCode===200){
  
  if(countryCode==='254'){
    var ph =username.trim().split('-').join('')
    var phone = ph.substring(ph.length - 9)
    var phone_number = countryCode + phone


  }else{
    var phone_number = countryCode + username.split('-').join('')
  }


  const message="Success! Your username is "+phone_number +" and password "+password


  const sms = await SendSms(message,username.trim(),countryCode)
  console.log(sms)


  if(sms.statusCode){
    if(sms.statusCode===200){
      clearTimeout(callbackId)
      setMessage(Language.ResetSuccessful)
      setCallbackId(setTimeout(() => {setMessage(null)
        props.navigation.navigate('Home')
       // setLoading(false)
      }, 4000))
    }
  else{
    setError(Language.UnknownError)
    setLoading(false)
    return
  }
  }else{
    setError(Language.UnknownError)
    setLoading(false)
    return
  }

    
}else{
  setError(Language.UnknownError)
  setLoading(false)
 // return
}

     }else{
       setError(Language.UnknownError)
       setLoading(false)
     //  return

     }
  

        
      }
    
 
      
    
  
    
  const onResend = async () => {
    setCode('')
    setLoading(true)
    //console.log(userData)
    const user= await ForgotPassword(username.trim(),countryCode)
    
    console.log(user)
    if (user.statusCode===200) {
      
       userData.code=user.token
      const sms= await SendSms(Language.VerifyCode+userData.code,username.trim(),countryCode)
      if (sms.statusCode===200) {
        setVerificationCode(userData.code)
        setError("Confirmation code resent")
      setLoading(false)
     
      }else{
        setError(Language.UnknownError)
        setLoading(false)
       // return
      }
    
    }else  if (user.statusCode===411) {
      setError(Language.InvalidUsername)
      setLoading(false)
     // return
    } else {
      setError(Language.UnknownError)
      setLoading(false)
  
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
        : <View>
          <Text style={[Styles.h1, { fontSize: 35 }, Styles.raleway]} >
            {Language.ResetTitle}
          </Text>


          <Spacer Large />

          <TextInput
            style={Styles.input}
            value={code}
            onChangeText={setCode}
          />
          <Text style={Styles.label} >
            {Language.CodeMsg}
          </Text>


          <SecureInput
            value={password}
            setValue={setPassword}
          />

          <Text style={Styles.label} >
            {Language.Password}
          </Text>

          <SecureInput
            value={passwordConfirm}
            setValue={setPasswordConfirm}
          />

          <Text style={Styles.label} >
            {Language.Confirm} {Language.Password}
          </Text>
          <Spacer Large />
          <View style={Styles.rowElements}>
            <TouchableOpacity
              style={Styles.rowButton}
              onPress={onResend}
            >
              <Text style={Styles.buttonText}>
                {Language.Resend}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.rowButton}
              onPress={onConfirmAttempt}
            >
              <Text style={Styles.buttonText}>
                {Language.Confirm}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </Backdrop>
  )
}

export default ConfirmCode
