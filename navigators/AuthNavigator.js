import { createStackNavigator } from 'react-navigation'

import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import SignUp1 from '../screens/SignUp1'
import SignIn from '../screens/SignIn'
import Confirm from '../screens/Confirm'
import Forgot from '../screens/Forgot'
import NewPassword from '../screens/NewPassword'
import ConfirmCode from '../screens/ConfirmCode'

const routeConfig = {
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
  SignUp1: {
    screen: SignUp1,
    navigationOptions: {
      header: null,
    },
  },

  Forgot: {
    screen: Forgot,
    navigationOptions: {
      header: null,
    },
  },
  NewPassword: {
    screen: NewPassword,
    navigationOptions: {
      header: null,
    },
  },
  ConfirmCode: {
    screen: ConfirmCode,
    navigationOptions: {
      header: null,
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null,
    },
  },
  Confirm: {
    screen: Confirm,
    navigationOptions: {
      header: null,
    },
  },
}

const navConfig = {
  initialRouteName: 'Home',
}


export default createStackNavigator(routeConfig, navConfig)
