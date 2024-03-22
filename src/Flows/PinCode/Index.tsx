import React, { useState, useEffect } from "react";
import { ContainerVoice, VoiceRecognitionContainer } from "../../UI/Style";
import { CheckCircleSharp, Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Translations } from "../../translation";
import { useSelector } from "react-redux";
import {
  reducer,
  apiSelector,
  userProfileState,
} from "../../store/Redux-selector/Selector";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import { registerFlow } from "../../Apis";
import { isResponse, playAudioURL, playAudioCallBack } from "../../utils/data";
import { audio } from "../../translation";
import { setCheckMic } from "../../store/Redux-Dispatcher/Dispatcher";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";

function PinCode() {
  const {
    transcript,
    startRecognition,
    stopRecognition,
    isSpeechRecognitionSupported,
    requestPermission,
    listening,
    resetTranscript,
  } = useSpeechRecognitionHook();

  // const apiData = {
  //   status: true,
  //   next_context: "ebb762fb-3f7b-4fe3-ad1f-3b7b19cd5e68",
  //   district: 10,
  //   audio:
  //     "https://storage.googleapis.com/ami-tts-storage/dc85ed60-31cc-418c-897d-d0869e43c930.wav",
  //   pincodeView: true,
  // };
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
  const [continuePinCode, setContinuePinCode] = useState(false);

  const { selectedLanguage } = useSelector(reducer);
  const { nextContext, apiData } = useSelector(apiSelector);

  const handleInputChange = (event: any) => {
    setTranscriptState(event.target.value);
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setCheckMic(true);
    if (error) {
      playAudioURL(
        [(audio as any)[selectedLanguage]?.itsCorrect],
        isSpeechRecognitionSupported,
        startRecognition,
        requestPermission
      );
    } else {
      playAudioCallBack((audio as any)[selectedLanguage]?.pinCodeErr, handleNo);
    }
  };

  const handleCloseMic = () => {
    stopRecognition();
    setRenderMic(false);
  };

  const handleSubmit = async () => {
    stopRecognition();
    setTimeout(async () => {
      await registerFlow(transcriptState, nextContext);
    }, 1000);
  };

  const skipPinCode = async () => {
    setTimeout(async () => {
      await registerFlow(transcriptState, nextContext);
    }, 1000);
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
    };
  }, [transcriptState]);

  useEffect(() => {
    playAudioURL(
      [apiData.audio],
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
      playAudioURL(
        [apiData.audio],
        isSpeechRecognitionSupported,
        startRecognition,
        requestPermission
      ).pauseOrStopAudio(true);
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
    }, 200);

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

    let response = checkValue && isResponse(transcript, selectedLanguage);

    if (error && response === "positive") {
      handleCloseMic();
      handleSubmit();
    }

    if (response === "negative") {
      handleCloseMic();
      handleNo();
    }

    // console.log(transcript);
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
                {(Translations as any)[selectedLanguage]?.pincode}
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
                  fontFamily: "IBM Plex Sans Devanagari ",
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#91278F",
                }}
                onClick={() => setContinuePinCode(true)}
              >
                {(Translations as any)[selectedLanguage]?.enter}
              </Button>

              <Button
                variant="contained"
                startIcon={<Cancel />}
                style={{
                  fontFamily: "IBM Plex Sans Devanagari ",
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#91278F",
                }}
                onClick={skipPinCode}
              >
                {(Translations as any)[selectedLanguage]?.skip}
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
                {(Translations as any)[selectedLanguage]?.reg}
              </h3>

              <p style={{ fontSize: "20px" }}>
                {" "}
                {(Translations as any)[selectedLanguage]?.pincode}
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

export default PinCode;
