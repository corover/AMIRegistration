import React, { useState, useEffect } from "react";
import {
  CloseIcon,
  ContainerVoice,
  VoiceRecognitionContainer,
  VoiceRecognitionSpan,
} from "../../UI/Style";
import { CheckCircleSharp, Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FlowHeaders, Listening } from "../../translation";
import { useSelector } from "react-redux";
import { reducer } from "../../store/Redux-selector/Selector";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import { setName_view } from "../../store/Redux-Dispatcher/FlowDispatcher";
import { registerFlow } from "../../Apis";
import { apiSelector } from "../../store/Redux-selector/Selector";
import { userProfileState } from "../../store/Redux-selector/Selector";
import { setPinCode } from "../../store/Redux-Dispatcher/UserDispatcher";
import { isResponse, playAudioURL, getFrequentVoice } from "../../utils/data";
import { audio } from "../../translation";
import { setCheckMic } from "../../store/Redux-Dispatcher/Dispatcher";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";

function PinCode() {
  const { selectedLanguage } = useSelector(reducer);
  const { mobileNoData } = useSelector(userProfileState);
  const [askValue, setAskValue] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [renderMic, setRenderMic] = useState(false);
  const [dots, setDots] = useState(3);
  const [transcriptState, setTranscriptState] = useState("");

  const { nextContext, apiData } = useSelector(apiSelector);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorState] = useState("");
  const [error, setError] = useState(true);
  const [optWorng, setOtpWorng] = useState(false);
  const [continuePinCode, setContinuePinCode] = useState(false);

  const flowComplete = useSelector(userProfileState);

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
    // setPinCode(event.target.value);

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
    await registerFlow(transcriptState, nextContext);
  };

  const skipPinCode = async () => {
    setTimeout(async () => {
      await registerFlow(transcriptState, nextContext);
    }, 1000);
  };

  const optWrong = () => {
    return (
      <p style={{ color: "red", fontSize: "15px" }}>
        {(FlowHeaders as any)[selectedLanguage]?.optWrong}
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
    }, 1800);

    const value_ = setTimeout(() => {
      if (tryAgain && transcript.length > 0) {
        setTryAgain(false);
        setCheckValue(false);
        handleCloseMic();
      }
    }, 2200);

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
          ? "https://storage.googleapis.com/ami-tts-storage/428b4643-5354-4cbd-a1d0-3e2c76652ed5.wav"
          : "https://storage.googleapis.com/ami-tts-storage/c39856bc-bac3-4c86-a260-4b2093594dfd.wav",
        apiData.audio,
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

    return () => {
      clearInterval(interval);
      stopRecognition();
      setTranscriptState("");
      resetTranscript();
    };
  }, [apiData.audio]);

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
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [listening, transcript]);

  useEffect(() => {
    if (!checkValue && askValue) {
      // transcript.length > 0 && setPinCode(transcript.replace(/\s/g, ""));
      setTranscriptState(transcript.replace(/\s/g, ""));
      setInputValue(transcript.replace(/\s/g, ""));
    }

    let response = isResponse(transcript, selectedLanguage);

    if (error && response === "positive") {
      handleCloseMic();
      handleSubmit();
    }

    if (response === "negative") {
      handleCloseMic();
      handleNo();
    }
  }, [transcript]);

  useEffect(() => {
    if (inputValue.length === 6 && /^[0-9]+$/.test(inputValue)) {
      setError(true);
    } else {
      setError(false);
      setErrorState(
        selectedLanguage === "en"
          ? `Enter 6 digit number`
          : `6 अंकीय संख्या दर्ज करें`
      );
    }
  }, [inputValue, error]);

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
                {(FlowHeaders as any)[selectedLanguage]?.pincode}
              </p>
            </div>
          </div>

          {continuePinCode ? (
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
              <VoiceRecognitionContainer
                className={"VoiceRecognitionContainer"}
              >
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
                  transcript={transcript.replace(/\s/g, "")}
                  dots={dots}
                />
              )}
            </div>
          ) : (
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
                  fontFamily: 'IBM Plex Sans Devanagari ',
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#91278F",
                }}
                onClick={() => setContinuePinCode(true)}
              >
                {(FlowHeaders as any)[selectedLanguage]?.enter}
              </Button>

              <Button
                variant="contained"
                startIcon={<Cancel />}
                style={{
                  fontFamily: 'IBM Plex Sans Devanagari ',
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#91278F",
                }}
                onClick={skipPinCode}
              >
                {(FlowHeaders as any)[selectedLanguage]?.skip}
              </Button>
            </div>
          )}
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
                {(FlowHeaders as any)[selectedLanguage]?.reg}
              </h3>

              <p style={{ fontSize: "20px" }}>
                {" "}
                {(FlowHeaders as any)[selectedLanguage]?.pincode}
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
                {!error ? (
                  <p style={{ color: "red", fontSize: "15px" }}>
                    {errorMessage}
                  </p>
                ) : (
                  <span>{(FlowHeaders as any)[selectedLanguage]?.correct}</span>
                )}
                {optWorng && optWrong()}

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
                  disabled={!error || optWorng}
                  startIcon={<CheckCircleSharp />}
                  style={{
                    fontFamily: 'IBM Plex Sans Devanagari ',
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#91278F",
                  }}
                  onClick={handleSubmit}
                >
                  {(FlowHeaders as any)[selectedLanguage]?.yes}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  style={{
                    fontFamily: 'IBM Plex Sans Devanagari ',
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    color: "#91278F",
                    border: "1px solid #91278F",
                  }}
                  onClick={handleNo}
                >
                  {(FlowHeaders as any)[selectedLanguage]?.no}
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
                  type="text"
                  maxLength={6}
                  placeholder={"******"}
                  onChange={handleInputChange}
                  value={transcriptState}
                  style={{
                    width: "100%",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "rgb(91, 91, 91)",
                    outline: "none",
                    letterSpacing: "22px",
                    textAlign: "center",
                    border: "1px solid white",
                  }}
                />

                <Button
                  variant="contained"
                  disabled={!error || optWorng}
                  startIcon={<CheckCircleSharp />}
                  style={{
                    fontFamily: 'IBM Plex Sans Devanagari ',
                    width: "104%",
                    borderRadius: "8px",
                    marginBottom: "100px",
                    backgroundColor: "#91278F",
                    marginTop: "10px",
                  }}
                  onClick={handleSubmit}
                >
                  {(FlowHeaders as any)[selectedLanguage]?.submit}
                </Button>
              </div>
            </>
          )}
        </ContainerVoice>
      )}
    </div>
  );
}

export default PinCode;
