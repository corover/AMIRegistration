import {
  LANGUAGE_VIEW,
  MOBILE_NO_VIEW,
  GENARATE_OTP_VIEW,
  NAME_VIEW,
  GENDER_VIEW,
  DOB_VIEW,
  STATE_VIEW,
  DISTRICT_VIEW,
  CITY_VIEW,
  PINCODE_VIEW,
  RESET_PROFILE,
  AREA_OF_INTREST,
  LOCATION_VIEW,
} from "../Redux-actions/flowViewActions";

const initialState = {
  languageView: true,
  mobileNoView: false,
  generateOtpView: false,
  nameView: false,
  genderView: false,
  dobView: false,
  stateView: false,
  districtView: false,
  cityView: false,
  pincodeView: false,
  areaOfIntrest: false,
  locationView: false,
};

// Reducer function
const flowReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LANGUAGE_VIEW:
      return { ...state, languageView: action.payload };
    case MOBILE_NO_VIEW:
      return { ...state, mobileNoView: action.payload };
    case GENARATE_OTP_VIEW:
      return { ...state, generateOtpView: action.payload };
    case LOCATION_VIEW:
      return { ...state, locationView: action.payload };
    case NAME_VIEW:
      return { ...state, nameView: action.payload };
    case GENDER_VIEW:
      return { ...state, genderView: action.payload };
    case DOB_VIEW:
      return { ...state, dobView: action.payload };
    case STATE_VIEW:
      return { ...state, stateView: action.payload };
    case DISTRICT_VIEW:
      return { ...state, districtView: action.payload };
    case CITY_VIEW:
      return { ...state, cityView: action.payload };
    case PINCODE_VIEW:
      return { ...state, pincodeView: action.payload };
    case AREA_OF_INTREST:
      return { ...state, areaOfIntrest: action.payload };
    case RESET_PROFILE:
      return {
        ...state,
        languageView: false,
        mobileNoView: false,
        generateOtpView: false,
        nameView: false,
        genderView: false,
        dobView: false,
        stateView: false,
        districtView: false,
        cityView: false,
        pincodeView: false,
        areaOfIntrest: false,
        locationView: false,
      };

    default:
      return state;
  }
};

export default flowReducer;
