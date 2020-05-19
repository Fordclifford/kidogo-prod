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
import {
  ADD_PAYMENT, UPDATE_INCOME,
  FinanceType, FinanceTypeNames, PaymentType,UPDATE_PAYMENT,
} from '../constants/Finances'
import { Update, Get, InitPayments, InitFinances } from '../utilities/localstore'
import { PAYMENTS, FINANCES } from '../constants/Store'
import { GetShortDate } from '../utilities/dates'
import uuid from 'uuid'
import moment from 'moment'


const PaymentModal = (props) => {
  const dispatch = useDispatch()
  const accounts = useSelector(state => state.accounts)
  const guardians = useSelector(state => state.guardians)

  const [accountId, setAccountId] = useState('')
  const [date, setDate] = useState(null)
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')

  
  useEffect(() => {
   
    if (props.id) {   
    
      setDate(moment(props.id.date, "DD-MM-YYYY"))
      setType(props.id.type)
      setAmount(props.id.amount)
      setAccountId(props.id.accountId)
     }else{
      setDate(null)
      setType('')
      setAmount('')
      setAccountId('')
     }
  }, [props.id])


  const getPaymentTypeItems = () => {
    return Object.values(PaymentType).map((type, i) =>
      <Picker.Item key={i} label={FinanceTypeNames[type]} value={type} />
    )
  }


  const getFamilyItems = () => {
    return Object.entries(accounts).map(([id, account]) =>
      <Picker.Item
        key={id}
        label={guardians[account.guardians[0]].lastName}
        value={id}
      />
    )
  }


  const onSubmitPayment = async () => {

    if(accountId==''){
      alert("Account Required")
      return
    }
if(date==null){
  alert("Date Required")
  return
}
  if(type==''){
    alert("Payment Type Required")
    return
  }

if(amount==''){
  alert("Amount Required")
  return
}


    if (props.id) {
      let payData=props.id
      let id=payData.id;    
 
     let amt=payData.amount.replace('-','')
    
      
      //console.log(expense);return;
      let shortDate = GetShortDate(0, date)
       let pay = { type, amount,accountId,date:shortDate }
       let up = { type, amount,accountId }
       let u = { [props.id.id]: up }

       await InitPayments(dispatch, shortDate)
       await InitFinances(dispatch, shortDate)
 
        // alert(props.id.date);return;
        dispatch({ type: UPDATE_PAYMENT, id, update: pay })
        await Update(PAYMENTS, shortDate, u)

        
 
      let finances = await Get(FINANCES)
      let payAmount =  parseFloat(amount) -  parseFloat(amt)
      let financesUpdate = {
        expenses: parseFloat(finances[shortDate].income) + payAmount
      }
  
      dispatch({ type: UPDATE_INCOME, id: shortDate, amount: payAmount })
      await Update(FINANCES, shortDate, financesUpdate)
  
      props.setVisible(false)
      delete props.id;
      
      return;
 
   
     } 
 
    let shortDate = GetShortDate(0, date)
    let payment = { accountId, type, amount }
    let um = { [uuid()]: payment }

    await InitPayments(dispatch, shortDate)
    await InitFinances(dispatch, shortDate)

    dispatch({ type: ADD_PAYMENT, id: shortDate, payment: um })
    await Update(PAYMENTS, shortDate, um)

    let finances = await Get(FINANCES)
    let paymentAmount = parseFloat(payment.amount)
    let financesUpdate = {
      income: parseFloat(finances[shortDate].income) + paymentAmount
    }

    dispatch({ type: UPDATE_INCOME, id: shortDate, amount: paymentAmount })
    await Update(FINANCES, shortDate, financesUpdate)

    props.setVisible(false)
    delete props.id;
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


  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => { }}
    >
      <Backdrop>
        <ScrollView>
          <Text style={[Styles.h1, Styles.raleway]} >
            { Language.Payment }
          </Text>

          <View style={Styles.rowElements} >
            <View style={Styles.rowElement} >
              <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
                <Picker
                    style={Styles.financePicker}
                  selectedValue={accountId}
                  onValueChange={(value, pos) => setAccountId(value)}
                >
                  <Picker.Item label='Select' value=''></Picker.Item>
                  { getFamilyItems() }
                </Picker>
              </View>

              <Text style={Styles.label} >
                { Language.Family }
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
                { Language.Date }
              </Text>
            </View>
          </View>

          <View style={Styles.rowElements} >
            <View style={Styles.rowElement} >
              <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
                <Picker
                    style={Styles.financePicker}
                  selectedValue={type}
                  onValueChange={(value, pos) => setType(value)}
                >
                   <Picker.Item label='Select' value=''></Picker.Item>
                  { getPaymentTypeItems() }
                </Picker>
              </View>

              <Text style={Styles.label} >
                { Language.Type}
              </Text>
            </View>

            <View style={Styles.rowElement} >
              <TextInput
                style={Styles.input}
                maxLength={10}
                keyboardType="number-pad"
                value={amount}
                onChangeText={setAmount}
              />

              <Text style={Styles.label} >
                { Language.Amount }
              </Text>
            </View>
          </View>

          <Spacer medium />

          <View style={Styles.rowElements} >
            <TouchableOpacity
              style={Styles.rowButton}
              onPress={() => props.setVisible(false)}
            >
              <Text style={Styles.buttonText} >
                { Language.Cancel }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.rowButton}
              onPress={onSubmitPayment}
            >
              <Text style={Styles.buttonText} >
                { Language.Confirm }
              </Text>
            </TouchableOpacity>
          </View>

          <Spacer height={Size.keyboard} />
        </ScrollView>
      </Backdrop>
    </Modal>
  )
}

export default PaymentModal

