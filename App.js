import React, { useState } from 'react';
import { YellowBox } from 'react-native';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/RootReducer'

import { AppLoading } from 'expo'
// import * as Update from 'expo-updtes'

import { LoadFonts, ConfigureBcrypt } from './utilities/config';
import {
  TestDataNeeded, LoadTestData, LogTestData,
  InitDatabase, UpdateStore,
} from './utilities/localstore';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigators/AppNavigator';
import userData from './reducers/User';

const store = createStore(rootReducer)

const AppContainer = createAppContainer(AppNavigator)

const App = () => {

  const [appLoading, setAppLoading] = useState(true)


  const setupApp = async () => {
    YellowBox.ignoreWarnings([
      'Animated: `useNativeDriver` was not specified.',
      'Using Math.random is not cryptographically secure!',
      'Require cycles are allowed, but can result in uninitialized values.'
    ]);
    ConfigureBcrypt()
    await LoadFonts()

    // if (await TestDataNeeded()) {
    //   await LoadTestData()
    // }


     await LogTestData()
    await InitDatabase(store.dispatch)
    await UpdateStore(store.dispatch)
  }


  if (appLoading) {
    return (
      <AppLoading
        startAsync={setupApp}
        onFinish={() => setAppLoading(false)}
        onError={console.warn}
      />
    )
  } else {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    )
  }
}

export default App
