import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, Text, View } from 'react-native'
import { Styles, Size } from '../constants/Style';
import Language from '../languages'

import Spacer from './Spacer';
import FinanceHistoryRow from './FinanceHistoryRow';


const FinanceHistory = (props) => {
  const payments = useSelector(state => state.payments)
  const expenses = useSelector(state => state.expenses)


  const getHistoryRowComponents = () => {
    const rowData = []

    for (const [date, expensesData] of Object.entries(expenses)) {
    
    
      for (const [id, data] of Object.entries(expensesData)) {
         rowData.push({
          id,
           date,
           transaction:"expense",
          type: data.type,
          amount: `-${data.amount}`,
        })
      }
    }

    for (const [date, paymentsData] of Object.entries(payments)) {
           for (const [id, dat] of Object.entries(paymentsData)) {
 rowData.push({
          id,
          transaction:"income",
          date,
          accountId:dat.accountId,
          type: dat.type,
          amount: dat.amount,
          paymentFor:dat.paymentFor
        })
      }
    }

    rowData.sort((a, b) => a.date < b.date)

    return rowData.map((data, i) => (
      <FinanceHistoryRow
        key={i}
        data={data}
        date={data.date}
        type={data.type}
        amount={data.amount}
        paymentFor={data.paymentFor}
        id={data.id}
        transaction={data.transaction}
      />
    ))
  }


  if (!payments || !expenses) {
    return null
  }


  return (
    <View style={Styles.financeHistoryContainer} >
      <View style={Styles.tableHeader} >
        <Text style={Styles.tableRow} >
          { Language.Date }
        </Text>

        <Text style={Styles.tableRow} >
          { Language.Type }
        </Text>


        <Text style={Styles.tableRow} >
          { Language.Amount }
        </Text>
        
        <Text style={Styles.tableRow} >
          { Language.PaymentFor }
        </Text>

        <Text style={Styles.tableRow} >
          { Language.Action }
        </Text>
      </View>

      <ScrollView>
        { getHistoryRowComponents() }

        <Spacer height={1.2 * Size.keyboard} />
      </ScrollView>
    </View>
  )
}

export default FinanceHistory
