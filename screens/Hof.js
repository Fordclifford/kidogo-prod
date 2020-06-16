import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ScrollView, Text, TouchableOpacity, View,Image,Picker, DatePickerAndroid
} from 'react-native'
import uuid from 'uuid'
import { Audio } from 'expo-av'
import { Icon } from 'react-native-elements';
import { Styles, Colors, Size } from '../constants/Style';

import Spacer from '../components/Spacer';
import Message from '../components/Message';
import GuardianEntry from '../components/GuardianEntry';
import { SET_NEW_GUARDIAN, Relation,RelationStrings } from '../constants/Enrollment';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import { SET_NEW_HOF } from '../constants/Enrollment';
import TextField from 'react-native-md-textinput';
import { GetShortDate } from '../utilities/dates'
import { FrequencyStrings, Frequency } from '../constants/Finances'
import CurrencyInput from '../components/CurrencyInput'
import { TextInput } from 'react-native-gesture-handler'



const HOFs = (props) => {
  const dispatch = useDispatch()

  const [id, setId] = useState(uuid())
  const [date, setDate] = useState(null)
  const [frequency, setFrequency] = useState('')
  const [amount, setAmount] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [govtId, setGovtId] = useState('')
  const [relation, setRelation] = useState(Relation.Mother)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [soundObject, setSoundObject] = useState(null)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)

  const scrollRef = useRef(null)

  const newAccount = useSelector(state => state.newAccount)

  const getRelationItems = () => {
    return Object.values(Relation).map((relation, i) => {
      return (
        <Picker.Item
          key={i}
          label={RelationStrings[relation]}
          value={relation}
        />
      )
    })
  }
  const onDateSelection = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      })

      if (action === DatePickerAndroid.dateSetAction) {
        setDate(new Date(year, month, day))
      }
    } catch ({ code, message }) {
      console.warn(' Cannot open date picker', message)
    }
  }


  const onSubmitGuardian = () => {
    const guardian = {
      id,
      firstName,
      lastName,
      phone,
      govtId,
      address,
      city,
      relation,
      
    }

    dispatch({ type: SET_NEW_GUARDIAN, id, guardian })
  }

  const onSubmitHof = () => {
    if(firstName==""){
      setError("Firstname Required")
      return false
    }
   else if(lastName==""){
      setError("Lastname Required")
      return false
    }
    else if(phone==""){
      setError("Phone Required")
      return false
    }
    else  if(govtId==""){
      setError("Id number Required")
      return false
    }
    else if(city==""){
      setError("City Required")
      return false
    }
    else if(amount==""){
      setError("Pays Required")
      return false
    }
    else if(frequency==null){
      setError("Frequency Required")
      return false
    }
    else  if(date==null){
      setError("Joined on Required")
      return false
    }
    else  if(amount==''){
      setError("Joined on Required")
      return false
    }
    else{
      const hof = {
        id,
        firstName,
        lastName,
        phone,
        govtId,
        address,
        city,
        relation,
        amount,
        frequency,
        date,
      }
  
      dispatch({ type: SET_NEW_HOF, id, hof})
      return true
    }
   
  }

  const onNextGuardian = () => {
    var hof = onSubmitHof()
    if(hof){
      onSubmitGuardian()
      setError("HOF information submitted")
      props.navigation.navigate('Guardians')
    }
   
  }


  const onAddChildren = async () => {
    var hof = onSubmitHof()
    if(hof){
    onSubmitGuardian()
    clearTimeout(callbackId)
    props.navigation.navigate('Children')
    }
  }


  const resetForm = () => {
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: false })

    setFirstName('')
    setLastName('')
    setPhone('')
    setGovtId('')
    setAddress('')
    setCity('')
    setRelation(Relation.Mother)
  }


  const toggleHelpAudio = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync()

        setSoundObject(null)
      } else {
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../assets/audio/guardians.mp3'))
        await soundObject.playAsync()

        setSoundObject(soundObject)
      }
    } catch (error) {
      setError(error)
    }
  }
  const getFrequencyItems = () => {
    return Object.values(Frequency).map((frequency, i) =>
      <Picker.Item
        key={i} label={FrequencyStrings[frequency]} value={frequency}
      />
    )
  }


  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }
