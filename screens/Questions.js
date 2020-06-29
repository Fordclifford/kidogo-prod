import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import Backdrop from '../components/Backdrop'
import { Styles, Size } from '../constants/Style'
import { Answer, UPDATE_QUESTIONS, UPDATE_RESPONSES,SET_RESPONSES } from '../constants/Questions'
import Language from '../languages'
import { GetTOD, GetShortDate } from '../utilities/dates'
import Spacer from '../components/Spacer'
import { Update, GetQuestions, Get } from '../utilities/localstore'
import { RESPONSES, QUESTIONS } from '../constants/Store';
import Loading from '../components/Loading';
import Message from '../components/Message';



const Questions = (props) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [tod, setTOD] = useState(GetTOD())
  var [curQuestionIndex, setCurQuestionIndex] = useState(0)
  const [responses, setResponses] = useState('')
  const [date, setDate] = useState(GetShortDate)
  const [question, setQuestion] = useState([])
  const [qs, setQs] = useState([])
  const [callbackId, setCallbackId] = useState(null)
  const [numQ, setnumQ] = useState(0)
  const [uploaded, setUploaded] = useState(0)
  var [remaining, setRemaining] = useState(0)

  useEffect(() => {
//    setLoading(true)

    

    GetQuestions()
      .then((json) => {setResponses(json)

        const today = GetShortDate()
        if(json[today].uploaded){
          setUploaded(true)
        }
     
        for (const [dt, resData] of Object.entries(json)) {

           if (resData[tod] != undefined) {
             
            setQs(json[dt][tod])
         setnumQ(json[dt][tod].length)
         setRemaining(json[dt][tod].length)
         break
         }else{
              //  setLoading(true)
             //   setError("No questions today!")
              
         }
         }
      
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
     // console.log(responses)

     
     //  console.log(numQ)

  }, [])

  const dispatch = useDispatch()





  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => props.navigation.navigate('Dash'), 4000))
  }
  const answer = async (response) => {
    const today = GetShortDate()
    const update = { [qs[curQuestionIndex]['id']]: response,uploaded:false }
    //const update={question: qs[curQuestionIndex]['id'],answer:response}
  // question.push(update)

    dispatch({ type: SET_RESPONSES, id: today, responses:update })
    await Update(RESPONSES, today, update)
var ind = numQ-1;
     if (curQuestionIndex === ind) {
      const q= {uploaded:true}

      dispatch({ type: UPDATE_QUESTIONS, id: today, questions: q })
      await Update(QUESTIONS, today, q)
    }


    forward()
  }


  const back = () => {
    const nextIndex = curQuestionIndex - 1 >= 0
      ? curQuestionIndex - 1 : curQuestionIndex

    setCurQuestionIndex(nextIndex)
  }

  const forward = () => {

    
    setRemaining(remaining--)
    setRemaining(remaining--)


  

    setCurQuestionIndex(curQuestionIndex++)
    setCurQuestionIndex(curQuestionIndex++)
  }


  const getCurrentQuestion = () => {

    if (!responses) {
      return null
    }

    if (responses==='') {
      console.log(responses)
      return null
    }

   else if (numQ===0) {
    

        //   setLoading(true)
    //  setError("There are no questions today!")
    }
   
  else  if (uploaded) {
      setLoading(true)
 setError(Language.QuestionsAnswered)
}

    
    else if (curQuestionIndex === numQ) {
      console.log(numQ)
      setLoading(true)
      setError("You have reached the end of questions!")
//curQuestionIndex--
      //setTimeout(props.navigation.navigate('Dash'))
    }else{

          return (
            <Text style={Styles.h23} >
              {qs[curQuestionIndex]['question']}
            </Text>
          )
          }   
      
    }



   




  



  return (

    <Backdrop>
      <Message text={message} />
      {loading
        ? <Loading />
        : <View style={Styles.loading} >
          <Spacer height={Size.statusbar} />

          

          <Spacer medium />
          <View style={Styles.questionHolder} >
      <Text style={Styles.buttonText3}>Question {curQuestionIndex+1} of {numQ}</Text>
          </View>

          <Spacer medium />


          <View style={Styles.rowElements} >
            <TouchableOpacity
              style={Styles.rowElement1}
              onPress={back}
            >
              <Icon name="chevron-left" size={48} color='black' />
            </TouchableOpacity>

            <Spacer medium />
          <View  style={Styles.rowElement2}>
            {getCurrentQuestion()}
          </View>

          <Spacer medium />

            <TouchableOpacity
              style={Styles.rowElement1}
              onPress={forward}
            >
              <Icon name="chevron-right" size={48} color='black' />
            </TouchableOpacity>
          </View>

          <Spacer medium />

          <View style={Styles.rowElements} >
            <TouchableOpacity
              style={Styles.rowButton}
              onPress={() => answer(Answer.Yes)}
            >
              <Text style={Styles.buttonText} >
                {Language.Yes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.rowButton}
              onPress={() => answer(Answer.No)}
            >
              <Text style={Styles.buttonText} >
                {Language.No}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </Backdrop>
  )
}

export default Questions