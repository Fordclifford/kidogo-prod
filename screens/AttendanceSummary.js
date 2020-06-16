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


const AttendanceSummary = (props) => {
  const dispatch = useDispatch()

  const children = useSelector(state => state.children)
  const attendances = useSelector(state => state.attendance)

  const [weekAttendances, setWeekAttendances] = useState()
  const [attendance, setAttendance] = useState()
  const [dayAttendances, setDayAttendances] = useState()
  const [monthAttendances, setMonthAttendances] = useState()


  useEffect(() => {
    setWeekAttendances(getWeekAttendances())
    setAttendance(getDayAttendances)
    setDayAttendances(getDayAttendances())
    setMonthAttendances(getMonthAttendances())
  }, [attendances])


  const getAttendances = (period) => {

    if(period=="day"){
    //  getDayAttendances()
      setAttendance(dayAttendances)
   
  }
  if(period=="week"){
  // getWeekAttendances()
    setAttendance(weekAttendances)
  }
  if(period=="month"){
    console.log(monthAttendances)
    setAttendance(monthAttendances)
  }
  }

  const getWeekAttendances = () => {
    return GetShortDateRange(0, 7).reduce((res, date) => {
      if (date in attendances) {

      


  for (const [childId, adata] of Object.entries(attendances[date])) {

   

    if(adata.checkIn ){
      if( adata.checkOut===true ){
     
    

    const gender = children[childId].gender
    if(gender == 'F'){
res.female +=1;
    }
    if(gender == 'M'){
      res.male +=1;
    }
    }
  }

}

      }
     // console.log(res)
      return res
    }, { male: 0, female: 0 })
    
  
  }

  const getMonthAttendances = () => {
    return GetShortDateRange(0, 30).reduce((res, date) => {
      if (date in attendances) {
     

  for (const [childId, adata] of Object.entries(attendances[date])) {

   

    if(adata.checkIn ){
      if( adata.checkOut===true ){
     
    

    const gender = children[childId].gender
    if(gender == 'F'){
res.female +=1;
    }
    if(gender == 'M'){
      res.male +=1;
    }
    }
  }
  

}

      }

      return res
    }, { male: 0, female: 0 })
  }

  const getDayAttendances = () => {
    return GetShortDateRange(0, 1).reduce((res, date) => {
      if (date in attendances) {




        for (const [childId, adata] of Object.entries(attendances[date])) {

   

          if(adata.checkIn ){
            if( adata.checkOut===true ){
           
          
      
          const gender = children[childId].gender
          if(gender == 'F'){
      res.female +=1;
          }
          if(gender == 'M'){
            res.male +=1;
          }
          }
        
            
}
}



        // res.male += attendances[date].male
        // res.female += attendances[date].female
      }

      return res
    }, { male: 0, female: 0 })
  }



 


  if (!attendance) {
    return null
  }


  return (
    <Backdrop>
      <Spacer height={Size.statusbar} />

      <Text style={[Styles.h2, Styles.raleway,Styles.aligning]}>
        {Language.AttendanceSummary}
      </Text>
      <Spacer small />
      <View style={Styles.rowElements}>

      <View style={Styles.rowElement}>
        <TouchableOpacity onPress={() =>getAttendances("day")} style={Styles.daily}>

          <Text style={Styles.buttonText}>Today</Text>
        </TouchableOpacity>

        </View>
        <View style={Styles.rowElement}>
        <TouchableOpacity  onPress={() =>getAttendances("week")}  style={Styles.weekly}>

          <Text style={Styles.buttonText}>Weekly</Text>
        </TouchableOpacity>
        </View>
        <View style={Styles.rowElement}>
        <TouchableOpacity  onPress={() =>getAttendances("month")}  style={Styles.monthly}>

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
              source={require('../assets/images/boy.png')}
            >
            
          <View style={{margin:20}}>
          
          <Text style={{fontSize:20, fontWeight: 'bold',color:'green'}} >{Language.Total + " " +Language.Male}</Text>
        
                  </View>
                  <View style={{marginLeft:40}}>
             <Text style={[Styles.financeSummaryDisplay, { color: 'green' }]} >
             {attendance.male}
             
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
              source={require('../assets/images/girl.png')}
            >
            
          <View style={{margin:20}}>
          
          <Text style={{fontSize:20, fontWeight: 'bold',color:'green'}} >{Language.Total + " " +Language.Female}</Text>
        
                  </View>
                  <View style={{marginLeft:40}}>
             <Text style={[Styles.financeSummaryDisplay, { color: 'red' }]} >
             {attendance.female}
             
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
              source={require('../assets/images/boyngirl.png')}
            >
            
          <View style={{margin:20}}>
          
          <Text style={{fontSize:20, fontWeight: 'bold',color:'green'}} >{Language.Total }</Text>
        
                  </View>
                  <View style={{marginLeft:40}}>
             <Text style={[Styles.financeSummaryDisplay, { color: 'blue' }]} >
             {attendance.male+attendance.female}
             
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

export default AttendanceSummary
