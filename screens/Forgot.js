import React, { useState } from 'react'
import { TextInput, Text, TouchableOpacity, View } from 'react-native'
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
import {ForgotPassword} from '../utilities/auth';


const Forgot = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage ] = useState(null)

  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }
  
  const onForgot = async () => {
    const userData = {
      username,
    }
    setLoading(true)
    const user= await ForgotPassword(username)
    console.log(user)
    if (user.message) {
      setError(user.message)
      setLoading(false)
    } else {
      props.navigation.navigate('ConfirmCode', { userData })
    }
      console.log(user+"result")
 
  }

  return (
    <Backdrop>
        <Message text={message} />

      {loading
        ? <Loading />
        : <View>
            <Spacer large />

            <Text style={[Styles.h1, { fontSize: 35 }, Styles.raleway]} >
              { Language.Reset }
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

            <Spacer large />

            <View  style={{ alignItems:'center' }}>
            <TouchableOpacity
              style={Styles.mainButton}
              onPress={onForgot}
            >
              <Text style={Styles.buttonText}>{ Language.SendCode }</Text>
            </TouchableOpacity>
            </View>
                     
          </View>
      }
    </Backdrop>
  )
}


export default Forgot

