import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
import { Get } from '../utilities/localstore';
import { GetShortDate, NextDay, GetDateRange } from '../utilities/dates';
import { ATTENDANCE, CHILDREN } from '../constants/Store';

import Backdrop from '../components/Backdrop';
import AttendanceHistoryHeader from '../components/AttendanceHistoryHeader';
import AttendanceHistoryRow from '../components/AttendanceHistoryRow';
import { Size } from '../constants/Style';
import Spacer from '../components/Spacer';
import { Day } from '../constants/Attendance';


const AttendanceHistory = (props) => {
  const dispatch = useDispatch()
  const children = useSelector(state => state.children)
  const attendance = useSelector(state => state.attendance)

  const [offset, setOffset] = useState(0)
  const [dateRange, setDateRange] = useState([])


  useEffect(() => {
    setDateRange(getDateRange())
  }, [offset])


  const shiftDateRange = (shift) => {
    setOffset(offset + shift)
  }


  const getDateRange = () => {
    const targetSunday = NextDay(Day.SUNDAY, offset)
    return [-6, -5, -4, -3, -2, -1, 0].map((i) => GetShortDate(i, targetSunday))
  }


  const getChildAttendance = (id) => {
    return dateRange.map((date) => {
     // console.log(date+"date")
     
    //   var arr = json2array(attendance)
    //  // console.log(arr)
    //   function json2array(json){
    //     var result = [];
    //     var keys = Object.keys(json);
    //     keys.forEach(function(key){
    //         result.push(json[key]);
    //     });
    //     return result;
    // }
  //  console.log(attendance["18-05-2020"][id])

     
      if (date in attendance) {
       // console.log(date)
      //  console.log(attendance[date][id].checkIn)

        return attendance[date][id].checkIn && attendance[date][id].checkOut
      } else {
        return false
      }
    })
  }


  const getAttendanceRowComponents = () => {
    const attendanceRowData = Object.entries(children).map(([id, child]) => {
      console.log( getChildAttendance(id))
      return {
        id,
        firstName: child.firstName,
        lastName: child.lastName,
        attendance: getChildAttendance(id),
      }
    })

    attendanceRowData.sort((a, b) =>
      a.lastName + a.firstName > b.lastName + b.firstName
    )

    return attendanceRowData.map((rowData) =>
      <AttendanceHistoryRow
        key={rowData.id}
        childId={rowData.id}
        firstName={rowData.firstName}
        lastName={rowData.lastName}
        attendance={rowData.attendance}
      />
    )
  }


  return (
    <Backdrop>
      <Spacer height={Size.statusbar} />

      <AttendanceHistoryHeader
        dateRange={dateRange}
        shiftDateRange={shiftDateRange}
      />

      <ScrollView>
        { getAttendanceRowComponents() }
      </ScrollView>
    </Backdrop>
  )
}

export default AttendanceHistory
