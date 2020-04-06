import { Auth } from 'aws-amplify'
import { GetCaregiver } from './localstore';
import {AsyncStorage} from 'react-native'


export const SignedIn = async () => {
  const caregiver = await GetCaregiver()
  return "id" in caregiver
}


export const FetchCaregiver = async () => {
  const caregiver = await GetCaregiver()
  return caregiver
}

export const SignUpCaregiver = async (caregiverData) => {
  const phone_number = '+254' + caregiverData.phone.split('-').join('')
  // const phone_number = '+1' + caregiverData.phone.split('-').join('')

  try {
    return await Auth.signUp({
      username: caregiverData.username,
      password: caregiverData.password,
      attributes: {
        email: caregiverData.email,
        phone_number,
      },
    })
  } catch(error) {
    return error
  }
}

export const ConfirmCaregiver = async (username, code) => {
  try {
    return await Auth.confirmSignUp(username, code)
  } catch(error) {
    return error
  }
}


export const ResendConfirmCode = async (username) => {
  try {
    return await Auth.resendSignUp(username)
  } catch(error) {
    return error
  }
}

export const ForgotPassword = async (username) => {
  try {
    return await Auth.forgotPassword(username)
  } catch(error) {
    return error
  }
}

export const SetNewPassword = async (username,code,new_password) => {
  try {
     return await Auth.forgotPasswordSubmit(username, code, new_password)
  
  } catch(error) {
    console.log(error)
    return error
  }
}


export const SignInCaregiver = async (username, password) => {
  try {
    return await Auth.signIn(username, password)
  } catch(error) {
    return error  
  }
}

export const GetToken= async ()=> {
  try {

   return await AsyncStorage.getItem("userData").then((data)=>{
    setState({
      userData:state.userData.cloneWithRows(data),
    })
  })   
    
  } catch (error) {
    console.log("Something went wrong", error);
    return error
   
  }
}
