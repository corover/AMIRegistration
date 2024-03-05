import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  CloseIcon,
  ContainerVoice,
  VoiceRecognitionContainer,
  VoiceRecognitionSpan,
} from "../../UI/Style";
import {
  CheckCircleSharp,
  Cancel,
  KeyboardVoiceOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  FlowHeaders,
  Listening,
  OptionSelect,
  OpentionsNotFound,
} from "../../translation";
import { useSelector } from "react-redux";
import { reducer } from "../../store/Redux-selector/Selector";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import { userProfileState } from "../../store/Redux-selector/Selector";
import { registerFlow } from "../../Apis";
import { apiSelector } from "../../store/Redux-selector/Selector";
import { setDistrict } from "../../store/Redux-Dispatcher/UserDispatcher";
import { filterValue, isResponse, playAudioURL } from "../../utils/data";
import { audio } from "../../translation";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";

const btnStyle = {
  backgroundColor: "#ededed",
  borderRadius: "50%",
  padding: "5px",
  margin: "3px",
  border: "3px solid #F0D9F0"
};

function State() {
  const [askValue, setAskValue] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [renderMic, setRenderMic] = useState(false);
  const [dots, setDots] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownStyle, setDropDownStyle] = useState("dropDown");
  const [invalid, SetInvalid] = useState(false);
  const [check, setCheck] = useState(true);
  const [transcriptState, setTranscriptState] = useState("");

  const { nextContext, apiData } = useSelector(apiSelector);
  const { selectedLanguage } = useSelector(reducer);

  const {
    transcript,
    startRecognition,
    stopRecognition,
    isSpeechRecognitionSupported,
    requestPermission,
    listening,
    resetTranscript,
  } = useSpeechRecognitionHook();
