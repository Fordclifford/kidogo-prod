import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  View, Text, TextInput, TouchableOpacity
} from 'react-native'
import { Styles, Size } from '../constants/Style';
import {
  SignInCaregiver, ConfirmCaregiver, ResendConfirmCode,sendToAPi
} from '../utilities/auth'
import {
  CreateCaregiver, InitDatabase, UpdateStore
} from '../utilities/localstore';
import bcrypt from 'react-native-bcrypt'


import Spacer from '../components/Spacer';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import Message from '../components/Message';
import Loading from '../components/Loading';
import { CreateDB } from '../utilities/dbstore';
import userStore from '../utilities/store';
import {saveUser}  from '../constants/User'
import { CAREGIVER } from '../constants/Store';
import { baseUrl } from '../utilities/config';


const Confirm = (props) => {
  const dispatch = useDispatch()

  const { caregiverData } = props.navigation.state.params

  const [code, setCode] = useState('')
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)


  const onConfirmAttempt = async () => {
    if (!code) {
      setError("Confirmation code is missing")
      return
    }

    setLoading(true)

 
    

    const confirmResult = await ConfirmCaregiver(caregiverData.username, code)

    if (confirmResult === 'SUCCESS') {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(caregiverData.password, 10, (err, hash) => {
          if (err) {
            reject(err)
          }
          resolve(hash)
        })
      })

      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    
    var raw = JSON.stringify({"email":caregiverData.email,"phone":caregiverData.phone,"token":55452,"first_name":caregiverData.firstName,"last_name":caregiverData.lastName,"gender":"F","password":caregiverData.password,"address":caregiverData.centreName,"country":"Kenya","city":caregiverData.city,"idorpassport":caregiverData.phone});
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
     
    
     let response = await  fetch(baseUrl+"frontend/web/index.php?r=api/add-caregiver", requestOptions)
    
    // if (response) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response;
      setLoading(false)
      setMessage("Successfully Created")
      setError("Signup successful")
      
    
      props.navigation.navigate('Home')
      // console.log(response+"response")
      // console.log(json.transactionStatus+"stat")
      // console.log(json+"json")

     // if(json.transactionStatus=="SUCCESS") {

      try {
        await SignInCaregiver(caregiverData.username, caregiverData.password)

        caregiverData.password = hashedPassword
        caregiverData.id = json.idUser
        await CreateCaregiver(caregiverData)
        await CreateDB(CAREGIVER, caregiverData)
        await InitDatabase(dispatch)
        await UpdateStore(dispatch)

        setLoading(false)

        props.navigation.navigate('Dash')
      } catch (error) {
        const errors = error.errors.map((error) => error.message)
        const errorText = errors.join('\n')

        setError(errorText)
        setLoading(false)
      }
    // } else {
    //   setLoading(false)
    //   console.log(json+"success")
    //  // setError(json.transactionStatus)
   
    // }
  
    
    // } else {
    //   setLoading(false)
    //   //setError(response.status)
    //   console.log(response+"http")
     
    // }

  }

} 
  const onResend = async () => {
    setCode('')
    await ResendConfirmCode(caregiverData.username)
    setError('Confirmation code resent')
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

      { loading
        ? <Loading />
        : <View>
            <Text style={Styles.codeMessage} >
              { Language.CodeMessage }
            </Text>

            <Spacer medium />

            <View style={Styles.codeContainer} >
              <TextInput
                style={Styles.codeInput}
                maxLength={6}
                textAlign={'center'}
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
              />
            </View>

            <Spacer large />

            <View style={Styles.rowElements}>
              <TouchableOpacity
                style={Styles.rowButton}
                onPress={onResend}
              >
                <Text style={Styles.buttonText}>
                  { Language.Resend }
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.rowButton}
                onPress={onConfirmAttempt}
              >
                <Text style={Styles.buttonText}>
                  { Language.Confirm }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      }
    </Backdrop>
  )
}

export default Confirm
