import { types } from "../types/types";

const userReducer = (state ={}, action) => {
  switch (action.type) {

    case types.user.getAllType:
      return {
        ...state,
        users: action.payload.users,
        isLoaded: action.payload.isLoaded
      }
    case types.user.addType:
      return {
        ...state,
        users: action.payload.users,
        isLoaded: action.payload.isLoaded
      }

    case types.user.updateType:
      return {
        ...state,
        users: action.payload.users,
        isLoaded: action.payload.isLoaded
      }

    case types.user.deleteType:
      return {
        ...state,
        users: action.payload.users,
        isLoaded: action.payload.isLoaded
      }
    default:
      return state;
  }
};
export default userReducer;