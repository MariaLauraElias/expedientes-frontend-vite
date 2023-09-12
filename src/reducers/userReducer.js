import { types } from "../types/types";

const userReducer = (state =[], action) => {
  switch (action.type) {

    case types.user.getAllType:
      return (    
        action.payload
      )
    case types.user.addType:
      return [
        ...state,
        action.payload
      ]

    case types.user.updateType:
      return [
        ...state,
        action.payload
      ]

    case types.user.deleteType:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
};
export default userReducer;