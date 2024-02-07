import moment from "moment";
import {
  api_Data,
  nextContextState,
  access_Token,
  profileIsBlocked,
  profile_HasProfile,
  profile_IsNewUser,
} from "../Redux-actions/ApiActions";
import store from "../Redux/Redux-Store";
import {
  setLanguage_view,
  setMobile_no_view,
  setGenarateOTP_view,
  setName_view,
  setGender_view,
  setDOB_view,
  setState_view,
  setDistrict_view,
  setCity_view,
  setPinCode_view,
  setIntrest_view,
  setReset_View,
} from "./FlowDispatcher";
import {
  setLanguageData_,
  setMobileData,
  setNameData,
  setGenderData,
  setDOB,
  setState,
  setCity,
} from "./UserDispatcher";

import { setBackgroundColor } from "./Dispatcher";

export const setNextContext = (val: any) => {
  store.dispatch(nextContextState(val.next_context));
  store.dispatch(api_Data(val));

  switch (val.next_context) {
    case "434171c7-254e-4693-9bd2-4e054f5f3e39":
      setLanguage_view(!val.mobileView);
      setMobile_no_view(val.mobileView);
      setLanguageData_(val.language);
      setBackgroundColor("#91278F");
      break;

    case "d37f2888-863b-4c55-8791-9751d0ed575a":
      setLanguage_view(!val.otpValidationView);
      setMobile_no_view(!val.otpValidationView);
      setGenarateOTP_view(val.otpValidationView);
      setBackgroundColor("#91278F");
      setMobileData(val.mobile);
      break;

    case "07a5c12c-22fb-4faa-88cb-ef7ebb0297a6":
      setGenarateOTP_view(!val.nameView);
      setName_view(val.nameView);
      store.dispatch(access_Token(val.data.accessToken));
      store.dispatch(profileIsBlocked(val.data.isBlocked));
      store.dispatch(profile_HasProfile(val.data.hasProfile));
      store.dispatch(profile_IsNewUser(val.data.isNewUser));
      setBackgroundColor("#91278F");
      break;

    case "862a79a6-3a3c-46f3-8721-332fe4ef4c75":
      setName_view(false);
      setGender_view(true);
      setNameData(val.name);
      setBackgroundColor("#91278F");
      break;

    case "862a79a6-3a3c-46f3-8721-332fe4ef4c00":
      setGender_view(!val.dobView);
      setDOB_view(val.dobView);
      setGenderData(val.gender.charAt(0).toUpperCase() + val.gender.slice(1));
      setBackgroundColor("#91278F");
      break;

    case "709a143c-93b5-4211-a789-61123b3e3a3c":
      setDOB_view(false);
      setDOB(moment(val.dob).format("YYYY-MM-DD"));
      setState_view(true);
      setBackgroundColor("#91278F");
      break;

    case "c6c0d759-f3af-44b6-825b-5909135e3b44":
      setState_view(false);
      setState(val.state);
      setDistrict_view(true);
      setBackgroundColor("#91278F");
      break;

    case "0c8ec39f-5088-4315-b13d-7d7b67b5ad4c":
      setDistrict_view(false);
      setCity_view(true);
      setBackgroundColor("#91278F");
      break;

    case "4b7c27be-5f61-437e-a271-ad72c9a20d5a":
      setCity_view(false);
      setPinCode_view(true);
      setCity(val.city);
      setBackgroundColor("#91278F");
      break;

    case "4b7c27be-5f61-437e-a271-ad72c9a11y66":
      setPinCode_view(false);
      setIntrest_view(true);
      setBackgroundColor("white");
      break;

    default:
      break;
  }

  if (val.flowComplete) {
    // setReset_View();
  }
};
