import React, {useState} from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import { Styles, Colors } from '../constants/Style';
import { FinanceTypeIcons, FinanceTypeNames } from '../constants/Finances';
import Language from '../languages'
import ExpenseModal from '../components/ExpenseModal';
import PaymentModal from '../components/PaymentModal'


const FinanceHistoryRow = (props) => {
  const [paymentsModalVisible, setPaymentsModalVisible] = useState(false)
  const [expensesModalVisible, setExpensesModalVisible] = useState(false)
  const [selectedExpenseId, setSelectedExpenseId] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)

  const onUpdateChild = (id) => {
   
  }

  const onUpdatePayment = (payment) => {
   // console.log(props)
    setSelectedPayment(props.data)
    setPaymentsModalVisible(true)

   
  }
  const onUpdateExpense = (expense) => {
    setSelectedExpenseId(props)
    setExpensesModalVisible(true)
  }


 if(props.transaction=="income" ){
  return (
    <View >
      <View style={Styles.paymentRow} >
        <Text style={Styles.tableRow} >
          { props.date }
        </Text>

        <Icon
          size={30}
          iconStyle={Styles.financeIcon}
          type="font-awesome"
          color={Colors.mainText}
          name={FinanceTypeIcons[props.type]}
        />

        <Text style={Styles.tableRow} >
          { FinanceTypeNames[props.type] }
        </Text>

        <Text style={Styles.tableRow} >
          { props.amount }
        </Text>
        <TouchableOpacity
         onPress={onUpdatePayment}
        >
        <View >
        <Icon
          size={20}
          iconStyle={Styles.financeIcon}
          type="font-awesome"
          color="white"
          name="edit"         
        />
              </View>
         </TouchableOpacity>
       
      </View>

      <View style={Styles.divider} />
      
      <PaymentModal
       id={selectedPayment}
        visible={paymentsModalVisible}
        setVisible={setPaymentsModalVisible}
      />
    </View>
  )

 }
 

  return (
    <View>
      <View style={Styles.financeRow} >
        <Text style={Styles.tableRow} >
          { props.date }
        </Text>

        <Icon
          size={30}
          iconStyle={Styles.financeIcon}
          type="font-awesome"
          color={Colors.mainText}
          name={FinanceTypeIcons[props.type]}
        />

        <Text style={Styles.tableRow} >
          { FinanceTypeNames[props.type] }
        </Text>

        <Text style={Styles.tableRow} >
          { props.amount }
        </Text>
        <TouchableOpacity
          onPress={onUpdateExpense}
        >
        <View >
        <Icon
          size={20}
          iconStyle={Styles.financeIcon}
          type="font-awesome"
          color="white"
          name="edit"    
         // onPress={ setPaymentsModalVisible(true)}     
        />
              </View>
         </TouchableOpacity>
      </View>

      <View style={Styles.divider} />
      
   

      <ExpenseModal
       id={selectedExpenseId}
        visible={expensesModalVisible}
        setVisible={setExpensesModalVisible }
      />
    </View>
  )
}

export default FinanceHistoryRow

