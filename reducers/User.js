
import {AsyncStorage} from 'react-native';
import { combineReducers } from 'redux'
import {SAVE_USER}  from '../constants/User'
const initialState = {
  id: null,
  sessionId: null,
  username: null,
  password: null,
  address:null,
  centreName:null,
  city:null,
  firstName:null,
  phone:null,
  email:null,
  lastName:null,
 
};

function currentUser (state = initialState, action)  {
  switch (action.type) {
    case SAVE_USER:
      // save sessionId & userId in AsyncStorage
      if (action.user.sessionId) {
        AsyncStorage.setItem('sessionId', action.user.sessionId);
      }
      if (action.user.id) {
        AsyncStorage.setItem('userId', action.user.id);
      }
      return {
        ...state,
        id: action.user.id || state.id,
        sessionId: action.user.sessionId || state.sessionId,
        username: action.user.username || state.username,
        password: action.user.password || state.password,
        centreName: action.user.centreName || state.centreName,
        city: action.user.city || state.city,
        firstName: action.user.firstName || state.firstName,
        lastName: action.user.lastName || state.lastName,
        phone: action.user.phone || state.phone,  
        email: action.user.email || state.email,  
      };
      default:
      return state;
  }
}


const userData = combineReducers({
  currentUser
})

export default userData