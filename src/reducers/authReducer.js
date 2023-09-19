import { types } from "../types/types";

const authReducer = (state, action) => {
  switch (action.type) {

    case types.auth.loginType:
      return  {

        ...state,
        user: action.payload.user,
        isLogged: true,
        errorMessage: ''
        //action.payload
      }
      

    case types.auth.logoutType:
      return  {

        ...state,
        user: null,
        isLogged: false,
        errorMessage: ''
        //action.payload
      }
    default:
      return state;
  }
};

export default authReducer;