console.log(111)
  const getLabelFromValue = (value: any) => {
    const date =
      apiData &&
      apiData.states.find(
        (lang: any) => lang.name.toLowerCase() === value.toLowerCase()
      );
    return date ? date.id : "";
  };

  const handleClick = () => {
    // isSpeechRecognitionSupported() ? startRecognition() : requestPermission();
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

    await registerFlow(getLabelFromValue(inputValue), nextContext);

    // switch (true) {
    //   case district:
    //     await setDistrict(getLabelFromValue(inputValue));
    //     await registerFlow(stateID, nextContext);

    //     break;

    //   case State:
    //     await registerFlow(inputValue, nextContext);

    //     break;

    //   case state:
    //     await registerFlow(getLabelFromValue(inputValue), nextContext);

    //     break;

    //   case city:
    //     await registerFlow(inputValue, nextContext);

    //     break;

    //   default:
    // }

    setCheck(false);
  };

  const filteredStatesOptions =
    apiData &&
    apiData.states.length > 0 &&
    apiData.states.filter((val: any) =>
      val.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleNo = () => {
    stopRecognition();
    setTryAgain(true);
    setCheckValue(false);
  };

  useEffect(() => {
    const value = setTimeout(() => {
      if (askValue && transcriptState.length > 0) {
        setAskValue(false);
        setCheckValue(true);
      }
    }, 1800);

    const value_ = setTimeout(() => {
      if (tryAgain && transcriptState.length > 0) {
        setTryAgain(false);
        setCheckValue(false);
      }
    }, 2200);

    // transcriptState.length > 0 &&
    // check && optionList.some((option: any) => transcriptState.includes(option.name))
    //   ? SetInvalid(false)
    //   : SetInvalid(true);

    if (
      transcript.length > 0 &&
      check &&
      Array.isArray(apiData.states) &&
      apiData.states.some((option: any) =>
        transcript.toLowerCase().includes(option.name.toLowerCase())
      )
    ) {
      SetInvalid(false);
    } else {
      SetInvalid(true);
    }

    return () => {
      clearTimeout(value);
      clearTimeout(value_);
      // setTranscriptState("");
    };
  }, [transcriptState]);

  useEffect(() => {
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
    // playAudio()
    return () => {
      clearInterval(interval);
      stopRecognition();
      setTranscriptState("");
      resetTranscript();
    };
  }, []);

  useEffect(() => {
    let timmer: any;
    // if (askValue) {
    //   timmer = setTimeout(() => {
    //     // handleClick();
    //     setRenderMic((prevState) => !prevState);
    //     setTranscriptState("");
    //   }, 500);
    // }

    if (checkValue) {
      timmer = setTimeout(() => {
        handleClick();
        // setRenderMic((prevState) => !prevState);
      }, 500);
    }
  }, [checkValue]);

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
      setTranscriptState((transcript));
      setInputValue((transcript));
    }

    let response = isResponse(transcript, selectedLanguage);
    switch (response) {
      case "positive":
        handleCloseMic();
        handleSubmit();
        break;

      case "negative":
        handleCloseMic();
        handleNo();
        break;

      default:
    }
  }, [transcript]);

  React.useEffect(() => {
    if (apiData && apiData.states.length < 5) {
      setDropDownStyle("dropDown_");
    } else {
      setDropDownStyle("dropDown");
    }
  }, [apiData.states]);

  return (
    <div>
      {askValue ? (
        // ask details no1
        <ContainerVoice className={"ContainerVoice"}>
          {renderMic ? (
            <Mic
              handleCloseMic={handleCloseMic}
              inputValue={inputValue}
              transcript={transcript}
              dots={dots}
            />
          ) : (
            <React.Fragment>
              <div
                className={dropdownStyle}
                style={{ maxHeight: "85vh", bottom: "0px" }}
              >
                <span className="optionHeader" style={{ padding: "10px 0px" }}>
                  {(FlowHeaders as any)[selectedLanguage]?.state}
                </span>
                <div className="BoxSentMSGSchemes">
                  <>
                    <input
                      className="inputSchemes"
                      type="text"
                      placeholder={(OptionSelect as any)[selectedLanguage]}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <IconButton
                      size="small"
                      style={btnStyle}
                      onClick={() => {
                        isSpeechRecognitionSupported()
                          ? startRecognition()
                          : requestPermission();
                      }}
                    >
                      <span>
                        <KeyboardVoiceOutlined
                          sx={{
                            color: "#303841",
                            fontSize: "30px !important",
                          }}
                        />
                      </span>
                    </IconButton>
                  </>
                </div>

                <div style={{ overflowY: "scroll", height: "100%" }}>
                  {filteredStatesOptions && filteredStatesOptions.length > 0 ? (
                    filteredStatesOptions.map((val: any, index: number) => (
                      <div className="optionContainer" key={index}>
                        <p
                          className="optionItem"
                          onClick={() => {
                            stopRecognition();
                            setInputValue(val.id);
                            registerFlow(val.id, nextContext);
                            setCheck(false);
                          }}
                        >
                          {val.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <span>
                      <div className="optionContainer">
                        <p className="optionItem">
                          {(OpentionsNotFound as any)[selectedLanguage]}
                        </p>
                      </div>
                    </span>
                  )}
                </div>
              </div>
            </React.Fragment>
          )}
        </ContainerVoice>
      ) : (
        // verfi the micData no2
        <ContainerVoice className={"ContainerVoice"}>
          <div
            style={{
              height: "100%",
              flexGrow: 1,
              //   paddingBottom: "30px",
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
                {(FlowHeaders as any)[selectedLanguage]?.state}
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
                }}
              >
                {invalid ? (
                  <span style={{ color: "red", fontWeight: "400" }}>
                    {(FlowHeaders as any)[selectedLanguage]?.errOpts}
                  </span>
                ) : (
                  <span>{(FlowHeaders as any)[selectedLanguage]?.correct}</span>
                )}

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
              </div>
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
                    disabled={invalid}
                    variant="contained"
                    startIcon={<CheckCircleSharp />}
                    style={{
                      fontFamily: "IBM Plex Sans Devanagari",
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
                    fontFamily: "IBM Plex Sans Devanagari",
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
                  minHeight: "45vh",
                  maxHeight: "85vh",
                }}
              >
                <span>{(FlowHeaders as any)[selectedLanguage]?.tryAgain} </span>
              </div>

              {renderMic ? (
                <Mic
                  handleCloseMic={handleCloseMic}
                  inputValue={inputValue}
                  transcript={transcript}
                  dots={dots}
                />
              ) : (
                <React.Fragment>
                  <div
                    className={dropdownStyle}
                    style={{ maxHeight: "85vh", bottom: "0px" }}
                  >
                    <span
                      className="optionHeader"
                      style={{ padding: "10px 0px" }}
                    >
                      {(FlowHeaders as any)[selectedLanguage]?.state}
                    </span>
                    <div className="BoxSentMSGSchemes">
                      <>
                        <input
                          className="inputSchemes"
                          type="text"
                          placeholder={(OptionSelect as any)[selectedLanguage]}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {/* <IconButton
                          size="small"
                          style={btnStyle}
                          onClick={handleClick}
                        >
                          <span>
                            <KeyboardVoiceOutlined
                              sx={{
                                color: "#303841",
                                fontSize: "30px !important",
                              }}
                            />
                          </span>
                        </IconButton> */}
                      </>
                    </div>

                    <div style={{ overflowY: "scroll", height: "100%" }}>
                      {filteredStatesOptions &&
                      filteredStatesOptions.length > 0 ? (
                        filteredStatesOptions.map((val: any, index: number) => (
                          <div className="optionContainer" key={index}>
                            <p
                              className="optionItem"
                              onClick={() => {
                                stopRecognition();
                                setInputValue(val.id);
                                registerFlow(val.id, nextContext);
                                setCheck(false);
                              }}
                            >
                              {val.name}
                            </p>
                          </div>
                        ))
                      ) : (
                        <span>
                          <div className="optionContainer">
                            <p className="optionItem">
                              {(OpentionsNotFound as any)[selectedLanguage]}
                            </p>
                          </div>
                        </span>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </>
          )}
        </ContainerVoice>
      )}
    </div>
  );
}

export default State;
