import React, { useState } from 'react'
import { TextInput, Text, TouchableOpacity, View,Picker } from 'react-native'
import { Styles } from '../constants/Style';
import Spacer from '../components/Spacer';
import { SignInCaregiver, SendSms } from '../utilities/auth';
import Loading from '../components/Loading';
import { ListDB } from '../utilities/dbstore';
import { CreateCaregiver } from '../utilities/localstore';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import Message from '../components/Message';
import SecureInput from '../components/SecureInput';
import { CAREGIVER } from '../constants/Store';
import {ForgotPassword} from '../utilities/auth';
import  countries from '../assets/countries.json';
import { ScrollView } from 'react-native-gesture-handler';

const Forgot = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('+254#Kenya')
  const [loading, setLoading] = useState(false)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage ] = useState(null)

  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }

  const getGenderItems = () => {
   
    return Object.values(countries).map((countries, i) => {
      return (
        <Picker.Item
          key={i}
          label={countries.name+' ('+countries.code+')'}
          value={countries.code+'#'+countries.name}
        />
      )
    })
  }
  
  const onForgot = async () => {
    if(username==''){
      setError(Language.usernameEmpty)
      return
    }
    const res = country.split("#");
    const countryName= res[1]
    const countryCode= res[0].substring(1)
    const userData = {
      username,
     countryCode
    }
    setLoading(true)
    const user= await ForgotPassword(username.trim(),countryCode)
    
    console.log(user)
    if (user.statusCode===200) {
      
  

      userData.code=user.token
      const sms= await SendSms(Language.VerifyCode+userData.code,username.trim(),countryCode)
      if (sms.statusCode===200) {
        props.navigation.navigate('ConfirmCode', { userData })
     
      }else{
        setError(Language.UnknownError)
        setLoading(false)
      }
    
    }else  if (user.statusCode===411) {
      setError(Language.InvalidUsername)
      setLoading(false)
    } else {
      setError(Language.UnknownError)
      setLoading(false)
    }
    //  console.log(user+"result")
 
  }

  return (
    <Backdrop>
        <Message text={message} />

      {loading
        ? <Loading />
        : <ScrollView>
            <Spacer large />

            <Text style={[Styles.h1, { fontSize: 35 }, Styles.raleway]} >
              { Language.Reset }
            </Text>

            <View  >
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={country}
              onValueChange={(value, pos) => setCountry(value)}
            >
               <Picker.Item label='Kenya(+254)' value='+254#Kenya' />
              { getGenderItems() }
            </Picker>
          </View>
          <Text style={Styles.label} >
            { Language.Country }
          </Text>
          </View>

          {/* <Spacer medium /> */}

            <TextInput
              style={Styles.input}
              value={username}
              keyboardType="number-pad"
              onChangeText={setUsername}
              blurOnSubmit={false}
            />

            <Text style={Styles.label} >
              { Language.Phone }
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
                     
          </ScrollView>
      }
    </Backdrop>
  )
}


export default Forgot

