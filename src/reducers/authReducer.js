import { types } from "../types/types";

const authReducer = (state, action) => {
  switch (action.type) {

    case types.auth.loginType:
      return ( 
        action.payload
      )

    case types.auth.logoutType:
      return (
        action.payload
      )
    default:
      return state;
  }
};

export default authReducer;