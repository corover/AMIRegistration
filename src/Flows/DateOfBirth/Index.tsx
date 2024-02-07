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
import { registerFlow } from "../../Apis";
import { apiSelector } from "../../store/Redux-selector/Selector";
import { userProfileState } from "../../store/Redux-selector/Selector";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import {
  formatDateToYYYYMMDD,
  isResponse,
  playAudioURL,
} from "../../utils/data";
import { audio } from "../../translation";
import { setCheckMic } from "../../store/Redux-Dispatcher/Dispatcher";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";
import { getFrequentVoice } from "../../utils/data";
function DateOfBirth() {
  const { selectedLanguage } = useSelector(reducer);
  const { mobileNoData } = useSelector(userProfileState);
  const [askValue, setAskValue] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [renderMic, setRenderMic] = useState(false);
  const [dots, setDots] = useState(3);
  const nextContext = useSelector(apiSelector).nextContext;
  const [inputValue, setInputValue] = useState("");
  const [transcriptState, setTranscriptState] = useState("");

  const apiData = useSelector(apiSelector).apiData;

  const [date, setDate] = useState("");

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
    moment(inputValue).format("YYYYMMDD") !== "Invalid date" &&
      registerFlow(moment(inputValue).format("YYYYMMDD"), nextContext);
  };

  const handleNo = () => {
    stopRecognition();
    setTryAgain(true);
    setCheckValue(false);
  };

  const handleDateChange = (selectedDate: any) => {
    const date = moment(selectedDate.$d).format("YYYYMMDD");
    console.log(console.log(date));
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
    playAudioURL(
      //   audioURLArray,
      [
        selectedLanguage === "en"
          ? "https://storage.googleapis.com/ami-tts-storage/837aff98-8275-4d1b-a7b9-a350b8d5d007.wav"
          : "https://storage.googleapis.com/ami-tts-storage/d31f1cf2-bde3-4311-9cde-cab7cf97746d.wav",
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
      const a = formatDateToYYYYMMDD(transcript);
      a && setInputValue(a);
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
                {(FlowHeaders as any)[selectedLanguage]?.dob}
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
                transcript={transcript.replace(/\s/g, "")}
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
              <h3 style={{fontSize:"24px"}}>{(FlowHeaders as any)[selectedLanguage]?.reg}</h3>

              <p style={{ fontSize: "20px" }}>
                {" "}
                {(FlowHeaders as any)[selectedLanguage]?.dob}
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
                <span> {(FlowHeaders as any)[selectedLanguage]?.correct}</span>
                <span
                  style={{
                    fontSize: "18px",
                    paddingTop: "5px",
                    fontWeight: "400",
                    color: "#91278F",
                  }}
                >
                  {transcriptState}
                </span>

                {moment(inputValue).format("YYYYMMDD") === "Invalid date" && (
                  <p style={{ color: "#F15A59", fontSize: "12px" }}>
                    {(FlowHeaders as any)[selectedLanguage]?.errDate}
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
                        fontFamily: 'IBM Plex Sans Devanagari',
                        width: "100%",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        backgroundColor: "#91278F",
                      }}
                      onClick={handleSubmit}
                    >
                      {(FlowHeaders as any)[selectedLanguage]?.yes}
                    </Button>
                  </div>

                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    style={{
                      fontFamily: 'IBM Plex Sans Devanagari',
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
                <span>{(FlowHeaders as any)[selectedLanguage]?.tryAgain} </span>
              </div>
              <div style={{ padding: "14px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    maxDate={dayjs()}
                    onChange={(selectedDate: any) => {
                      setDate(moment(selectedDate.$d).format("YYYYMMDD"));
                    }}
                  />
                </LocalizationProvider>
              </div>

              <Button
                variant="contained"
                startIcon={<CheckCircleSharp />}
                style={{
                  fontFamily: 'IBM Plex Sans Devanagari',
                  borderRadius: "8px",
                  backgroundColor: "#91278F",
                  width: "fitContent",
                  display: "flex",
                  margin: "auto",
                  marginBottom: "10px",
                }}
                onClick={() => registerFlow(date, nextContext)}
              >
                {(FlowHeaders as any)[selectedLanguage]?.submit}
              </Button>
            </>
          )}
        </ContainerVoice>
      )}
    </div>
  );
}

export default DateOfBirth;
