import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,Image, Picker
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
import { SignUpCaregiver,sendToAPi, SendSms, SendMessage } from '../utilities/auth'
import { GenderStrings, Gender } from '../constants/Enrollment';


const SignUp1 = (props) => {
  
  
  const { signupData } = props.navigation.state.params


  const country = signupData.country;


  const res = country.split("#");
const countryName= res[1]
const countryCode= res[0].substring(1)


const centreName= signupData.centreName;
  const address=signupData.address;
  const location = signupData.location;

  const city = signupData.city;
 
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')


  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [soundObject, setSoundObject] = useState(null)

  const getGenderItems = () => {
    return Object.values(Gender).map((gender, i) => {
      return (
        <Picker.Item
          key={i}
          label={GenderStrings[gender]}
          value={gender}
        />
      )
    })
  }
  const onSignUp = async () => {
    setLoading(true)

    if (password !== passwordConfirm) {
      setError(Language.PasswordMismatch)
      setPassword('')
      setPasswordConfirm('')
      setLoading(false)
      return
    }
    

       const userData = {
        username,
        password,
        phone,
      }

      const caregiverData = {
        id: uuid(),
        lastUpdate: GetShortDate(-1),
        username,
        password,
        firstName,
        lastName,
        phone,
        countryCode,
        countryName,
        centreName,
       location,
        city,
        gender,
      }
  
      const signUpResult = await SignUpCaregiver(caregiverData)

     
      
      if(signUpResult.statusCode){
        if(signUpResult.statusCode===200){

        
            clearTimeout(callbackId)
            setMessage(Language.SignupSuccessful)
            setCallbackId(setTimeout(() => {setMessage(null)
              props.navigation.navigate('SignIn')
             // setLoading(false)
            }, 4000))
          
          }else if(signUpResult.statusCode===300){
          setError(Language.DuplicatePhone)
          setLoading(false)
          return
        }else{
          setError(Language.UnknownError)
          setLoading(false)
          return 
        }
        }else{
          setError(Language.UnknownError)
          setLoading(false)
          return
        }


      
        
      
      console.log(signUpResult)

      return;

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



<View style={Styles.rowElement} >
<Text style={Styles.label1} >
            { Language.Gender }
          </Text>
          <View style={[Styles.input2, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.genderPicker}
              selectedValue={gender}
              onValueChange={(value, pos) => setGender(value)}
            >
              { getGenderItems() }
            </Picker>
          </View>

          
        </View>

     
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

export default SignUp1
