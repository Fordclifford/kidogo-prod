import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, TouchableOpacity, View } from 'react-native'
import { Styles } from '../constants/Style';
import Language from '../languages'
import Message from '../components/Message';
import Backdrop from '../components/Backdrop';
import { UploadData } from '../utilities/dbstore';
import { UploadToStore } from '../utilities/dbstore';
import Loading from '../components/Loading';
import { UPDATE_CHILD, SET_CHILD, DELETE_CHILD } from '../constants/Children';
import { UPDATE_GUARDIAN, SET_GUARDIAN, DELETE_GUARDIAN } from '../constants/Guardians';
import { UPDATE_EXPENSE, UPDATE_PAYMENT } from '../constants/Finances';
import { SET_ATTENDANCE } from '../constants/Attendance'
import {
  ACCOUNTS, CHILDREN, ATTENDANCE, GUARDIANS, CONTACTS, RESPONSES, EXPENSES, PAYMENTS
} from '../constants/Store';
import { Update, Get, Create, Delete, GetAttendance, GetCaregiver, GetResponses, GetKids, GetGuardians, GetHofs, GetPayments, GetExpenses, GetAccounts } from '../utilities/localstore';
import { UPDATE_RESPONSES, SET_RESPONSES } from '../constants/Questions';
import { UPDATE_ACCOUNT } from '../constants/Accounts';
import { getResponses, getAttendance } from '../src/graphql/queries';
import ConfirmModal from '../components/ConfirmModal';
import { baseUrl } from '../utilities/config';




