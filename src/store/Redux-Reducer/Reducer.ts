import {
  LOADING,
  SELECTED_LANGUAGE,
  TRANSCRIPT_STATE,
  BACKGROUND_COLOR,
  CHECK_MIC,
} from "../Redux-actions/Actions";

const initialState = {
  selectedLanguage: "en",
  transcriptState: "",
  loading: false,
  bgColor: "white",
  checkMic: true,
};

const reducer_ = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };

    case TRANSCRIPT_STATE:
      return {
        ...state,
        transcriptState: action.payload,
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case BACKGROUND_COLOR:
      return {
        ...state,
        bgColor: action.payload,
      };

    case CHECK_MIC:
      return {
        ...state,
        checkMic: action.payload,
      };
    default:
      return state;
  }
};

export default reducer_;
