import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../constants/Style';
import { ImageBackground ,View} from 'react-native'



const Backdrop = (props) => {
  return (
   
 
    <LinearGradient
      style={{ flex: 1}}
      colors={[Colors.gradient_dark, Colors.gradient_light]}
    >
      <View  style={{ flex: 1}}>
      <ImageBackground
            style={{ flex: 1}}
            source={require('../assets/images/back.png')}
          >
     
      { props.children }
      </ImageBackground>
      </View>
    </LinearGradient>

  )
}

export default Backdrop
