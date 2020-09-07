import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DatePickerAndroid, Modal, Picker, ScrollView,
  Text, TextInput, View, TouchableOpacity,
} from 'react-native'
import Language from '../languages'
import { Styles, Size } from '../constants/Style'
import Backdrop from './Backdrop'
import Spacer from './Spacer'
import {
  ADD_EXPENSE, UPDATE_EXPENSES,UPDATE_EXPENSE, FinanceType, FinanceTypeNames, ExpenseType
} from '../constants/Finances'
import { Get, Update, InitExpenses, InitFinances } from '../utilities/localstore';
import { FINANCES, EXPENSES, PAYMENTS } from '../constants/Store';
import { GetShortDate } from '../utilities/dates'
import uuid from 'uuid'
import moment from 'moment'


const ExpenseModal = (props) => {
  const expenses = useSelector(state => state.expenses)
  
  const dispatch = useDispatch()
 
   const [date, setDate] = useState(null)
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  //console.log(expenses)

   useEffect(() => {
   
    if (props.id) {
    
      setDate(moment(props.id.date, "DD-MM-YYYY"))
      setType(props.id.type)
      setAmount(props.id.amount.replace('-',''))
     }else{
      setDate(null)
      setType('')
      setAmount('')
     }
  }, [props.id])



  const getExpenseTypeItems = () => {
    return Object.values(ExpenseType).map((type, i) =>
      <Picker.Item key={i} label={FinanceTypeNames[type]} value={type} />
    )
  }


  const onSubmitExpense = async () => {
    
  
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
     let expData=props.id
     let id=expData.id;    

    let amt=expData.amount.replace('-','')
   
     
     //console.log(expense);return;
     let shortDate = GetShortDate(0, date)
      let expense = { type, amount,date:shortDate }
      let up = { type, amount }
      let u = { [props.id.id]: up }

     await InitExpenses(dispatch, shortDate)
     await InitFinances(dispatch, shortDate)

       // alert(props.id.date);return;
       dispatch({ type: UPDATE_EXPENSE, id, update: expense })
       await Update(EXPENSES, shortDate, u)

     let finances = await Get(FINANCES)
     let expenseAmount =  parseFloat(amount) -  parseFloat(amt)
     let financesUpdate = {
       expenses: parseFloat(finances[shortDate].expenses) + expenseAmount
     }
 
     dispatch({ type: UPDATE_EXPENSES, id: shortDate, amount: expenseAmount })
     await Update(FINANCES, shortDate, financesUpdate)
 
     props.setVisible(false)
     return;

  
    } 
    const shortDate = GetShortDate(0, date)
    const expense = { type, amount }
    const update = { [uuid()]: expense }

    await InitExpenses(dispatch, shortDate)
    await InitFinances(dispatch, shortDate)

    dispatch({ type: ADD_EXPENSE, id: shortDate, expense: update })
    await Update(EXPENSES, shortDate, update)

    const finances = await Get(FINANCES)
    const expenseAmount = parseFloat(expense.amount)
    const financesUpdate = {
      expenses: parseFloat(finances[shortDate].expenses) + expenseAmount
    }

    dispatch({ type: UPDATE_EXPENSES, id: shortDate, amount: expenseAmount })
    await Update(FINANCES, shortDate, financesUpdate)

    props.setVisible(false)
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
            { Language.Expense }
          </Text>
          <Text style={Styles.label} >
            { Language.Date }
          </Text>
          <TouchableOpacity
            onPress={onDateSelection}
          >
            <Text style={Styles.dateInput} >
              { GetShortDate(0, date) }
            </Text>
          </TouchableOpacity>

         

          <View style={Styles.rowElements} >
          
            <View style={{ flex: .5, marginLeft: 5}} >
            <Text style={Styles.label} >
                { Language.Type}
              </Text>
              <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
                <Picker
                   style={Styles.financePicker}
                  selectedValue={type}
                  onValueChange={(value, pos) => setType(value)}
                >
                  { getExpenseTypeItems() }
                </Picker>
              </View>

            
            </View>

            <View style={Styles.rowElement} >
            <Text style={Styles.label} >
                { Language.Amount }
              </Text>
              <TextInput
                style={Styles.input}
                maxLength={10}
                keyboardType="number-pad"
                value={amount}
                onChangeText={setAmount}
              />

             
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
              onPress={onSubmitExpense}
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

export default ExpenseModal

