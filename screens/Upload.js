import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Text, TouchableOpacity, View } from 'react-native'
import { Styles } from '../constants/Style';
import Language from '../languages'

import Backdrop from '../components/Backdrop';
import { UploadData } from '../utilities/dbstore';
import { UploadToStore } from '../utilities/dbstore';
import Loading from '../components/Loading';
import { UPDATE_CHILD, SET_CHILD, DELETE_CHILD } from '../constants/Children';
import { UPDATE_GUARDIAN, SET_GUARDIAN, DELETE_GUARDIAN } from '../constants/Guardians';
import {
  ACCOUNTS, CHILDREN, ATTENDANCE, GUARDIANS, CONTACTS
} from '../constants/Store';
import { Update, Get, Create, Delete,GetCaregiver } from '../utilities/localstore';




const Upload = (props) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const accounts = useSelector(state => state.accounts)
  const children = useSelector(state => state.children)
  const guardians = useSelector(state => state.guardians)
  const contacts = useSelector(state => state.contacts)
  const finances = useSelector(state => state.finances)
  const payments = useSelector(state => state.payments)
  const expenses = useSelector(state => state.expenses)
  const questions = useSelector(state => state.questions)

  const onUpload = async () => {
    setLoading(true)

    const userData = {
      accounts,
      children,
      guardians,
      contacts,
      finances,
      payments,
      expenses,
      questions,
    }
 
    // const postChildren =  async(userData) => {
   
     var child = children
     var  chld = json2array(child)
   
     function json2array(json){
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function(key){
            result.push(json[key]);
        });
        return result;
    }
   
    var i;
    for (i = 0; i <chld.length; i++) {
    var single= chld[i];
    if(single.uploaded){
   
    }else{
     const rs= await postChild(single)
     console.log(rs)
     
     if (rs.transactionStatus=="SUCCESS") {
       var id = single.id   
       single.uploaded=true
       dispatch({ type: UPDATE_CHILD, id, update: single })
       await Update(CHILDREN, id, single)
     } 
    }
   }
var gdn = json2array(guardians)
   var i;
    for (i = 0; i <gdn.length; i++) {
    var single= gdn[i];
    if(single.uploaded){
   
    }else{
     const rs= await postGuardian(single)
     console.log(rs)
     
     if (rs.transactionStatus=="SUCCESS") {
       var id = single.id   
       single.uploaded=true
       dispatch({ type: UPDATE_GUARDIAN, id, update: single })
       await Update(GUARDIANS, id, single)
     } 
    }
   }

    setLoading(false)
  }

  const postGuardian=async(guardian)=>{

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
  
    
    var raw = JSON.stringify({"govtId":guardian.govtId,"caregiver":caregiver.id,"firstName":guardian.firstName,"token":55452,"lastName":guardian.lastName,"phone":guardian.phone,"address":guardian.address,"city":guardian.city});
  console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
   // console.log(caregiver)
    return fetch('https://techsavanna.net:8181/kidogoadmin/frontend/web/index.php?r=api/add-guardian',requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const postChild=async(child)=>{

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
  
    
    var raw = JSON.stringify({"note":child.note,"caregiver":caregiver.id,"firstName":child.firstName,"token":55452,"lastName":child.lastName,"gender":child.gender,"immunization":child.immunization,"dob":child.birthdate});
  console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
   // console.log(caregiver)
    return fetch('https://techsavanna.net:8181/kidogoadmin/frontend/web/index.php?r=api/add-child',requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  




  return (
    <Backdrop>
     { loading 
        ? <Loading />
        : <View style={Styles.loading} >
            <TouchableOpacity
              style={Styles.uploadButton}
              onPress={onUpload}
            >
              <Text style={Styles.uploadButtonText}>
                { Language.Upload }
              </Text>
            </TouchableOpacity>
          </View>
      }
    </Backdrop>
  )
}

export default Upload