const getTitle=()=>{
  return(
  <View>   <Text style={[Styles.h1, Styles.raleway]} >
  {Language.HOF}
</Text></View>
  )
}

  return (
    <Backdrop>
      <Spacer height={Size.statusbar} />

      <Message text={message} />


      <ScrollView ref={scrollRef} >
      <View>
      <Text style={[Styles.h1, Styles.raleway]} >
        { Language.HOF }
      </Text>

      <Image
        style={Styles.img}
        source={require('../assets/images/guardian.png')}
      />

      <TextField
        style={Styles.textfield}
        label=   { Language.FirstName }
        value={firstName}
        onChangeText={setFirstName}
      />



      <TextField
        style={Styles.textfield}
        value={lastName}
        label=  { Language.LastName }
        onChangeText={setLastName}
      />



      <TextField
        value={address}
        style={Styles.textfield}
        label=  { Language.Location }
        onChangeText={setAddress}
      />

     

      <TextField
        value={city}
        style={Styles.textfield}
        label=  { Language.City }
        onChangeText={setCity}
      />

   
      <TextField
        style={Styles.textfield}
        maxLength={11}
        value={phone}
        keyboardType="number-pad"
        label= { Language.Phone }
        onChangeText={setPhone}
      />
       <TextField
            value={govtId}
            label= { Language.IdentificationNumber }
               onChangeText={setGovtId}
          />

     

      <View style={Styles.rowElements} >
        <View style={Styles.rowElement} >
          <View style={Styles.financePickerContainer} >
            <Picker
              style={Styles.financePicker}
              selectedValue={relation}
              onValueChange={(value, pos) => setRelation(value)}
            >
              <Picker.Item label='Select' value=''></Picker.Item>
              { getRelationItems() }
            </Picker>
          </View>

          <Text style={Styles.label} >
            { Language.Relationship }
          </Text>
        </View>
        <View style={Styles.rowElement} >
        <TouchableOpacity
            onPress={onDateSelection}
          >
            <Text style={Styles.dateInput} >
              { GetShortDate(0, date) }
            </Text>
          </TouchableOpacity>
          <Text style={Styles.label} >
            { Language.JoinedDate }
          </Text>
          </View>
         
      </View> 
      <View style={Styles.rowElements}>
      <View style={Styles.rowElement} >
      <View style={Styles.rowElement} >
      <View style={Styles.rowElements} >
        <Text style={Styles.prefix} >
         KES
        </Text>

        <TextInput
          style={Styles.currencyInput}
          keyboardType="number-pad"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <Text style={Styles.label} >
       {Language.Rate}
      </Text>
    </View>
  
        </View>

        <View style={Styles.rowElement}>
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
            <Picker
              style={Styles.financePicker}
              selectedValue={frequency}
              onValueChange={(value, pos) => setFrequency(value)}
            >
              { getFrequencyItems() }
            </Picker>
          </View>

          <Text style={Styles.label}>
            { Language.Frequency }
          </Text>
        </View>
      </View>

    </View>

  
 
      
        <Spacer large />

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={Styles.mainButton}
            onPress={onNextGuardian}
          >
            <Text style={Styles.buttonText} >
              {Language.Add} {Language.Guardian}
            </Text>
          </TouchableOpacity>
        </View>


        <Spacer medium />
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={Styles.mainButton}
            onPress={onAddChildren}
          >
            <Text style={Styles.buttonText} >
              {Language.Add} {Language.Children}
            </Text>
          </TouchableOpacity>
        </View>



        <Spacer height={Size.keyboard} />
      </ScrollView>

      <TouchableOpacity
        style={Styles.helpButton}
        onPress={toggleHelpAudio}
      >
        <View style={Styles.helpButtonIcon} >
          <Icon name="record-voice-over" color={Colors.helpButton} size={36} />
        </View>
      </TouchableOpacity>
    </Backdrop>
  )
}

export default HOFs
