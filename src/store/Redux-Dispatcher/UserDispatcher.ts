import {
  language_data,
  mobileNo_data,
  name_data,
  gender_data,
  dob_data,
  city_data,
  pincode_data,
  district_data,
  state_data,
  reset_profile,
} from "../Redux-actions/UserDataActions";
import store from "../Redux/Redux-Store";

export const setLanguageData_ = (val: any) => {
  store.dispatch(language_data(val));
};

export const setMobileData = (val: any) => {
  store.dispatch(mobileNo_data(val));
};

export const setNameData = (val: any) => {
  store.dispatch(name_data(val));
};

export const setGenderData = (val: any) => {
  store.dispatch(gender_data(val));
};

export const setDOB = (val: any) => {
  store.dispatch(dob_data(val));
};

export const setState = (val: any) => {
  store.dispatch(state_data(val));
};

export const setCity = (val: any) => {
  store.dispatch(city_data(val));
};

export const setDistrict = (val: any) => {
  store.dispatch(district_data(val));
};

export const setPinCode = (val: any) => {
  store.dispatch(pincode_data(val));
};

export const setReset_profile = () => {
  store.dispatch(reset_profile());
};
