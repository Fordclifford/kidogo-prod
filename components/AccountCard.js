import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Styles } from '../constants/Style'
import {GetHofs} from '../utilities/localstore'
import { GetShortDateRange, GetShortDate } from '../utilities/dates'
import moment from 'moment'


const AccountCard = (props) => {
  const payments = useSelector(state => state.payments)
  useEffect(() => {
 //   setLoading(true)

      GetHofs()
      .then((json) => setHofs(json))
      .catch((error) => console.error(error))
      //.finally(() => setLoading(false));
    

  }, [])
  const children = useSelector(state => state.children)
  const guardians = useSelector(state => state.guardians)
  const [hofs, setHofs] = useState(null)


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
    return guardians[props.account.guardians[0]].firstName+" " +guardians[props.account.guardians[0]].lastName
  }


  const onSelect = () => {
    props.navigate('Account', { accountId: props.id })
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
