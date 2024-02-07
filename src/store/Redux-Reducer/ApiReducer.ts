import {
  ACCESS_TOKEN,
  API_DATA,
  NEXT_CONTEXT,
  PROFILE_HASPROFILE,
  PROFILE_ISBLOCKED,
  PROFILE_ISNEW_USER,
} from "../Redux-actions/ApiActions";

const initialState = {
  nextContext: "94e1c6f9-a0d8-45e9-96f7-b5261bb9bb8b",
  apiData: undefined,
  accessToken: "",
  isBlocked: false,
  hasProfile: false,
  isNewUser: false,
};

const apiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NEXT_CONTEXT:
      return {
        ...state,
        nextContext: action.payload,
      };

    case API_DATA:
      return {
        ...state,
        apiData: action.payload,
      };

    case ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };

    case PROFILE_ISBLOCKED:
      return {
        ...state,
        isBlocked: action.payload,
      };

    case PROFILE_HASPROFILE:
      return {
        ...state,
        hasProfile: action.payload,
      };

    case PROFILE_ISNEW_USER:
      return {
        ...state,
        isNewUser: action.payload,
      };

    default:
      return state;
  }
};

export default apiReducer;
