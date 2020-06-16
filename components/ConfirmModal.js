import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DatePickerAndroid, Modal, Picker, ScrollView, Text,
  TextInput, View, TouchableOpacity, ProgressViewIOSComponent,
} from 'react-native'
import Language from '../languages'
import { Styles, Size } from '../constants/Style'
import Backdrop from './Backdrop'
import Spacer from './Spacer'


const ConfirmModal = (props) => {

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => { }}
    >
     
      <View style={Styles.questionHolder} >
           {Language.ConfirmUpload}
          </View>

          <Spacer medium />

          <View style={Styles.rowElements} >
            <TouchableOpacity
              style={Styles.rowButton}
              onPress={() => props.upload}
            >
              <Text style={Styles.buttonText} >
                {Language.Yes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.rowButton}
              onPress={() => props.setVisible(false)}
            >
              <Text style={Styles.buttonText} >
                {Language.No}
              </Text>
            </TouchableOpacity>
          </View>
    
    </Modal>
  )
}

export default ConfirmModal

