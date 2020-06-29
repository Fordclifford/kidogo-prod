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
  FinanceType, FinanceTypeNames, PaymentType,UPDATE_PAYMENT, PaymentFor,
} from '../constants/Finances'
import { Update, Get, InitPayments, InitFinances, GetPayments } from '../utilities/localstore'
import { PAYMENTS, FINANCES, ACCOUNTS } from '../constants/Store'
import { GetShortDate } from '../utilities/dates'
import uuid from 'uuid'
import moment from 'moment'
import { UPDATE_ACCOUNT } from '../constants/Accounts'
import Swal from 'sweetalert2'


const PaymentModal = (props) => {
  const dispatch = useDispatch()
  const accounts = useSelector(state => state.accounts)
  const guardians = useSelector(state => state.guardians)

  const [accountId, setAccountId] = useState('')
  const [date, setDate] = useState(null)
  const [type, setType] = useState('')
  const [paymentFor, setPaymentFor] = useState('')
  const [amount, setAmount] = useState('')
  const [payments, setPayments] = useState('')

  
  useEffect(() => {
   
    if (props.id) {   
    //  console.log(accounts[props.id.accountId].balance)
   
      setDate(moment(props.id.date, "DD-MM-YYYY"))
      setType(props.id.type)
      setAmount(props.id.amount)
      setAccountId(props.id.accountId)
      setPaymentFor(props.id.paymentFor)
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

  const getPaymentForItems = () => {
    return Object.values(PaymentFor).map((type, i) =>
      <Picker.Item key={i} label={FinanceTypeNames[type]} value={type} />
    )
  }

  const getPayments = async () => {

    //  setLoading(true)

    return GetPayments()
      .then((json) => {
        setPayments(json)
        console.log(payments)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }
  const getFamilyItems = () => {
    return Object.entries(accounts).map(([id, account]) =>
      <Picker.Item
        key={id}
        label={guardians[account.guardians[0]].firstName +" "+ guardians[account.guardians[0]].lastName}
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

if(paymentFor==''){
  alert("Payment for Required")
  return
}



    if (props.id) {
      let payData=props.id
      let id=payData.id;    
 
     let amt=payData.amount.replace('-','')
    
      
      //console.log(expense);return;
      let shortDate = GetShortDate(0, date)
       let pay = { type, amount,accountId,date:shortDate,paymentFor }
       let up = { type, amount,accountId,paymentFor }
       let u = { [props.id.id]: up }

       await InitPayments(dispatch, shortDate)
       await InitFinances(dispatch, shortDate)
 
        // alert(props.id.date);return;
        dispatch({ type: UPDATE_PAYMENT, id, update: pay })
        await Update(PAYMENTS, shortDate, u)

        
 
      let finances = await Get(FINANCES)
      let payAmount =  parseFloat(amount) -  parseFloat(amt)
      let financesUpdate = {
        income: parseFloat(finances[shortDate].income) + payAmount
      } 

      dispatch({ type: UPDATE_INCOME, id: shortDate, amount: payAmount })
      await Update(FINANCES, shortDate, financesUpdate)
  
      props.setVisible(false)
      delete props.id;
     
    await getBalance()
      
      return;
 
   
     } 
 
    let shortDate = GetShortDate(0, date)
    let payment = { accountId, type, amount,paymentFor }
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

    await getBalance()

    props.setVisible(false)
    delete props.id;
  }

  const getBalance=async()=>{

    let start= moment().format("YYYY-MM-DD")
    
    let end = moment(accounts[accountId].joinedon).format("YYYY-MM-DD")
   
   
    var paid=0.00;

    let pay=await getPayments()

    for (const [date, paymentsData] of Object.entries(pay)) {

      for (const [paymentId, pdata] of Object.entries(paymentsData)) {
       
        let acc = pdata.accountId
        if (acc === accountId) {
           paid +=  parseFloat(pdata.amount)
                            
        }

      }
    }
    console.log(paid)
   
if(accounts[accountId].frequency=='daily'){
  var diff =  Math.floor(( Date.parse(start) - Date.parse(end) ) / 86400000); 
let pending=parseFloat(accounts[accountId].rate)*parseFloat(diff)
let bal=pending-parseFloat(paid)
console.log(pending)
if(bal<0){
  accounts[accountId].balance=0
}else{
  accounts[accountId].balance=bal
}
console.log(bal)

}else if(accounts[accountId].frequency=='weekly'){
console.log("weekly")
var diff =  Math.floor(( Date.parse(start) - Date.parse(end) ) / (86400000*7)); 
if(diff==0){
  diff=1
}
let pending=parseFloat(accounts[accountId].rate)*parseFloat(diff)
let bal=pending-parseFloat(paid)
console.log(diff)
if(bal<0){
  accounts[accountId].balance=0
}else{
  accounts[accountId].balance=bal
}
console.log(bal)
}
else if(accounts[accountId].frequency=='termly'){
console.log("termly")
var diff =  Math.floor(( Date.parse(start) - Date.parse(end) ) / (86400000*7*4*3)); 
if(diff==0){
  diff=1
}
let pending=parseFloat(accounts[accountId].rate)*parseFloat(diff)
let bal=pending-parseFloat(paid)
console.log(diff)
if(bal<0){
  accounts[accountId].balance=0
}else{
  accounts[accountId].balance=bal
}
}
let id=accountId
let data=accounts[accountId]
data.paid=paid
dispatch({ type: UPDATE_ACCOUNT, id, update: data })
await Update(ACCOUNTS, id, data)
// Swal.fire({  title: 'Error!',  text: 'Do you want to continue',  icon: 'error',  confirmButtonText: 'Cool'})


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
              <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
                <Picker
                    style={Styles.financePicker}
                  selectedValue={paymentFor}
                  onValueChange={(value, pos) => setPaymentFor(value)}
                >
                   <Picker.Item label='Select' value=''></Picker.Item>
                  { getPaymentForItems() }
                </Picker>
              </View>

              <Text style={Styles.label} >
                { Language.PaymentFor}
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

