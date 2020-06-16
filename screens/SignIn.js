import React, { useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextInput, Text, AsyncStorage,TouchableOpacity, View,Picker } from 'react-native'
import { Styles } from '../constants/Style';
import Spacer from '../components/Spacer';
import { SignInCaregiver } from '../utilities/auth';
import Loading from '../components/Loading';
import { ListDB } from '../utilities/dbstore';
import { CreateCaregiver,Update } from '../utilities/localstore';
import Backdrop from '../components/Backdrop';
import Language from '../languages'
import Message from '../components/Message';
import SecureInput from '../components/SecureInput';
import { CAREGIVER, QUESTIONS } from '../constants/Store';
import userStore from '../utilities/store';
import {saveUser}  from '../constants/User'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'
import TextField from 'react-native-md-textinput';
import { GetShortDate,GetTOD} from '../utilities/dates';
import { SET_QUESTIONS } from '../constants/Questions';
import  countries from '../assets/countries.json';
import { baseUrl } from '../utilities/config';


const SignIn = (props) => {
  useEffect(() => {
    getData();
    getQuestions();
  


      }, [])


  
  //console.log(userStore.getState())
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [tod, setTOD] = useState(GetTOD())
  const [mamapre, setMamapre] = useState([])
  const [password, setPassword] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [callbackId, setCallbackId] = useState(null)
  const [message, setMessage] = useState(null)
  const [soundObject, setSoundObject] = useState(null)
  const [curQuestionIndex, setCurQuestionIndex] = useState(0)
  const [morningQs, setMorningQs] = useState({qs:[]})
  const [afternoonQs, setAfternoonQs] = useState({qs:[]})
  const [morning, setMorning] = useState([])
  const [afternoon, setAfternoon] = useState([])
  const [questions, setQuestions] = useState({morning:[],afternoon:[]})
  const [country, setCountry] = useState('+254#Kenya')
 
  const getGenderItems = () => {
   
    return Object.values(countries).map((countries, i) => {
      return (
        <Picker.Item
          key={i}
          label={countries.name+' ('+countries.code+')'}
          value={countries.code+'#'+countries.name}
        />
      )
    })
  }
 
  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }

  const getQuestions = async () => {
    try {

      setLoading(true)    
      setError("Fetching data please wait..")
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "PHPSESSID=1qn6rbmkose1pfrcnagfu79i83");
      
      var afternoon = JSON.stringify({"token":35444,"question_session":"afternoon"});
    var morning = JSON.stringify({"token":35444,"question_session":"morning"});

   
      
      var requestMorning = {
        method: 'POST',
        headers: myHeaders,
        body: morning,
        redirect: 'follow'
      };

      var requestAfternoon = {
        method: 'POST',
        headers: myHeaders,
        body: afternoon,
        redirect: 'follow'
      };
       
      
      fetch(baseUrl+'frontend/web/index.php?r=api/get-daily-questions', requestMorning)
      .then((response) => response.json())
        
        .then((json) =>  setMorningQs({qs:json}))
        .catch((error) => { setError(Language.UnknownError)
          props.navigation.navigate('SignIn')
      setLoading(false)
      })
       // .finally(() => setLoading(false));
      //setQuestions(questions)
    } catch (error) {
      console.error(error)
    }

    try {
    fetch(baseUrl+'frontend/web/index.php?r=api/get-daily-questions', requestAfternoon)
    .then((response) => response.json())
      
      .then((json) =>  setAfternoonQs({qs:json}))
      .catch((error) => {setError(Language.UnknownError)
        props.navigation.navigate('SignIn')
    setLoading(false)
    
      })
      .finally(() => setLoading(false));
  } catch (error) {
    console.error(error) 
  }
  }

  const getData = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({"token":55452});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(caregiver)
     fetch(baseUrl+'frontend/web/index.php?r=api/get-care-givers', requestOptions)
      .then((response) => response.json())
      .then((json) => {
    
        setResponse(json)
       // return json;
      })
      .catch((error) => {
       setError(Language.UnknownError)
        props.navigation.navigate('SignIn')
       
      });
  }
 
  
  const onForgot = async () => {
    setLoading(true)
    props.navigation.navigate('Forgot')
  }
  const onSignIn = async () => {
    
    if(response.length===0){
     await getData()
    }

    if (username == "") {
      setError(Language.usernameEmpty)
     
      
      setLoading(false)
      return;
    }
    if (password == "") {
      setError(Language.passwordEmpty)
     
      setLoading(false)
      return;
    }
    setLoading(true)

    const res = country.split("#");
    const countryName= res[1]
    const countryCode= res[0].substring(1)
    
    const user= await SignInCaregiver(username.trim(), password,countryCode)
    console.log(user)

   // return;
    
    if(user.statusCode){
     // console.log(user.code+"result")
     if(response.length===0){
      await getData()
     }
    
       if (user.statusCode === 200) {
    
        if(countryCode==='254'){
          //console.log("yes")
          var ph =username.trim().split('-').join('')
          var phone = ph.substring(ph.length - 9)
          var phone_number = countryCode + phone
      
    
        }else{
          var phone_number = countryCode + username.trim().split('-').join('')
        }
        // console.log(phone_number)
      // get the response body (the method explained below)
     var i;
       for (i = 0; i <response.length; i++) {
       var single= response[i].username;
       if (single === phone_number) {
        const caregiverData = {
          id: response[i].id_user,
          lastUpdate: GetShortDate(-1),
          username:phone_number,
          password:response[i].password_hash,
          email:response[i].email,
          firstName:response[i].first_name,
          lastName:response[i].last_name,
          phone:response[i].phone,
          centreName:response[i].address,
         location:response[i].city,
          city:response[i].city,
        }
        await CreateCaregiver(caregiverData)
        const today = GetShortDate()

     var i;
    for (i = 0; i <morningQs.qs.length; i++) {
     var question= morningQs.qs[i].question;
    var id= morningQs.qs[i].id;
    var single ={question,id}
    morning.push(single)    
    }

    var i;
    for (i = 0; i <afternoonQs.qs.length; i++) {
    var question= afternoonQs.qs[i].question;
    var id= afternoonQs.qs[i].id;
    var single ={question,id}
     afternoon.push(single)
    
    }
    questions.morning=morning;
    questions.afternoon=afternoon;

    console.log(questions)


    dispatch({ type: SET_QUESTIONS, id: today, questions: questions })
    await Update(QUESTIONS, today, questions)
     //  

        clearTimeout(callbackId)
        setMessage(Language.LoginSuccessful)
        setCallbackId(setTimeout(() => {setMessage(null)
          props.navigation.navigate('Dash')
        }, 4000))

       
        break
      }
         
       
       }
      // return
     

      } else if (user.statusCode === 409) {
        
        setError(Language.InvalidUsernameOrPassword)
        setPassword('')
        setUsername('')
        setLoading(false)
        return;
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
      }
    else  {
      
      setError(Language.UnknownError)
    
      setLoading(false)
      return;
        // The error happens when the supplied username/email does not exist in the Cognito user pool
    }
    }


//return


    // const caregiversResp = await ListDB(CAREGIVER)
    // const caregivers = caregiversResp["data"]["listCaregivers"]["items"]

    // for (const caregiver of caregivers) {
    //   if (caregiver.username === username) {
         
    //     await CreateCaregiver(caregiver)
       
    //     break
    //   }
    // }
   

  
  }
  const toggleHelpAudio = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync()
        setSoundObject(null)
      } else {
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../assets/audio/signin.mp3'))
        await soundObject.playAsync()
        setSoundObject(soundObject)
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <Backdrop>
        <Message text={message} />

      {loading
        ? <Loading />
        : <View>
            <Spacer large />

            <Text style={[Styles.h1, { fontSize: 35 }, Styles.raleway]} >
              { Language.SignIn }
            </Text>
            <View  >
            <Text style={Styles.label} >
            { Language.Country }
          </Text>
          <View style={[Styles.input, { height: 30, paddingLeft: 0 }]} >
         
            <Picker
              style={Styles.genderPicker}
              selectedValue={country}
              onValueChange={(value, pos) => setCountry(value)}
            >
               <Picker.Item label='Kenya(+254)' value='+254#Kenya' />
              { getGenderItems() }
            </Picker>
          </View>
        
          </View>

            <Text style={Styles.label} >
              { Language.Phone }
            </Text>

            <TextInput
              style={Styles.input}
              value={username}
              onChangeText={setUsername}
              blurOnSubmit={false}
            />

            
<Text style={Styles.label} >
              { Language.Password }
            </Text>
            <SecureInput
              value={password}
              setValue={setPassword}
            />

           

            <Spacer large />

            <View  style={{ alignItems:'center' }}>
            <TouchableOpacity
              style={Styles.mainButton}
              onPress={onSignIn}
            >
              <Text style={Styles.buttonText}>{ Language.SignIn }</Text>
            </TouchableOpacity>
            </View>
            
            <View  style={{ alignItems:'flex-end' }}>
            <TouchableOpacity
              style={Styles.sendCode}
              onPress={() => props.navigation.navigate('Forgot')}
            >
              <Text style={Styles.resendButton}>{ Language.ResetPassword }</Text>
            </TouchableOpacity>
            </View>
          </View>
      }
  
  <TouchableOpacity
        style={Styles.helpButton}
        onPress={toggleHelpAudio}
      >
        <View style={Styles.helpButtonIcon} >
          <Icon name="record-voice-over" color="#3C233D" size={36} />
        </View>
      </TouchableOpacity>
    </Backdrop>
  )
}


export default SignIn

