export const LANGUAGE_DATA = "LANGUAGE_DATA";
export const MOBILE_NO_DATA = "MOBILE_NO_DATA";
export const GENARATE_OTP_DATA = "GENARATE_OTP_DATA";
export const NAME_DATA = "NAME_DATA";
export const GENDER_DATA = "GENDER_DATA";
export const DOB_DATA = "DOB_DATA";
export const STATE_DATA = "STATE_DATA";
export const DISTRICT_DATA = "DISTRICT_DATA";
export const CITY_DATA = "CITY_DATA";
export const PINCODE_DATA = "PINCODE_DATA";
export const RESET_PROFILE = "RESET_PROFILE";

export const language_data = (value: any) => ({
  type: LANGUAGE_DATA,
  payload: value,
});

export const mobileNo_data = (value: any) => (
  
  {
  type: MOBILE_NO_DATA,
  payload: value,
});

export const genarateOTP_data = (value: any) => ({
  type: GENARATE_OTP_DATA,
  payload: value,
});

export const name_data = (value: any) => ({
  type: NAME_DATA,
  payload: value,
});

export const gender_data = (value: any) => ({
  type: GENDER_DATA,
  payload: value,
});

export const dob_data = (value: any) => ({
  type: DOB_DATA,
  payload: value,
});

export const state_data = (value: any) => ({
  type: STATE_DATA,
  payload: value,
});

export const district_data = (value: any) => ({
  type: DISTRICT_DATA,
  payload: value,
});

export const city_data = (value: any) => ({
  type: CITY_DATA,
  payload: value,
});

export const pincode_data = (value: any) => ({
  type: PINCODE_DATA,
  payload: value,
});

export const reset_profile = () => ({
  type: RESET_PROFILE,
});
