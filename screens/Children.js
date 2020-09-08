import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'expo-av'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import uuid from 'uuid'
import { Colors, Styles, Size } from '../constants/Style';
import { Icon } from 'react-native-elements';
import Language from '../languages'

import Spacer from '../components/Spacer';
import ChildEntry from '../components/ChildEntry';
import Backdrop from '../components/Backdrop';
import { SET_NEW_CHILD } from '../constants/Enrollment'
import Message from '../components/Message'
import { SubmitAccount } from '../utilities/localstore';


const Children = (props) => {
  const dispatch = useDispatch()

  const [id, setId] = useState(uuid())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')
  const [immunization, setImmunization] = useState('')
  const [note, setNote] = useState('')
  const [soundObject, setSoundObject] = useState(null)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const newAccount = useSelector(state => state.newAccount)

  const scrollRef = useRef(null)

  const onSubmitChild = () => {
 
    if(firstName===""){
      alert("firstName required")
      return
    }
    if(lastName===""){
      alert("lastname required")
      return
    }
 
    if(gender===""){
      alert("gender required")
      return
    }
   

    const child = {
      id:uuid(),
      firstName,
      lastName,
      birthdate,
      gender,
      immunization,
      note,
    }

    dispatch({ type: SET_NEW_CHILD, id:child.id, child })
    setError("Child information submitted")
    resetForm()
  }

 

  const onAddContact = async () => {
   
    clearTimeout(callbackId)
    props.navigation.navigate('Contacts')
  }



  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setBirthdate('')
    setGender('')
    setImmunization(false)
    setNote('')

    scrollRef.current.scrollTo({ x: 0, y: 0, animated: false })
  }


  const toggleHelpAudio = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync()

        setSoundObject(null)
      } else {
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../assets/audio/children.mp3'))
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
        <ChildEntry
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          gender={gender}
          setGender={setGender}
          immunization={immunization}
          setImmunization={setImmunization}
          note={note}
          setNote={setNote}
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
              onPress={onSubmitChild}
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
              onPress={onAddContact}
            >
              <Text style={Styles.buttonText} >
                {Language.Next }
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

export default Children
