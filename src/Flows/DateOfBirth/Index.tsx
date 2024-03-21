import React, { useState, useEffect } from "react";
import {
  CloseIcon,
  ContainerVoice,
  VoiceRecognitionContainer,
  VoiceRecognitionSpan,
} from "../../UI/Style";
import { CheckCircleSharp, Cancel } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { Translations, Listening } from "../../translation";
import { useSelector } from "react-redux";
import { reducer } from "../../store/Redux-selector/Selector";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import { registerFlow } from "../../Apis";
import { apiSelector } from "../../store/Redux-selector/Selector";
import { userProfileState } from "../../store/Redux-selector/Selector";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import {
  filterValue,
  formatDateToYYYYMMDD,
  isResponse,
  playAudio,
  playAudioCallBack,
  playAudioURL,
} from "../../utils/data";
import { audio } from "../../translation";
import { setCheckMic } from "../../store/Redux-Dispatcher/Dispatcher";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";
import { getFrequentVoice } from "../../utils/data";
import { setDOB } from "../../store/Redux-Dispatcher/UserDispatcher";
function DateOfBirth() {
  const flowComplete = useSelector(userProfileState);

  const { selectedLanguage } = useSelector(reducer);
  const { mobileNoData, dobData } = useSelector(userProfileState);
  const [askValue, setAskValue] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [renderMic, setRenderMic] = useState(false);
  const [dots, setDots] = useState(3);
  const nextContext = useSelector(apiSelector).nextContext;
  const [inputValue, setInputValue] = useState("");
  const [transcriptState, setTranscriptState] = useState("");
  const [completeFlowState, setCompleteFlowState] = useState(flowComplete);
  const { enableLocation, apiData } = useSelector(apiSelector);

  const [date, setDate] = useState("");

  // const  = {
  //   status: "success",
  //   next_context: "862a79a6-3a3c-46f3-8721-332fe4ef4c00",
  //   gender: "Male",
  //   audio:
  //     "https://storage.googleapis.com/ami-tts-storage/44791ebb-176c-4790-8312-1df8bd324a9f.wav",
  //   dobView: true,
  // };

  const {
    transcript,
    startRecognition,
    stopRecognition,
    isSpeechRecognitionSupported,
    requestPermission,
    listening,
    resetTranscript,
  } = useSpeechRecognitionHook();

  const handleClick = () => {
    // isSpeechRecognitionSupported() ? startRecognition() : requestPermission();
    setCheckMic(true);
    if (moment(inputValue).format("YYYY-MM-DD") === "Invalid date") {
      playAudioCallBack((audio as any)[selectedLanguage]?.dateErr, handleNo);
    } else {
      playAudioURL(
        [(audio as any)[selectedLanguage]?.itsCorrect],
        isSpeechRecognitionSupported,
        startRecognition,
        requestPermission
      );
    }
  };

  const handleCloseMic = () => {
    stopRecognition();
    setRenderMic(false);
  };

  const handleSubmit = async () => {
    // console.log(11);
    stopRecognition();
    if (moment(inputValue).format("YYYYMMDD") !== "Invalid date") {
      registerFlow(completeFlowState, "4b7c27be-5f61-437e-a271-ad72c9a20d5a");
    }
  };

  const handleNo = () => {
    stopRecognition();
    setTryAgain(true);
    setCheckValue(false);
    setDOB("");
  };

  const handleDateChange = (selectedDate: any) => {
    const date = moment(selectedDate.$d).format("YYYYMMDD");
    // console.log(console.log(date));
    //
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
      }
    }, 2200);
    return () => {
      clearTimeout(value);
      clearTimeout(value_);
      // setTranscriptState("")
    };
  }, [transcriptState]);

  useEffect(() => {
    resetTranscript();
    playAudioURL(
      //   audioURLArray,
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
    };
  }, [apiData.audio]);

  useEffect(() => {
    let timmer: any;
    // if (askValue) {
    //   timmer = setTimeout(() => {
    //     // handleClick();
    //     setRenderMic((prevState) => !prevState);
    //     // setTranscriptState("");
    //   }, 500);
    // }

    if (checkValue) {
      timmer = setTimeout(() => {
        handleClick();
        // setRenderMic((prevState) => !prevState);
      }, 500);
    }
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
      setTranscriptState(transcript);
      //  setInputValue(transcript);
      const data = formatDateToYYYYMMDD(transcript)
        ? formatDateToYYYYMMDD(transcript)
        : transcript;
      // console.log(
      //   formatDateToYYYYMMDD(transcript)
      //     ? formatDateToYYYYMMDD(transcript)
      //     : transcript
      // );
      data && setInputValue(filterValue(data));
      transcript.length > 0 && setDOB(data);

      // console.log(transcript);
    }

    let response = isResponse(transcript, selectedLanguage);

    if (response === "positive") {
      handleCloseMic();
      handleSubmit();
    }
    if (response === "negative") {
      handleNo();
      handleCloseMic();
    }
  }, [transcript]);

  useEffect(() => {
    setCompleteFlowState(flowComplete);
  }, [dobData]);

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
                {(Translations as any)[selectedLanguage]?.dob}
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
                transcript={
                  formatDateToYYYYMMDD(transcript)
                    ? formatDateToYYYYMMDD(transcript)
                    : transcript
                }
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
                {" "}
                {(Translations as any)[selectedLanguage]?.dob}
              </p>
            </div>
          </div>

          {checkValue && (
            <>
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  width: "413px",
                }}
              >
                <span> {(Translations as any)[selectedLanguage]?.correct}</span>
                <span
                  style={{
                    fontSize: "18px",
                    paddingTop: "5px",
                    fontWeight: "400",
                    color: "#91278F",
                  }}
                >
                  {/* {transcriptState} */}
                  {formatDateToYYYYMMDD(transcriptState)
                    ? formatDateToYYYYMMDD(transcriptState)
                    : transcriptState}
                </span>

                {moment(inputValue).format("YYYY-MM-DD") === "Invalid date" && (
                  <p style={{ color: "#F15A59", fontSize: "15px" }}>
                    {(Translations as any)[selectedLanguage]?.errDate}
                  </p>
                )}
                <div
                  style={{
                    padding: "5px",
                    fontSize: "17px",
                    cursor: "pointer",
                    margin: "20px 100px 20px 100px",
                  }}
                >
                  <div>
                    <Button
                      disabled={
                        moment(inputValue).format("YYYYMMDD") === "Invalid date"
                          ? true
                          : false
                      }
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
                  </div>

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
              </div>
            </>
          )}

          {tryAgain && (
            // re try Again no3
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
                <span>
                  {(Translations as any)[selectedLanguage]?.tryAgain}{" "}
                </span>
              </div>
              <div style={{ padding: "14px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    maxDate={dayjs()}
                    onChange={(selectedDate: any) => {
                      // console.log(moment(selectedDate.$d).format("YYYY-MM-DD"));
                      setDOB(moment(selectedDate.$d).format("YYYY-MM-DD"));
                    }}
                  />
                </LocalizationProvider>
              </div>

              <Button
                variant="contained"
                startIcon={<CheckCircleSharp />}
                style={{
                  fontFamily: "IBM Plex Sans Devanagari ",
                  borderRadius: "8px",
                  backgroundColor: "#91278F",
                  width: "fitContent",
                  display: "flex",
                  margin: "auto",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setDOB(inputValue);

                  setTimeout(() => {
                    registerFlow(
                      completeFlowState,
                      "4b7c27be-5f61-437e-a271-ad72c9a20d5a"
                    );
                  }, 1000);
                }}
              >
                {(Translations as any)[selectedLanguage]?.submit}
              </Button>
            </>
          )}
        </ContainerVoice>
      )}
    </div>
  );
}

export default DateOfBirth;
