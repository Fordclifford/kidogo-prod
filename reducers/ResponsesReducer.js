import { SET_RESPONSES, UPDATE_RESPONSES, DELETE_RESPONSES } from "../constants/Questions"

const responsesReducer = (state = {}, action) => {
  const newState = { ...state }

  switch (action.type) {
    case SET_RESPONSES: {
      newState[action.id] = action.responses
      return newState
    }
    case UPDATE_RESPONSES: {
      newState[action.id] = Object.assign({}, newState[action.id], action.update)
      return newState
    }
    case DELETE_RESPONSES: {
      delete newState[action.id]
      return newState
    }
    default: {
      return newState
    }
  }
}

export default responsesReducer
