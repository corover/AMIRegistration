import store from "../Redux/Redux-Store";
import {
  selectedLanguage,
  transcriptState,
  loading,
  backgroundColor,
  checkMic,
} from "../Redux-actions/Actions";

export const setSelectedLanguage = (val: any) => {
  val === "hi"
    ? store.dispatch(selectedLanguage("hi"))
    : store.dispatch(selectedLanguage("en"));
};

export const setTranscriptState = (val: any) => {
  store.dispatch(transcriptState(val));
};

export const setLoading = (val: boolean) => {
  store.dispatch(loading(val));
};

export const setBackgroundColor = (val: any) => {
  store.dispatch(backgroundColor(val));
};

export const setCheckMic = (val: any) => {
  store.dispatch(checkMic(val));
};
