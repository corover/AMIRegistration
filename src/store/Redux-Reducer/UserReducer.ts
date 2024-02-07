import {
  LANGUAGE_DATA,
  MOBILE_NO_DATA,
  GENARATE_OTP_DATA,
  NAME_DATA,
  GENDER_DATA,
  DOB_DATA,
  STATE_DATA,
  DISTRICT_DATA,
  CITY_DATA,
  PINCODE_DATA,
  RESET_PROFILE,
} from "../Redux-actions/UserDataActions";

const initialState = {
  languageData:"en",
  mobileNoData: null,
  generateOtpData: null,
  nameData: null,
  genderData: null,
  dobData: null,
  stateData: null,
  districtData: null,
  cityData: null,
  pincodeData: null,
};

// Reducer function
const userProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LANGUAGE_DATA:
      return { ...state, languageData: action.payload };
    case MOBILE_NO_DATA:
      return { ...state, mobileNoData: action.payload };
    case GENARATE_OTP_DATA:
      return { ...state, generateOtpData: action.payload };
    case NAME_DATA:
      return { ...state, nameData: action.payload };
    case GENDER_DATA:
      return { ...state, genderData: action.payload };
    case DOB_DATA:
      return { ...state, dobData: action.payload };
    case STATE_DATA:
      return { ...state, stateData: action.payload };
    case DISTRICT_DATA:
      return { ...state, districtData: action.payload };
    case CITY_DATA:
      return { ...state, cityData: action.payload };
    case PINCODE_DATA:
      return { ...state, pincodeData: action.payload };
    case RESET_PROFILE:
      return {
        ...state,
        mobileNoData: null,
        generateOtpData: null,
        nameData: null,
        genderData: null,
        dobData: null,
        stateData: null,
        districtData: null,
        cityData: null,
        pincodeData: null,
      };

    default:
      return state;
  }
};

export default userProfileReducer;
