import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  CloseIcon,
  ContainerVoice,
  VoiceRecognitionContainer,
  VoiceRecognitionSpan,
} from "../UI/Style";
import { playAudioURL } from "../utils/data";
import useSpeechRecognitionHook from "../Hooks/useSpeechRecognitionHook";
import { Listening } from "../translation";
import { reducer } from "../store/Redux-selector/Selector";

function Mic(props: any) {
  const {  handleCloseMic, inputValue, transcript, dots } = props;

  const { selectedLanguage } = useSelector(reducer);

  return (
    <ContainerVoice className={"ContainerVoice"} style={{ bottom: "0px" }}>
      <CloseIcon
        className={"CloseIcon"}
        src="close.png"
        width={15}
        height={15}
        alt="close"
        onClick={handleCloseMic}
      />

      <div style={{ height: "100%", flexGrow: 1, paddingBottom: "30px" }}>
        <div
          style={{
            margin: "auto",
            textAlign: "justify",
            padding: "0px 15px 0px 15px",
          }}
        >
          <p style={{ textAlign: "center", fontSize: "20px" }}>
            {inputValue == ""
              ? (Listening as any)[selectedLanguage] + ".".repeat(dots)
              : transcript}
          </p>
        </div>
      </div>

      <div
        style={{
          height: "50%",
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
          <img
            src="Mic.svg"
            alt="mic"
            style={{ zIndex: 999 }}
          />

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
    </ContainerVoice>
  );
}

export default Mic;
