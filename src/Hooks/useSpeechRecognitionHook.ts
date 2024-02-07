import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { registerFlow } from "../Apis";
import useRecorder from "../ChatBot/ChatContent/Recorder/UserRecorder";
import { useSelector } from "react-redux";
import { apiSelector } from "../store/Redux-selector/Selector";
import { lang } from "../store/Redux-selector/Selector";
import { reducer } from "../store/Redux-selector/Selector";
import { flowReducer } from "../store/Redux-selector/Selector";

function useSpeechRecognitionHook() {
  const { stateView, districtView, cityView, areaOfIntrest } =
    useSelector(flowReducer);
  const { selectedLanguage, checkMic } = useSelector(reducer);
  let selectedLanguage_ = selectedLanguage;
  const nextContext = useSelector(apiSelector).nextContext;
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const recorder = useRecorder((blob: any) => {
    registerFlow(blob, nextContext);
  });

  if (stateView || districtView || cityView || areaOfIntrest) {
    selectedLanguage_ = selectedLanguage;
  } else {
    selectedLanguage_ = "en";
  }

  const startRecognition = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: isIOS() ? `en-US` : `${selectedLanguage_}-IN`,
    });
    isIOS() && recorder.startRecording();
  };

  const stopRecognition = () => {
    SpeechRecognition.stopListening();
    isIOS() && recorder.saveRecording();
  };

  const isSpeechRecognitionSupported = () => {
    const supported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!supported) {
      console.error("Speech recognition is not supported on this device.");
    }

    return supported;
  };

  const isIOS = () => {
    const platform = window.navigator.platform.toLowerCase();
    return (
      (platform.includes("mac") || platform.startsWith("ip")) &&
      selectedLanguage !== "en" &&
      selectedLanguage !== "hi"
    );
  };

  const requestPermission = async () => {
    try {
      startRecognition();
      isIOS() && recorder.startRecording();
    } catch (error) {
      console.error("Permission denied:", error);
      alert("Error: " + error);
    }
  };

  return {
    transcript,
    startRecognition,
    stopRecognition,
    isSpeechRecognitionSupported,
    requestPermission,
    listening,
    resetTranscript,
  };
}

export default useSpeechRecognitionHook;
