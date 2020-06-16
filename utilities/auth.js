import { Auth } from 'aws-amplify'
import { GetCaregiver } from './localstore';
import {AsyncStorage} from 'react-native'
import { baseUrl } from './config';


export const SignedIn = async () => {
  const caregiver = await GetCaregiver()
  return "id" in caregiver
}


export const FetchCaregiver = async () => {
  const caregiver = await GetCaregiver()
  return caregiver
}

export const SignUpCaregiver = async (caregiverData) => {
  console.log(caregiverData)
 
  if(caregiverData.countryCode==='254'){
    var ph =caregiverData.phone.split('-').join('')
    var phone = ph.substring(ph.length - 9)
    var phone_number = caregiverData.countryCode + phone

  }else{
    var phone_number = caregiverData.countryCode + caregiverData.phone.split('-').join('')

  }
  // const phone_number = '+1' + caregiverData.phone.split('-').join('')
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({"phone":phone_number,"token":55452,"first_name":caregiverData.firstName,"last_name":caregiverData.lastName,"gender":"F","password":caregiverData.password,"address":caregiverData.centreName,"country":caregiverData.countryName,"city":caregiverData.city,"idorpassport":phone_number});
    
    console.log(raw)
    var cin = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    return fetch(baseUrl+'frontend/web/index.php?r=api/add-caregiver', cin)
      .then((response) => response.json()
      )
      .then((json) => {
        return json;
      })
      .catch((error) => {
      
       // setLoading(false)
        return error
      });
  } catch(error) {
      return error  
    
  }
  // try {
  //   return await Auth.signUp({
  //     username: caregiverData.username,
  //     password: caregiverData.password,
  //     attributes: {
  //       email: caregiverData.email,
  //       phone_number,
  //     },
  //   })
  // } catch(error) {
  //   return error
  // }
}

export const ConfirmCaregiver = async (username, code) => {
  try {
    return await Auth.confirmSignUp(username, code)
  } catch(error) {
    return error
  }
}


export const sendToAPi = async (caregiverData) => {
  try {

   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=1qn6rbmkose1pfrcnagfu79i83");
    
    var raw = JSON.stringify({"email":caregiverData.email,"phone":caregiverData.phone,"token":55452,"first_name":caregiverData.firstName,"last_name":caregiverData.lastName,"gender":"F","password":caregiverData.password,"address":caregiverData.centreName,"country":"Kenya","city":caregiverData.city,"idorpassport":caregiverData.phone});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
     
    
    return await  fetch(baseUrl+"frontend/web/index.php?r=api/add-caregiver", requestOptions)
 
  } catch (error) {
    console.error(error)
  }
}

export const getCaregiver = async () => {
  try {

   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=1qn6rbmkose1pfrcnagfu79i83");
    
    var raw = JSON.stringify({"email":caregiverData.email,"phone":caregiverData.phone,"token":55452,"first_name":caregiverData.firstName,"last_name":caregiverData.lastName,"gender":"F","password":caregiverData.password,"address":caregiverData.centreName,"country":"Kenya","city":caregiverData.city,"idorpassport":caregiverData.phone});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
     
    
    const res = await fetch(baseUrl+"frontend/web/index.php?r=api/add-caregiver", requestOptions)
    return res;
     
    //setQuestions(questions)
  } catch (error) {
    console.error(error)
  }
}




export const ResendConfirmCode = async (username) => {
  try {
    return await Auth.resendSignUp(username)
  } catch(error) {
    return error
  }
}

export const ForgotPassword = async (username,code) => {
  try {
    if(code==='254'){
      console.log("yes")
      var ph =username.split('-').join('')
      var phone = ph.substring(ph.length - 9)
      var phone_number = code + phone
  

    }else{
      var phone_number = code + username.split('-').join('')
    }
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var checkin = JSON.stringify({ "token": 3444, "username": phone_number});
    console.log(checkin)
    var cin = {
      method: 'POST',
      headers: myHeaders,
      body: checkin,
      redirect: 'follow'
    };


    return fetch(baseUrl+'frontend/web/index.php?r=api/request-password-reset', cin)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
      
       // setLoading(false)
        return error
      });
  } catch(error) {
      return error  
    
  }
}

export const SendSms = async (message,phone,code) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    console.log(code)
    if(code==='254'){
      var ph =phone.split('-').join('')
      var phone = ph.substring(ph.length - 9)
      var phone_number = code + phone
  

    }else{
      var phone_number = code + phone.split('-').join('')
    }
   

    var checkin = JSON.stringify({ "token": 3444, "phone": phone_number,"smstext":message});
    console.log(checkin)
    var cin = {
      method: 'POST',
      headers: myHeaders,
      body: checkin,
      redirect: 'follow'
    };


    return fetch(baseUrl+'frontend/web/index.php?r=api/send-sms', cin)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
      
       // setLoading(false)
        return error
      });
  } catch(error) {
      return error  
    
  }
}


export const SendMessage = async (message,phone,code) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    if(code==='254'){
      var ph =phone.split('-').join('')
      var phone = ph.substring(ph.length - 9)
      var phone_number = code + phone
  

    }else{
      var phone_number = code + phone.split('-').join('')
    }
   

    console.log(phone_number)
    var checkin = JSON.stringify({ "token": 3444, "phone": phone_number,"smstext":message});
    console.log(checkin)
    var cin = {
      method: 'POST',
      headers: myHeaders,
      body: checkin,
      redirect: 'follow'
    };


    return fetch(baseUrl+'frontend/web/index.php?r=api/send-sms', cin)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
      
       // setLoading(false)
        return error
      });
  } catch(error) {
      return error  
    
  }
}

export const SetNewPassword = async (username,new_password,countryCode) => {
  try {

    if(countryCode==='254'){
      //console.log("yes")
      var ph =username.split('-').join('')
      var phone = ph.substring(ph.length - 9)
      var phone_number = countryCode + phone
  

    }else{
      var phone_number = countryCode + username.split('-').join('')
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var checkin = JSON.stringify({ "token": 3444, "username": phone_number, "newpassword": new_password });
    console.log(checkin)
    var cin = {
      method: 'POST',
      headers: myHeaders,
      body: checkin,
      redirect: 'follow'
    };


    return fetch(baseUrl+'frontend/web/index.php?r=api/reset-password', cin)
      .then((response) => response.json())
      .then((json) => {
        return json;

       
      })
      .catch((error) => {
      
       // setLoading(false)
        return error
      });
  } catch(error) {
      return error  
    
  }
}


export const SignInCaregiver = async (username, password,countryCode) => {
  try {
    if(countryCode==='254'){
      //console.log("yes")
      var ph =username.split('-').join('')
      var phone = ph.substring(ph.length - 9)
      var phone_number = countryCode + phone
  

    }else{
      var phone_number = countryCode + username.split('-').join('')
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var checkin = JSON.stringify({ "token": 3444, "username": phone_number, "password": password });
    console.log(checkin)
    var cin = {
      method: 'POST',
      headers: myHeaders,
      body: checkin,
      redirect: 'follow'
    };


    return fetch(baseUrl+'frontend/web/index.php?r=api/login-user', cin)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
      
       // setLoading(false)
        return error
      });
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
