export const NEXT_CONTEXT = "NEXT_CONTEXT";
export const API_DATA = "API_DATA";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const PROFILE_ISBLOCKED = "PROFILE_ISBLOCKED";
export const PROFILE_ISNEW_USER = "PROFILE_ISNEW_USER";
export const PROFILE_HASPROFILE = "PROFILE_HASPROFILE";
export const LOCATION = "LOCATION";
export const ENABLE_LOCATION = "ENABLE_LOCATION";

export const nextContextState = (value: any) => ({
  type: NEXT_CONTEXT,
  payload: value,
});

export const api_Data = (value: any) => ({
  type: API_DATA,
  payload: value,
});

export const access_Token = (value: any) => (
  // sessionStorage.setItem("ami-accessToken", value),
  {
    type: ACCESS_TOKEN,
    payload: value,
  }
);

export const profileIsBlocked = (value: any) => ({
  type: PROFILE_ISBLOCKED,
  payload: value,
});

export const profile_IsNewUser = (value: any) => ({
  type: PROFILE_ISNEW_USER,
  payload: value,
});

export const profile_HasProfile = (value: any) => ({
  type: PROFILE_HASPROFILE,
  payload: value,
});

export const location = (value: any) => ({
  type: LOCATION,
  payload: value,
});

export const EnableLocation = (value: any) => ({
  type: ENABLE_LOCATION,
  payload: value,
});
