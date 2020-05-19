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
import {ForgotPassword} from '../utilities/auth';
import userStore from '../utilities/store';
import {saveUser}  from '../constants/User'
import { ListDB } from '../utilities/dbstore';


const ConfirmCode = (props) => {
 
   const { userData } = props.navigation.state.params
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)


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
      return
    }

    try {
     const result = await SetNewPassword(userData.username, code, password)
     console.log(result)
     

      try {
        confirmResult = await SignInCaregiver(userData.username, password)
       
        
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    
    var raw = JSON.stringify({"token":55452});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
     
    
     let response = await  fetch("https://techsavanna.net:8181/kidogoadmin/frontend/web/index.php?r=api/get-care-givers", requestOptions)
    
     if (response) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();

      var i;
       for (i = 0; i <json.length; i++) {
       var single= json[i].username;
       if (single === userData.username) {
        const caregiverData = {
          id: json[i].id_user,
          lastUpdate: GetShortDate(-1),
          username:userData.username,
          password:json[i].password_hash,
          email:json[i].email,
          firstName:json[i].first_name,
          lastName:json[i].last_name,
          phone:json[i].phone,
          centreName:json[i].address,
         location:json[i].city,
          city:json[i].city,
        }
        await CreateCaregiver(caregiverData)
        break
      }
         
       
       }
      // return
      }

        
        

    // const caregiversResp = await ListDB(CAREGIVER)
    // const caregivers = caregiversResp["data"]["listCaregivers"]["items"]

    // for (const caregiver of caregivers) {
    //   if (caregiver.username === userData.username) {
    //    userStore.dispatch(saveUser(caregiver));
    
    //    // console.log(userStore.getState())
    //     break
    //   }
    // }
        setLoading(false)
        setError(Language.ResetSuccessful)

        props.navigation.navigate('Dash')
      } catch (error) {
        const errors = error.errors.map((error) => error.message)
        const errorText = errors.join('\n')

        setError(errorText)
        setLoading(false)
      }
    
  } catch (error) {
      setError(error.message)
    setLoading(false)
  }
    
  }
    
  const onResend = async () => {
    setCode('')
    setLoading(true)
    //console.log(userData)
    try {
      const resend = await ForgotPassword(userData.username)
      console.log(resend)
      setLoading(false)
      setError('Confirmation code resent')
    } catch (error) {
      setLoading(fale)
      setError(erro.message)
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
