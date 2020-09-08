import {
  SET_RATE, SET_FREQUENCY,
  SET_NEW_CHILD, SET_NEW_GUARDIAN, SET_NEW_CONTACT,
  DELETE_NEW_CHILD, DELETE_NEW_GUARDIAN, DELETE_NEW_CONTACT, SET_NEW_HOF, CLEAR_NEW_ACCOUNT,
} from "../constants/Enrollment"
import {
  Frequency,
} from '../constants/Finances'
import uuid from "uuid"

const initialState = {
  id: uuid(),
  balance: 0,
  rate: 0,
  paid:0,
  frequency: Frequency.Daily,
  children: {},
  guardians: {},
  contacts: {},
  hofs: {},
}


const newAccountReducer = (state = initialState, action) => {
  const newState = { ...state }

  switch(action.type) {
    case SET_RATE: {
      newState.rate = action.rate
      return newState
    }
    case SET_FREQUENCY: {
      newState.frequency = action.frequency
      return newState
    }
    case SET_NEW_CHILD: {
      newState.children[action.id] = action.child
      return newState
    }
    case SET_NEW_GUARDIAN: {
      newState.guardians[action.id] = action.guardian
      return newState
    }
    case SET_NEW_CONTACT: {
      newState.contacts[action.id] = action.contact
      return newState
    }
    case SET_NEW_HOF: {
      newState.hofs[action.id] = action.hof
      return newState
    }
    case DELETE_NEW_CHILD: {
      delete newState.contacts[action.id]
      return newState
    }

    case CLEAR_NEW_ACCOUNT: {
     
    
      // newState.id=uuid()
      // newState.contacts={}
      // newState.children={}
      // newState.guardians={}
      // newState.balance=0;
      // newState.contacts={}
      // newState.frequency=Frequency.Daily
      // newState.hofs={}
      // newState.
      console.log(state)
      console.log("deleted")
      console.log(newState.newAccount)
       
      console.log("tob= be deleted")
      console.log(state.newAccount)
      return newState
    }
    case DELETE_NEW_GUARDIAN: {
      delete newState.guardians[action.id]
      return newState
    }
    case DELETE_NEW_CONTACT: {
      delete newState.contacts[action.id]
      return newState
    }
    default: {
      return newState
    }
  }
}

export default newAccountReducer
