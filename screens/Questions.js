import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import Backdrop from '../components/Backdrop'
import { Styles, Size } from '../constants/Style'
import { Answer, UPDATE_QUESTIONS } from '../constants/Questions'
import Language from '../languages'
import { GetTOD, GetShortDate } from '../utilities/dates'
import Spacer from '../components/Spacer'
import { Update } from '../utilities/localstore'
import { QUESTIONS } from '../constants/Store'
import Loading from '../components/Loading';



const Questions = (props) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [tod, setTOD] = useState(GetTOD())
  const [curQuestionIndex, setCurQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState({quiz:[]})
  const [qs, setQs] = useState([])

  useEffect(() => {
    getQuestions();
      }, [])


  const getQuestions = async () => {
    try {

      setLoading(true)    
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "PHPSESSID=1qn6rbmkose1pfrcnagfu79i83");
      
      var raw = JSON.stringify({"token":35444,"question_session":tod});
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
       
      
      fetch("https://techsavanna.net:8181/kidogoadmin/frontend/web/index.php?r=api/get-daily-questions", requestOptions)
      .then((response) => response.json())
        
        .then((json) =>  setQuestions({quiz:json}))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      //setQuestions(questions)
    } catch (error) {
      console.error(error)
    }
  }


  const answer = async (response) => {
    const today = GetShortDate()
    const update = { [qs[curQuestionIndex]]: response }

    dispatch({ type: UPDATE_QUESTIONS, id: today, update })
    await Update(QUESTIONS, today, update)

    forward()
  }


  const back = () => {
    const nextIndex = curQuestionIndex - 1 >= 0
      ? curQuestionIndex - 1 : curQuestionIndex

    setCurQuestionIndex(nextIndex)
  }


  const forward = () => {
    const numQuestions = questions.quiz.length
    const nextIndex = curQuestionIndex + 1 < numQuestions
      ? curQuestionIndex + 1 : curQuestionIndex

    setCurQuestionIndex(nextIndex)
  }


  const getCurrentQuestion = () => {
   
    if (!questions) {
      return null
    }
    //var q=[];

    var i;
    for (i = 0; i <questions.quiz.length; i++) {
    var single= questions.quiz[i].question;
     qs.push(single)

    
    }

    //setQs(q)
    return (
      <Text style={Styles.h2} >
      {qs[curQuestionIndex]}
      </Text>
    )
  }


  return (
    
    <Backdrop>
       { loading 
        ? <Loading />
        : <View style={Styles.loading} >
      <Spacer height={Size.statusbar} />

      <Spacer medium />
      <View style={Styles.questionHolder} >
        {getCurrentQuestion()}
      </View>

      <Spacer medium />


      <View style={Styles.rowElements} >
        <TouchableOpacity
          style={Styles.rowElement}
          onPress={back}
        >
          <Icon name="chevron-left" size={48} color='black' />
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.rowElement}
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