import React from 'react'
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import { Styles, Size } from '../constants/Style';

import Backdrop from '../components/Backdrop';
import Spacer from '../components/Spacer';

const FinanceOptions = (props) => {
  return (
    <Backdrop>
      <Spacer height={Size.statusbar} />

      <View style={Styles.actionsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.actionButton}
          onPress={() => props.navigation.navigate('Finances')}
        >
          <ImageBackground
            style={Styles.buttonImage}
            source={require('../assets/images/finances.png')}
          >
            <Text style={[Styles.actionText, Styles.raleway]}>
              Manage
            </Text>
          </ImageBackground>
        </TouchableOpacity>

       <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.actionButton}
          onPress={() => props.navigation.navigate('FinanceSummary')}
        >
          <ImageBackground
            style={Styles.buttonImage}
            source={require('../assets/images/history.png')}
          >
            <Text style={[Styles.actionText, Styles.raleway]}>Finances Summary</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </Backdrop>
  )
}

export default FinanceOptions
