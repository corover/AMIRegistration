import store from "../Redux/Redux-Store";

export const State = (state: any) => state;

export const apiSelector = (state: any) => state.apiReducer;

export const userProfileState = (state: any) => state.userProfileReducer;

export const reducer = (state: any) => state.reducer;

export const flowReducer = (state: any) => state.flowReducer;

export const lang = store.getState().reducer.selectedLanguage;

export let accessToken = store.getState().apiReducer.accessToken;