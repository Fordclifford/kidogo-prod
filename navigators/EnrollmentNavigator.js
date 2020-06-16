import { createStackNavigator } from 'react-navigation'

import Children from '../screens/Children'
import Guardians from '../screens/Guardians'
import Contacts from '../screens/Contacts';
import Hof from '../screens/Hof';


const routeConfig = {
  Children: {
    screen: Children,
    navigationOptions: {
      header: null,
    },
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      header: null,
    },
  },
  Guardians: {
    screen: Guardians,
    navigationOptions: {
      header: null,
    },
  },
  Hof: {
    screen: Hof,
    navigationOptions: {
      header: null,
    },
  },
}

const navConfig = {
  initialRouteName: 'Hof',
}


export default createStackNavigator(routeConfig, navConfig)
