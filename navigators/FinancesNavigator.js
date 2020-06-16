import { createStackNavigator } from 'react-navigation'

import Finances from '../screens/Finances';
import FinanceOptions from '../screens/FinanceOptions';
import FinanceSummary from '../screens/FinanceSummary';

const routeConfig = {
  FinanceOptions: {
    screen: FinanceOptions,
    navigationOptions: {
      header: null,
    },
  },
  Finances: {
    screen: Finances,
    navigationOptions: {
      header: null,
    },
  },
  FinanceSummary: {
    screen: FinanceSummary,
    navigationOptions: {
      header: null,
    },
  },
}

const navConfig = {
  initialRouteName: 'Finances',
}


export default createStackNavigator(routeConfig, navConfig)
