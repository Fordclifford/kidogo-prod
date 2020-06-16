import {
  SET_HOF, UPDATE_HOF, DELETE_HOF
} from "../constants/Hof"


const hofReducer = (state = {}, action) => {
  const newState = { ...state }

  switch (action.type) {
    case SET_HOF: {
      newState[action.id] = action.hof
      return newState
    }
    case UPDATE_HOF: {
      newState[action.id] = Object.assign(
        {}, newState[action.id], action.update
      )
      return newState
    }
    case DELETE_HOF: {
      delete newState[action.id]
      return newState
    }
    default: {
      return newState
    }
  }
}

export default hofReducer
