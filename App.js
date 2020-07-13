import React, { useState } from 'react';
import Amplify from 'aws-amplify'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/RootReducer'
import awsconfig from './aws-exports'
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

Amplify.configure(awsconfig)

const store = createStore(rootReducer)

const AppContainer = createAppContainer(AppNavigator)

const App = () => {
  useEffect(() => {

  }, [])
  const [appLoading, setAppLoading] = useState(true)


  const setupApp = async () => {
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
