import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Styles } from '../constants/Style'
import {GetHofs} from '../utilities/localstore'
import { GetShortDateRange, GetShortDate } from '../utilities/dates'
import moment from 'moment'


const AccountCard = (props) => {
  const children = useSelector(state => state.children)
  const guardians = useSelector(state => state.guardians)
  const contacts = useSelector(state => state.contacts)
  const guard= useState()

 const getChildNames = () => {
    const childNames = props.account.children.reduce((acc, id) => {
      if (id in children) {
        acc.push(children[id].firstName + ' ' + children[id].lastName)
      }
     // console.log(acc)
      return acc
    }, [])

    return childNames.join(', ')
  }


  const getGuardianNames = () => {
    const guardianNames = props.account.guardians.reduce((acc, id) => {
      if (id in guardians) {
        acc.push(guardians[id].firstName + ' ' + guardians[id].lastName)
      }
      return acc
    }, [])

    return guardianNames.join(', ')
  }


  const getAccountName = () => {
    console.log("account")
   
    console.log(props)
    console.log("guardians")
   
    if(guardians[props.account.guardians[0]]){
      return guardians[props.account.guardians[0]].firstName+" " +guardians[props.account.guardians[0]].lastName

    }else{
      return null
    }

     }


  const onSelect = () => {
    // guard.pop()
    // guard.pop()
    // guard.pop()
    // for (const [id, guards] of Object.entries(guardians)) {
    //   if (props.id === guards.accountId) {
    //     guards.id=id
    //     guard.push(guards)
    //   }
    // }
    // console.log(guard)
  

    const guard = props.account.guardians.reduce((acc, id) => {
      if (id in guardians) {
        guardians[id].id=id
        acc.push(guardians[id])
      }
      return acc
    }, [])

    const child = props.account.children.reduce((acc, id) => {
      if (id in children) {
        children[id].id=id
        acc.push(children[id])
      }
      return acc
    }, [])

    const conta = props.account.contacts.reduce((acc, id) => {
      if (id in contacts) {
        contacts[id].id=id
        acc.push(contacts[id])
      }
      return acc
    }, [])
   
    // console.log(conta)
    // console.log(guard)
    // console.log(child)
    // console.log(props.account)
    props.navigate('Account', { accountId: props.id,account:props.account,child,conta,guard })
  }


  return (
    <TouchableOpacity
      style={Styles.accountCard}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text style={[Styles.h3, Styles.raleway]} >
        { getAccountName() }
      </Text>

      <Text style={Styles.balance} >
       Balance: KES { props.account.balance }
      </Text>
      <Text style={Styles.balance} >
       Paid: KES { props.account.paid }
      </Text>

      <View style={Styles.members} >
        <Text style={Styles.childNames} >
          { getChildNames() }
        </Text>

        <Text style={Styles.guardianNames} >
          { getGuardianNames() }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default AccountCard
