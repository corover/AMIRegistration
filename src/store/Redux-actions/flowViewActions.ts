export const LANGUAGE_VIEW = "LANGUAGE_VIEW";
export const MOBILE_NO_VIEW = "MOBILE_NO_VIEW";
export const GENARATE_OTP_VIEW = "GENARATE_OTP_VIEW";
export const NAME_VIEW = "NAME_VIEW";
export const GENDER_VIEW = "GENDER_VIEW";
export const DOB_VIEW = "DOB_VIEW";
export const STATE_VIEW = "STATE_VIEW";
export const DISTRICT_VIEW = "DISTRICT_VIEW";
export const CITY_VIEW = "CITY_VIEW";
export const PINCODE_VIEW = "PINCODE_VIEW";
export const RESET_PROFILE = "RESET_PROFILE";
export const AREA_OF_INTREST = "AREA_OF_INTREST";

export const language_view = (value: any) => ({
  type: LANGUAGE_VIEW,
  payload: value,
});

export const mobile_no_view = (value: any) => ({
  type: MOBILE_NO_VIEW,
  payload: value,
});

export const genarate_otp_view = (value: any) => ({
  type: GENARATE_OTP_VIEW,
  payload: value,
});

export const name_view = (value: any) => ({
  type: NAME_VIEW,
  payload: value,
});

export const gender_view = (value: any) => ({
  type: GENDER_VIEW,
  payload: value,
});

export const dob_view = (value: any) => ({
  type: DOB_VIEW,
  payload: value,
});

export const state_view = (value: any) => ({
  type: STATE_VIEW,
  payload: value,
});

export const district_view = (value: any) => ({
  type: DISTRICT_VIEW,
  payload: value,
});

export const city_view = (value: any) => ({
  type: CITY_VIEW,
  payload: value,
});

export const pincode_view = (value: any) => ({
  type: PINCODE_VIEW,
  payload: value,
});

export const area_Intrest = (value: any) => ({
  type: AREA_OF_INTREST,
  payload: value,
});

export const reset_profile = () => ({
  type: RESET_PROFILE,
});
