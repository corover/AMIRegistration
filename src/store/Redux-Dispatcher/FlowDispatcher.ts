import {
  language_view,
  mobile_no_view,
  name_view,
  genarate_otp_view,
  gender_view,
  dob_view,
  state_view,
  district_view,
  pincode_view,
  city_view,
  area_Intrest,
  reset_profile
} from "../Redux-actions/flowViewActions";
import store from "../Redux/Redux-Store";

export const setLanguage_view = (val: any) => {
  store.dispatch(language_view(val));
};

export const setMobile_no_view = (val: any) => {
  store.dispatch(mobile_no_view(val));
};

export const setGenarateOTP_view = (val: any) => {
  store.dispatch(genarate_otp_view(val));
};

export const setName_view = (val: any) => {
  store.dispatch(name_view(val));
};

export const setGender_view = (val: any) => {
  store.dispatch(gender_view(val));
};

export const setDOB_view = (val: any) => {
  store.dispatch(dob_view(val));
};

export const setState_view = (val: any) => {
  store.dispatch(state_view(val));
};

export const setDistrict_view = (val: any) => {
  store.dispatch(district_view(val));
};

export const setPinCode_view = (val: any) => {
  store.dispatch(pincode_view(val));
};

export const setCity_view = (val: any) => {
  store.dispatch(city_view(val));
};

export const setIntrest_view = (val: any) => {
  store.dispatch(area_Intrest(val));
};


export const setReset_View =()=>{
  store.dispatch(reset_profile())
}