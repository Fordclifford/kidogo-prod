import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
import Language from '../languages'
import { GetShortDate, NextDay, GetDateRange } from '../utilities/dates';
import { ATTENDANCE, CHILDREN } from '../constants/Store';
import {
  Image, ImageBackground,
  TouchableHighlight,
  Text, View
} from 'react-native'
import { Icon } from 'react-native-elements';
import { GetShortDateRange } from '../utilities/dates';
import Backdrop from '../components/Backdrop';
import AttendanceHistoryHeader from '../components/AttendanceHistoryHeader';
import AttendanceHistoryRow from '../components/AttendanceHistoryRow';
import { Size, Styles } from '../constants/Style';
import Spacer from '../components/Spacer';
import { Day } from '../constants/Attendance';
import { TouchableOpacity } from 'react-native-gesture-handler';


const FinanceSummary = (props) => {
  const dispatch = useDispatch()

  const finances = useSelector(state => state.finances)

  const [weekFinances, setWeekFinances] = useState()
  const [finance, setFinance] = useState()
  const [dayFinances, setDayFinances] = useState()
  const [monthFinances, setMonthFinances] = useState()


  useEffect(() => {
    setWeekFinances(getWeekFinances())
    setFinance(getDayFinances)
    setDayFinances(getDayFinances())
    setMonthFinances(getMonthFinances())
  }, [finances])


  const getFinances = (period) => {

    if(period=="day"){
      console.log(dayFinances)
      setFinance(dayFinances)
   
  }
  if(period=="week"){
    console.log(weekFinances)
    setFinance(weekFinances)
  }
  if(period=="month"){
    console.log(monthFinances)
    setFinance(monthFinances)
  }
  }

  const getWeekFinances = () => {
    return GetShortDateRange(0, 7).reduce((res, date) => {
      if (date in finances) {
        res.income += finances[date].income
        res.expenses += finances[date].expenses
      }
     // console.log(res)
      return res
    }, { income: 0, expenses: 0 })
    
  
  }

  const getMonthFinances = () => {
    return GetShortDateRange(0, 30).reduce((res, date) => {
      if (date in finances) {
        res.income += finances[date].income
        res.expenses += finances[date].expenses
      }

      return res
    }, { income: 0, expenses: 0 })
  }

  const getDayFinances = () => {
    return GetShortDateRange(0, 1).reduce((res, date) => {
      if (date in finances) {
        res.income += finances[date].income
        res.expenses += finances[date].expenses
      }

      return res
    }, { income: 0, expenses: 0 })
  }



  const getFinanceSummary = () => {
    return (
      `${Language.WeekTotal}: ${weekFinances.income - weekFinances.expenses}`
    )
  }


  if (!finance) {
    return null
  }


  return (
    <Backdrop>
      <Spacer height={Size.statusbar} />

      <Text style={[Styles.h1, Styles.raleway]}>
        {Language.FinanceSummary}
      </Text>
      <Spacer small />
      <View style={Styles.rowElements}>

      <View style={Styles.rowElement}>
        <TouchableOpacity onPress={() =>getFinances("day")} style={Styles.daily}>

          <Text style={Styles.buttonText}>Today</Text>
        </TouchableOpacity>

        </View>
        <View style={Styles.rowElement}>
        <TouchableOpacity  onPress={() =>getFinances("week")}  style={Styles.weekly}>

          <Text style={Styles.buttonText}>Weekly</Text>
        </TouchableOpacity>
        </View>
        <View style={Styles.rowElement}>
        <TouchableOpacity  onPress={() =>getFinances("month")}  style={Styles.monthly}>

          <Text style={Styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView>

       <View style={Styles.actionsContainer} >
       <View style={Styles.financeSummaryHeader} >
       <TouchableOpacity
            activeOpacity={0.8}
            // style={Styles.actionButton}
           
          >
            <ImageBackground
              style={Styles.buttonImage1}
              source={require('../assets/images/income.png')}
            >
            
          <View style={{margin:10}}>
          
          <Text style={{fontSize:20, fontWeight: 'bold',color:'green'}} >{Language.Total + " " +Language.Income}</Text>
        
                  </View>
                  <View style={{marginLeft:10}}>
             <Text style={[Styles.financeSummaryDisplay, { color: 'green' }]} >
           KES  {finance.income}
             
          </Text>
          </View>
            </ImageBackground>
          </TouchableOpacity>
          </View>
              
        <View style={Styles.financeSummaryHeader} >
       <TouchableOpacity
            activeOpacity={0.8}
            // style={Styles.actionButton}
           
          >
            <ImageBackground
              style={Styles.buttonImage1}
              source={require('../assets/images/expenses.png')}
            >
            
          <View style={{margin:10}}>
          
          <Text style={{fontSize:20, fontWeight: 'bold',color:'red'}} >{Language.Total + " " +Language.Expense}</Text>
        
                  </View>
                  <View style={{marginLeft:10}}>
             <Text style={[Styles.financeSummaryDisplay, { color: 'red' }]} >
           KES  {finance.expenses}
             
          </Text>
          </View>
            </ImageBackground>
          </TouchableOpacity>
          </View>
          <View style={Styles.financeSummaryHeader} >
       <TouchableOpacity
            activeOpacity={0.8}
            // style={Styles.actionButton}
           
          >
            <ImageBackground
              style={Styles.buttonImage1}
              source={require('../assets/images/balance.png')}
            >
            
          <View style={{margin:10}}>
          
         <Text style={{fontSize:15, fontWeight: 'bold',color:'blue'}} >{Language.Total+ " "}  {finance.income - finance.expenses>0 ? Language.Profit:Language.Loss}</Text>
  
                  </View>
                  <View style={{marginLeft:10}}>
             <Text style={[Styles.financeSummaryDisplay, { color: 'blue' }]} >
           KES  {finance.income - finance.expenses}
             
          </Text>
          </View>
            </ImageBackground>
          </TouchableOpacity>
          </View>
       
        </View>
       </ScrollView>
    

    </Backdrop>
  )
}

export default FinanceSummary
