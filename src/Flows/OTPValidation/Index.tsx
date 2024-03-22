import React, { useState, useEffect } from "react";
import { ContainerVoice, VoiceRecognitionContainer } from "../../UI/Style";
import { CheckCircleSharp, Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Translations } from "../../translation";
import { useSelector } from "react-redux";
import { reducer } from "../../store/Redux-selector/Selector";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import { registerFlow } from "../../Apis";
import { apiSelector } from "../../store/Redux-selector/Selector";
import { userProfileState } from "../../store/Redux-selector/Selector";
import {
  isResponse,
  playAudioURL,
  filterValue,
  playAudioCallBack,
} from "../../utils/data";
import { audio } from "../../translation";
import { setCheckMic } from "../../store/Redux-Dispatcher/Dispatcher";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";
import PopUp from "../../UI/PopUp";

function OTPValidation() {
  const [askValue, setAskValue] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [renderMic, setRenderMic] = useState(false);
  const [dots, setDots] = useState(3);
  const [transcriptState, setTranscriptState] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorState] = useState("");
  const [error, setError] = useState(true);
  const [optWorng, setOtpWorng] = useState(false);

  const { nextContext, apiData, location } = useSelector(apiSelector);
  const { selectedLanguage } = useSelector(reducer);
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
    setTranscriptState(filterValue(event.target.value));
    setInputValue(filterValue(event.target.value));
  };

  const handleClick = () => {
    setCheckMic(true);
    if (!optWorng) {
      playAudioURL(
        [(audio as any)[selectedLanguage]?.itsCorrect],
        isSpeechRecognitionSupported,
        startRecognition,
        requestPermission
      );
    } else {
      playAudioCallBack((audio as any)[selectedLanguage]?.otpErr, handleNo);
    }
  };

  const handleCloseMic = () => {
    stopRecognition();
    setRenderMic(false);
  };

  const handleSubmit = async () => {
    stopRecognition();

    await registerFlow(
      {
        mobile: mobileNoData,
        otp: inputValue.replace(/\s/g, ""),
        lat: location.lat,
        lng: location.lng,
      },
      nextContext
    );
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

  // useEffect(() => {
  //   const value = setTimeout(() => {
  //     if (askValue && transcript.length > 0) {
  //       setAskValue(false);
  //       setCheckValue(true);
  //       handleCloseMic();
  //     }
  //   }, 1800);

  //   const value_ = setTimeout(() => {
  //     if (tryAgain && transcript.length > 0) {
  //       setTryAgain(false);
  //       setCheckValue(false);
  //       handleCloseMic();
  //     }
  //   }, 2200);

  //   return () => {
  //     clearTimeout(value);
  //     clearTimeout(value_);
  //     // setTranscriptState("")
  //   };
  // }, [transcriptState]);

  useEffect(() => {
    resetTranscript();
    playAudioURL(
      [apiData && apiData.audio],
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
  }, []);

  useEffect(() => {
    let timmer: any;

    if (checkValue) {
      timmer = setTimeout(() => {
        handleClick();
      }, 500);
    }
    return () => {
      clearTimeout(timmer);
    };
  }, [askValue, tryAgain]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setRenderMic(listening);
  //   }, 1500);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [listening, transcript]);

  useEffect(() => {
    if (!checkValue && askValue) {
      setTranscriptState(filterValue(transcript.replace(/\s/g, "")));
      setInputValue(filterValue(transcript.replace(/\s/g, "")));
    }

    let response = checkValue && isResponse(transcript, selectedLanguage);

    if (error && response === "positive") {
      handleCloseMic();
      handleSubmit();
    }

    if (response === "negative") {
      handleCloseMic();
      handleNo();
    }
    const timeoutId = setTimeout(() => {
      setRenderMic(listening);
    }, 1500);

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

    if (apiData && apiData.otp !== inputValue) {
      setOtpWorng(true);
      setError(true);
    } else {
      setOtpWorng(false);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(value);
      clearTimeout(value_);
    };
  }, [transcript, listening]);

  useEffect(() => {
    if (inputValue.length === 4 && /^[0-9]+$/.test(inputValue)) {
      setError(true);
    } else {
      setError(false);
      setErrorState(
        selectedLanguage === "en"
          ? `Enter 4 digit number`
          : `4 अंकीय संख्या दर्ज करें`
      );
    }

    if (apiData && apiData.otp !== inputValue) {
      setOtpWorng(true);
      setError(true);
    } else {
      setOtpWorng(false);
    }
  }, [inputValue, error]);

  return (
    <div>
      {askValue ? (
        // ask details no1

        <ContainerVoice className={"ContainerVoice"}>
          <PopUp otp={apiData.otp} />

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
                {(Translations as any)[selectedLanguage]?.otp}
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
              <>
                <Mic
                  handleCloseMic={handleCloseMic}
                  inputValue={inputValue}
                  transcript={transcript.replace(/\s/g, "")}
                  dots={dots}
                />
              </>
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
                {" "}
                {(Translations as any)[selectedLanguage]?.otp}
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
                  <span>
                    {(Translations as any)[selectedLanguage]?.correct}
                  </span>
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
                  {transcriptState.replace(/\s/g, "")}
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
                  disabled={optWorng}
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
                  type="text"
                  maxLength={4}
                  placeholder="****"
                  onChange={handleInputChange}
                  value={transcriptState}
                  style={{
                    width: "100%",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "rgb(91, 91, 91)",
                    outline: "none",
                    letterSpacing: "14px",
                    textAlign: "center",
                    border: "1px solid white",
                  }}
                />

                {/* {optWorng && optWrong()} */}

                <Button
                  variant="contained"
                  disabled={optWorng}
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

export default OTPValidation;
