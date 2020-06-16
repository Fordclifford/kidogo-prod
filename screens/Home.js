import React, { useState, useEffect } from 'react';
import {
  Image, View, Text, TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'
import { Colors, Styles } from '../constants/Style';
import { SignedIn } from '../utilities/auth';
import Language from '../languages'
import Spacer from '../components/Spacer'
import Message from '../components/Message';
import Backdrop from '../components/Backdrop';


const Home = (props) => {
  const [soundObject, setSoundObject] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    checkActiveCaregiver()
  }, [])


  const checkActiveCaregiver = async () => {
    if (await SignedIn()) {
      props.navigation.navigate('Dash')
    }
  }


  const toggleHelpAudio = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync()

        setSoundObject(null)
      } else {
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../assets/audio/signin.mp3'))
        await soundObject.playAsync()

        setSoundObject(soundObject)
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Backdrop>
      <Message text={message} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Spacer height={200} />
        <Image
          style={Styles.homeTitle}
          source={require('../assets/images/ic.png')}
        />

        <Spacer height={50} />

        <TouchableOpacity
          style={Styles.mainButton}
          onPress={() => props.navigation.navigate('SignUp')}
        >
          <Text style={Styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Spacer medium />

        <TouchableOpacity
          style={Styles.mainButton}
          onPress={() => props.navigation.navigate('SignIn')}
        >
          <Text style={Styles.buttonText}>{Language.SignIn}</Text>
        </TouchableOpacity>
      </View>

    </Backdrop>
  );
}

export default Home
