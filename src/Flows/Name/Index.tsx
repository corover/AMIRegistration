import React, { useState, useEffect } from "react";
import {
  CloseIcon,
  ContainerVoice,
  VoiceRecognitionContainer,
  VoiceRecognitionSpan,
} from "../../UI/Style";
import { CheckCircleSharp, Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Translations, Listening } from "../../translation";
import { useSelector } from "react-redux";
import { reducer } from "../../store/Redux-selector/Selector";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import { setName_view } from "../../store/Redux-Dispatcher/FlowDispatcher";
import { registerFlow } from "../../Apis";
import { apiSelector } from "../../store/Redux-selector/Selector";
import { userProfileState } from "../../store/Redux-selector/Selector";
import { setPinCode } from "../../store/Redux-Dispatcher/UserDispatcher";
import { filterValue, isResponse, playAudioURL } from "../../utils/data";
import { audio } from "../../translation";
import { setCheckMic } from "../../store/Redux-Dispatcher/Dispatcher";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";

function Name() {
  const { selectedLanguage } = useSelector(reducer);
  const [askValue, setAskValue] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [renderMic, setRenderMic] = useState(false);
  const [dots, setDots] = useState(3);
  const [transcriptState, setTranscriptState] = useState("");
  const { nextContext, apiData, accessToken, location, enableLocation } =
    useSelector(apiSelector);
  const [inputValue, setInputValue] = useState("");
  const { mobileNoData } = useSelector(userProfileState);
  const {
    transcript,
    startRecognition,
    stopRecognition,
    isSpeechRecognitionSupported,
    requestPermission,
    listening,
    resetTranscript,
  } = useSpeechRecognitionHook();

  const handleInputChange = (event: any) => {
    setTranscriptState(event.target.value);
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    // isSpeechRecognitionSupported() ? startRecognition() : requestPermission();
    setCheckMic(true);
    playAudioURL(
      [(audio as any)[selectedLanguage]?.itsCorrect],
      isSpeechRecognitionSupported,
      startRecognition,
      requestPermission
    );
  };

  const handleCloseMic = () => {
    stopRecognition();
    setRenderMic(false);
  };

  const handleSubmit = async () => {
    stopRecognition();
    await registerFlow(inputValue, nextContext);

    //   case nameReg:
    //     await registerFlow(inputValue, nextContext);
    //     setName_view(false);
  };

  const optWrong = () => {
    return (
      <p style={{ color: "red", fontSize: "15px" }}>
        {(Translations as any)[selectedLanguage]?.optWrong}
      </p>
    );
  };

  const handleNo = () => {
    setTryAgain(true);
    setCheckValue(false);
    stopRecognition();
  };

  useEffect(() => {
    const value = setTimeout(() => {
      if (askValue && transcript.length > 0) {
        setAskValue(false);
        setCheckValue(true);
        handleCloseMic();
      }
    }, 1500);

    const value_ = setTimeout(() => {
      if (tryAgain && transcript.length > 0) {
        setTryAgain(false);
        setCheckValue(false);
        handleCloseMic();
      }
    }, 1800);

    return () => {
      clearTimeout(value);
      clearTimeout(value_);
      // setTranscriptState("")
    };
  }, [transcriptState]);

  useEffect(() => {
    playAudioURL(
      [
        selectedLanguage === "en"
          ? "https://storage.googleapis.com/ami-tts-storage/837aff98-8275-4d1b-a7b9-a350b8d5d007.wav"
          : "https://storage.googleapis.com/ami-tts-storage/d31f1cf2-bde3-4311-9cde-cab7cf97746d.wav",
        apiData && apiData.audio,
      ],
      isSpeechRecognitionSupported,
      startRecognition,
      requestPermission
    );
    const interval = setInterval(() => {
      setDots((dots) => {
        return dots < 3 ? dots + 1 : 0;
      });
    }, 500);

    // if (enableLocation && accessToken.length > 0) {
    //   locationApi(location.lat, location.lng, mobileNoData);
    // }
    return () => {
      clearInterval(interval);
      stopRecognition();
      setTranscriptState("");
      resetTranscript();
      playAudioURL(
        [
          selectedLanguage === "en"
            ? "https://storage.googleapis.com/ami-tts-storage/837aff98-8275-4d1b-a7b9-a350b8d5d007.wav"
            : "https://storage.googleapis.com/ami-tts-storage/d31f1cf2-bde3-4311-9cde-cab7cf97746d.wav",
          apiData && apiData.audio,
        ],
        isSpeechRecognitionSupported,
        startRecognition,
        requestPermission
      ).pauseOrStopAudio(true);
    };
  }, []);

  useEffect(() => {
    let timmer: any;
    //   // if (askValue) {
    //   //   timmer = setTimeout(() => {
    //   //     // handleClick();
    //   //     // setRenderMic(true);
    //   //   }, 500);
    //   // }

    if (checkValue) {
      timmer = setTimeout(() => {
        handleClick();
        //  setRenderMic((prevState) => !prevState);
      }, 500);
    }
    return () => {
      clearTimeout(timmer);
    };
  }, [askValue, tryAgain]);

  useEffect(() => {
     const timeoutId = setTimeout(() => {
      setRenderMic(listening);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [listening, transcript]);

  useEffect(() => {
    if (!checkValue && askValue) {
      setTranscriptState((transcript));
      setInputValue((transcript));
    }

    let response = checkValue && isResponse(transcript, selectedLanguage);

    if (response === "positive") {
      handleCloseMic();
      handleSubmit();
    }

    if (response === "negative") {
      handleCloseMic();
      handleNo();
    }
  }, [transcript]);

  return (
    <div>
      {askValue ? (
        // ask details no1
        <ContainerVoice className={"ContainerVoice"}>
          <div style={{ height: "100%", flexGrow: 1, paddingBottom: "30px" }}>
            <div
              style={{
                margin: "auto",
                textAlign: "justify",
                padding: "0px 15px 0px 15px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                {(Translations as any)[selectedLanguage]?.name}
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
              <img
                src="Mic.svg"
                alt="mic"
                style={{ zIndex: 999 }}
                onClick={() =>
                  isSpeechRecognitionSupported()
                    ? startRecognition()
                    : requestPermission()
                }
              />
            </VoiceRecognitionContainer>
            {renderMic && (
              <Mic
                handleCloseMic={handleCloseMic}
                inputValue={inputValue}
                transcript={transcript}
                dots={dots}
              />
            )}
          </div>
        </ContainerVoice>
      ) : (
        // verfi the micData no2
        <ContainerVoice className={"ContainerVoice"}>
          <div
            style={{
              height: "100%",
              flexGrow: 1,
              borderRadius: "30px",
            }}
          >
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                padding: "15px",
                backgroundColor: " #F0D9F0 ",
                borderTopRightRadius: "14px",
                borderTopLeftRadius: "14px",
              }}
            >
              <h3 style={{ fontSize: "24px" }}>
                {(Translations as any)[selectedLanguage]?.reg}
              </h3>

              <p style={{ fontSize: "20px" }}>
                {(Translations as any)[selectedLanguage]?.name}
              </p>
            </div>
          </div>

          {checkValue ? (
            <>
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    paddingTop: "5px",
                    fontWeight: "400",
                    color: "#91278F",
                    wordBreak: "break-word",
                  }}
                >
                  {transcriptState}
                </span>
              </div>
              <div
                style={{
                  padding: "5px",
                  fontSize: "17px",
                  cursor: "pointer",
                  margin: "20px 100px 20px 100px",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<CheckCircleSharp />}
                  style={{
                    fontFamily: "IBM Plex Sans Devanagari ",
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#91278F",
                  }}
                  onClick={handleSubmit}
                >
                  {(Translations as any)[selectedLanguage]?.yes}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  style={{
                    fontFamily: "IBM Plex Sans Devanagari ",
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    color: "#91278F",
                    border: "1px solid #91278F",
                  }}
                  onClick={handleNo}
                >
                  {(Translations as any)[selectedLanguage]?.no}
                </Button>

                {listening && <ListeningMic />}
              </div>
            </>
          ) : (
            // submit no4
            <>
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  className="inputSchemes"
                  onChange={handleInputChange}
                  value={transcriptState}
                  type="text"
                />

                <Button
                  variant="contained"
                  startIcon={<CheckCircleSharp />}
                  style={{
                    fontFamily: "IBM Plex Sans Devanagari ",
                    width: "104%",
                    borderRadius: "8px",
                    marginBottom: "100px",
                    backgroundColor: "#91278F",
                    marginTop: "10px",
                  }}
                  onClick={handleSubmit}
                >
                  {(Translations as any)[selectedLanguage]?.submit}
                </Button>
              </div>
            </>
          )}
        </ContainerVoice>
      )}
    </div>
  );
}

export default Name;
