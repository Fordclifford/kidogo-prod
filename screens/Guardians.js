import React, { useRef, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {
  ScrollView, Text, TouchableOpacity, View
} from 'react-native'
import uuid from 'uuid'
import { Audio } from 'expo-av'
import { Icon } from 'react-native-elements';
import { Styles, Colors, Size } from '../constants/Style';

import Spacer from '../components/Spacer';
import Message from '../components/Message';
import GuardianEntry from '../components/GuardianEntry';
import { SET_NEW_GUARDIAN, Relation } from '../constants/Enrollment';
import Backdrop from '../components/Backdrop';
import Language from '../languages'



const Guardians = (props) => {
  const dispatch = useDispatch()

  const [id, setId] = useState(uuid())
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



  const onSubmitGuardian = () => {
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
    if(address==""){
      setError("Location Required")
      return false
    }else{
   
   
  
 

    const guardian = {
      id:uuid(),
      firstName,
      lastName,
      phone,
      govtId,
      address,
      city,
      relation,
    }

    dispatch({ type: SET_NEW_GUARDIAN, id:guardian.id, guardian })
    setError("Parent added successfuly")
    resetForm()
  }
  }


  const onAddChildren = async () => {
   
    clearTimeout(callbackId)
    props.navigation.navigate('Children')
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
    } catch(error) {
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

      

      <ScrollView ref={scrollRef} >
   

        <GuardianEntry
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          govtId={govtId}
          setGovtId={setGovtId}
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          relation={relation}
          setRelation={setRelation}
        />

        <Spacer medium />
    <View style={Styles.rowElements} >
            <TouchableOpacity
              style={Styles.rowButton}
              onPress={resetForm}
            >
              <Text style={Styles.buttonText} >
                { Language.Cancel }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.rowButton}
              onPress={onSubmitGuardian}
            >
              <Text style={Styles.buttonText} >
                { Language.Add }
              </Text> 
            </TouchableOpacity>
          </View>
          <Spacer medium />

    
        <View  style={{ alignItems:'center' }}>
        <TouchableOpacity
          style={Styles.mainButton}
          onPress={onAddChildren}
        >
          <Text style={Styles.buttonText} >
            { Language.Next }
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

export default Guardians