const Upload = (props) => {
  useEffect(() => {
    setLoading(true)

    GetResponses()
      .then((json) => setResponses(json))
      .catch((error) => console.error(error))

    GetAttendance()
      .then((json) => setAttendance(json))
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));

    GetGuardians()
      .then((json) => setGuardians(json))
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


    GetHofs()
      .then((json) => setHofs(json))
      .catch((error) => console.error(error))

    GetAccounts()
      .then((json) => {
        setAccounts(json)
      })
      .catch((error) => console.error(error))

    GetPayments()
      .then((json) => setPayments(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    GetExpenses()
      .then((json) => setExpenses(json))
      .catch((error) => console.error(error))
    // .


  }, [])

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [kids, setKids] = useState(null)
  const dispatch = useDispatch()
  const [accounts, setAccounts] = useState(null)
  const children = useSelector(state => state.children)
  //const guardians = useSelector(state => state.guardians)
  const contacts = useSelector(state => state.contacts)
  const finances = useSelector(state => state.finances)
  const [expenses, setExpenses] = useState(null)
  const [payments, setPayments] = useState(null)
  const [attendance, setAttendance] = useState(null)
  const questions = useSelector(state => state.questions)
  const [hofs, setHofs] = useState(null)
  const [responses, setResponses] = useState(null)
  const [guardians, setGuardians] = useState(null)
  const [familyId, setFamilyId] = useState(null)

  const [callbackId, setCallbackId] = useState(null)

  const [qui, setQui] = useState([])
  const [confirmModalVisible, setconfirmModalVisible] = useState(false)
 

  const setError = (text) => {
    clearTimeout(callbackId)
    setMessage(text)
    setCallbackId(setTimeout(() => setMessage(null), 4000))
  }
  const getKids = async () => {

    //  setLoading(true)

    return GetKids()
      .then((json) => {
        setKids(json)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }
  const getGuardians = async () => {

    //  setLoading(true)

    return GetGuardians()
      .then((json) => {
        setGuardians(json)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }
  const getExpenses = async () => {

    //  setLoading(true)

    return GetExpenses()
      .then((json) => {
        setExpenses(json)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }

  const getAccounts = async () => {

    //  setLoading(true)

    return GetAccounts()
      .then((json) => {
        setAccounts(json)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }
  const getPayments = async () => {

    //  setLoading(true)

    return GetPayments()
      .then((json) => {
        setPayments(json)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }
  const getResponses = async () => {

    //  setLoading(true)

    return GetResponses()
      .then((json) => {
        setResponses(json)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }

  const getAttendance = async () => {

    //  setLoading(true)

    return GetAttendance()
      .then((json) => {
        setAttendance(json)
        return json;
      })
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false));


  }



  const onUpload = async () => {
    setLoading(true)

    //console.log(hofs)
    //  return


    const userData = {
      accounts,
      children,
      guardians,
      contacts,
      finances,
      payments,
      expenses,
      questions,
      responses,
    }
    setError("Starting upload")


    for (const [accId, data] of Object.entries(accounts)) {
      console.log(data.familyId)
      setFamilyId(data.familyId)
      if (data.familyId) {
        setFamilyId(data.familyId)
      }

      if (data.uploaded) {

      } else {
        if (data.hofs) {
          // console.log(data.hofs)
          // return;
          for (i = 0; i < data.hofs.length; i++) {
            let internalId = data.hofs[i]
            let hof = hofs[internalId]
            console.log(hof)
            //return;
            let name = hof.firstName + " " + hof.lastName

            const resu = await postFamily(name)
            console.log("uploading family")
            console.log(resu)
            // return
            if (resu.id) {
              var id = accId
              data.uploaded = true
              data.familyId = resu.id
              // setFamilyId(resu.id)
              dispatch({ type: UPDATE_ACCOUNT, id, update: data })
              await Update(ACCOUNTS, id, data)
              setError("Successfully uploaded HOF")

              const resul = await postFamilyCaregiver(name, resu.id)
              console.log("uploading family caregiver")
              console.log(resul)

            } else if (resu.statusCode == 400) {
              setError("Some data did not upload please try again")
              setLoading(false)
              return;
            }
            await getAccounts()

          }

        }
      }



      if (data.guardians) {

        //  console.log("guardians fetched")
        setError("Uploading Guardians")
        for (i = 0; i < data.guardians.length; i++) {
          let internalId = data.guardians[i]
          let guardian = guardians[internalId]

          if (guardian.uploaded) {
            setError("Guardian already uploaded")
          } else {
            let rs = await postGuardian(guardian)
            console.log("posting guardian")

            console.log(rs)

            if (rs.id) {
              var id = guardian.id
              guardian.uploaded = true
              guardian.guardianId = rs.id
              dispatch({ type: UPDATE_GUARDIAN, id, update: guardian })
              await Update(GUARDIANS, id, guardian)
              setError("Successfully uploaded guardian")
              await getGuardians()
              // const kids = await getKids()

            } else if (rs.statusCode == 400) {
              setError("Some data did not upload please try again")
              setLoading(false)
              return;
            }
          }

        }


      }
      if (data.children) {
        setError("Uploading Children")

        for (i = 0; i < data.children.length; i++) {
          let internalId = data.children[i]
          let child = children[internalId]

          if (child.uploaded) {
            setError("Children already Uploaded")
          } else {
            setError("Uploading Children")
            let rs = await postChild(child, data.familyId)
            console.log(rs)

            if (rs.id) {
              var id = child.id
              child.uploaded = true
              child.childId = rs.id
              dispatch({ type: UPDATE_CHILD, id, update: child })
              await Update(CHILDREN, id, child)
              // const kids = await getKids()
              setError("SUccessfully uploaded Children")


            } else if (rs.statusCode == 400) {
              setError("Some data did not upload please try again")
              setLoading(false)
              return;
            }



          }

        }
        for (const [date, paymentsData] of Object.entries(payments)) {

          for (const [paymentId, pdata] of Object.entries(paymentsData)) {
            console.log("familyId")
            // setFamilyId(data.familyId)
            console.log(familyId)


            let account = pdata.accountId
            if (account === accId) {
              console.log(pdata)

              let response = await postPayment(pdata, data.familyId)
              console.log("uploading payments")
              console.log(response)


              if (response.statusCode === 200) {

                let pay = { type: pdata.type, uploaded: true, amount: pdata.amount, accountId: paymentId, date: date }
                let up = { type: pdata.type, uploaded: true, amount: pdata.amount, accountId: paymentId }
                let u = { [paymentId]: up }

                // alert(props.id.date);return;
                dispatch({ type: UPDATE_PAYMENT, date, update: pay })
                await Update(PAYMENTS, date, u)
              } else {
                setError("some data did not upload, upload again")
                //setLoading(false)
               // return
              }
              await getPayments()
            }

          }
        }

        for (const [date, attendanceData] of Object.entries(attendance)) {

          for (const [attendanceId, adata] of Object.entries(attendanceData)) {

            // setFamilyId(data.familyId)
            console.log(attendanceId)
            const childid = children[attendanceId].childId
            if (adata.checkinuploaded) {

            } else {
              if (adata.checkIn) {


                let response = await postCheckin(adata.checkindatetime, childid)
                setError("uploading checkin")
                console.log(response)
                             if (response.statusCode === 200) {


                  const update = { ...attendance[date] }
                  update[attendanceId].checkinuploaded = true


                  dispatch({ type: SET_ATTENDANCE, id: date, attendance: update })
                  await Update(ATTENDANCE, date, update)

                } else {
                  setError("some data did not upload, upload again")
                  //setLoading(false)
                //  return
                }
                await getAttendance()
              }
            }

            if (adata.checkoutuploaded) {

            } else {
              if (adata.checkOut) {


                let response = await postCheckout(adata.checkoutdatetime, childid)
                console.log("uploading checkout")
                console.log(response)
                setError("uploading checkout")

                if (response.statusCode === 200) {


                  const update = { ...attendance[date] }
                  update[attendanceId].checkoutuploaded = true


                  dispatch({ type: SET_ATTENDANCE, id: date, attendance: update })
                  await Update(ATTENDANCE, date, update)

                } else {
                  setError("some data did not upload, upload again")
                  setLoading(false)
                //  return
                }
                await getAttendance()
              }

            }
          }

        }

      }



    }


    for (const [date, responsesData] of Object.entries(responses)) {
     // console.log(responsesData)
      if (responsesData.uploaded) {
        setError("Response already uploaded")
        continue
      } else {
        for (const [id, resp] of Object.entries(responsesData)) {
        //  console.log(resp)

        if(id==="uploaded"){
          continue
        }

          setError("Uploading Responses")
          const rs = await postAnswers(id, resp)
          // console.log(rs)



          if (rs.transactionStatus == "SUCCESS") {


            let updates = { uploaded: true }
            console.log(updates)
            //return

            dispatch({ type: UPDATE_RESPONSES, id: date, responses: updates })
            await Update(RESPONSES, date, updates)
            await getResponses()

          } else if (rs.statusCode == 400) {
            setError("some data did not upload, upload again")
            setLoading(false)
            return;
          }else{
            setError("some data did not upload, upload again")
            setLoading(false)
            return;
          }

          //  }
        }
      }



    }


    for (const [date, expensesData] of Object.entries(expenses)) {

      for (const [id, data] of Object.entries(expensesData)) {
        //  console.log(data)
        // return
        setError("Uploading Expenses")
        if (data.uploaded) {
          console.log("all expenses uploaded")
          setError("All Expenses Already Uploaded")
          //  return
        } else {

          let tm = await postExpenses(data)

          if (tm.transactionStatus == "SUCCESS") {
            let type = data.type
            let amount = data.amount


            let expense = { type, amount, date: date, uploaded: true }
            //   console.log(expense);return;
            let up = { type, amount, uploaded: true }

            let u = { [id]: up }
            console.log(u)
            // return

            // alert(props.id.date);return;
            dispatch({ type: UPDATE_EXPENSE, date, update: expense })
            await Update(EXPENSES, date, u)
            console.log(expenses)
            await getExpenses()

            setError("Successfully Uploaded expenses")

          } else if (tm.statusCode == 400) {
            setError("some data did not upload, upload again")
            setLoading(false)
            return;
          }

        }
      }
    }

    setError("Data Successfully Uploaded")
    setLoading(false)
  }

  const postGuardian = async (guardian) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({ "govtId": guardian.govtId, "caregiver": caregiver.id, "firstName": guardian.firstName, "token": 55452, "lastName": guardian.lastName, "phone": guardian.phone, "address": guardian.address, "city": guardian.city, "family_id": familyId });
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(caregiver)
    return fetch(baseUrl+'frontend/web/index.php?r=api/add-guardian', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        return error
      });
  }
  const postChild = async (child, familyId) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({ "note": child.note, "caregiver": caregiver.id, "firstName": child.firstName, "token": 55452, "lastName": child.lastName, "gender": child.gender, "immunization": child.immunization, "dob": child.birthdate, "family_id": familyId });
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(caregiver)
    return fetch(baseUrl+'frontend/web/index.php?r=api/add-child', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        return error
      });
  }
  const postAnswers = async (id, answer) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({ "caregiver": caregiver.id, "token": 55452, "question_id": id, "response": answer });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(caregiver)
    return fetch(baseUrl+'frontend/web/index.php?r=api/add-response', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        return json;
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        return error
      });
  }

  const postPayment = async (payment, familyId) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({ "token": 3444, "caregiver": caregiver.id, "family_id": familyId, "amount": payment.amount, "payment_for": "fees", "payment_type": payment.type });
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // console.log(caregiver)
    return fetch(baseUrl+'frontend/web/index.php?r=api/add-payment', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        setError(error)
        console.error(error);
        setLoading(false)
      });
  }
  const postExpenses = async (expenses) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({ "amount": expenses.amount, "caregiver": caregiver.id, "token": 55452, "expense_type": expenses.type });
    //  console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(caregiver)
    return fetch(baseUrl+'frontend/web/index.php?r=api/add-expense', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        setError(error)
        console.error(error);
        setLoading(false)
      });
  }


  const postFamily = async (name, hof) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({ "family_name": name, "caregiver": caregiver.id, "token": 55452, "hof": hof });
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(caregiver)
    return fetch(baseUrl+'frontend/web/index.php?r=api/add-family', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        return error
        console.error(error);
      });
  }

  const postFamilyCaregiver = async (hof, id) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var raw = JSON.stringify({ "family_id": id, "caregiver_id": caregiver.id, "token": 55452, "family_name": hof });
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(caregiver)
    return fetch(baseUrl+'frontend/web/index.php?r=api/add-caregiver-family', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        return error
        console.error(error);
      });
  }
  const postCheckin = async (datetime, childid) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var checkin = JSON.stringify({ "token": 3444, "childId": childid, "checkindatetime": datetime });
    console.log(checkin)
    var cin = {
      method: 'POST',
      headers: myHeaders,
      body: checkin,
      redirect: 'follow'
    };


    return fetch(baseUrl+'frontend/web/index.php?r=api/add-checkin', cin)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
      
        setLoading(false)
        return error
      });


  }

  const postCheckout = async (datetime, childid) => {

    const caregiver = await GetCaregiver()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");


    var checkout = JSON.stringify({ "token": 3444, "childId": childid, "checkoutdatetime": datetime });
    console.log(checkout)

    var cout = {
      method: 'POST',
      headers: myHeaders,
      body: checkout,
      redirect: 'follow'
    };

    return fetch(baseUrl+'frontend/web/index.php?r=api/add-check-out', cout)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        return error
      });
  }


  return (
    <Backdrop>
      <Message text={message} />
     
      {loading
        ? <Loading />
        : <View style={Styles.loading} >
          <TouchableOpacity
            style={Styles.uploadButton}
             onPress={onUpload}
          >
  <Text style={Styles.uploadButtonText}>
              {Language.Upload}
            </Text>
          </TouchableOpacity>

        
        </View>

        
}
    </Backdrop>
  )
}

export default Upload
