import React from "react";
import {
  CloseIcon,
  ContainerVoice,
  VoiceRecognitionContainer,
  VoiceRecognitionSpan,
} from "../UI/Style";

import { useSelector } from "react-redux";
import { flowReducer } from "../store/Redux-selector/Selector";
import { playAudio } from "../utils/data";
function ListeningMic() {
  const { languageView } = useSelector(flowReducer);

  React.useEffect(() => {
    playAudio(
      "https://coroverbackendstorage.blob.core.windows.net/chatbot-audio-bucket/start.mp3"
    );

    return () => {
      playAudio(
        "https://coroverbackendstorage.blob.core.windows.net/chatbot-audio-bucket/caught.mp3"
      );
    };
  }, []);

  return (
    <div
      style={{
        height: languageView ? "100%" : "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <VoiceRecognitionContainer className={"VoiceRecognitionContainer"}>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <img src="registration/Mic.svg" alt="mic" style={{ zIndex: 999 }} />

        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
        <VoiceRecognitionSpan
          className={"VoiceRecognitionSpan"}
        ></VoiceRecognitionSpan>
      </VoiceRecognitionContainer>
    </div>
  );
}

export default ListeningMic;
