import React, { useEffect, useState } from "react";
import { OptionHeader } from "../../ChatBot/ChatContent/Style";
import { reducer, apiSelector } from "../../store/Redux-selector/Selector";
import { useSelector } from "react-redux";
import { setSelectedLanguage } from "../../store/Redux-Dispatcher/Dispatcher";
import { setLanguageData_ } from "../../store/Redux-Dispatcher/UserDispatcher";
import { CheckCircleSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { setLanguage_view } from "../../store/Redux-Dispatcher/FlowDispatcher";
import { registerFlow } from "../../Apis";
import { setBackgroundColor } from "../../store/Redux-Dispatcher/Dispatcher";
import { FlowHeaders } from "../../translation";
import {
  getFrequentVoice,
  languageList,
  languageListEnglish,
} from "../../utils/data";
import { LanguageHeader } from "../../translation";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import { ContainerMic } from "../../UI/Style";
import ListeningMic from "../../UI/Listening";

function LanguageSelection() {
  const { selectedLanguage } = useSelector(reducer);
  const [lang, setLang] = useState("en");
  const { nextContext, enableLocation } = useSelector(apiSelector);

  const {
    transcript,
    startRecognition,
    stopRecognition,
    isSpeechRecognitionSupported,
    requestPermission,
    listening,
    resetTranscript,
  } = useSpeechRecognitionHook();

  const handleLanguageChange = (lang: any) => {
    setLanguageData_(lang);
    setLang(lang);
    setSelectedLanguage(lang);
  };

  const onClickLanguage = async () => {
    setLanguage_view(false);

    setBackgroundColor("#91278F");
    await registerFlow(lang, nextContext);
  };
  useEffect(() => {
    const audio = new Audio("");

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });

    const handleAudioEnded = () => {
      // isSpeechRecognitionSupported() ? startRecognition() : requestPermission();
    };

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      if (!audio.paused) {
        audio.pause();
      }
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  function getLangIdByName(name: any) {
    const interest = languageListEnglish.find(
      (item: any) => item.label.toLowerCase() === name.toLowerCase()
    );
    return interest ? interest.value : null;
  }

  useEffect(() => {
    const val = getLangIdByName(transcript);
    if (val) {
      handleLanguageChange(val);
    }
  }, [transcript]);

  
  

  return (
    <div style={{ height: "fit-content" }}>
      <OptionHeader className="optionHeader">
        {(LanguageHeader as any)[selectedLanguage]}
      </OptionHeader>
      <div className="container-lang">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            cursor: "pointer",
            overflow: "scroll",
            alignContent: "space-between",
            justifyContent: "center",
            // maxHeight: "60vh",
            padding: "0px 6px ",
            marginTop:"15px"
          }}
        >
          {languageList &&
            languageList.length > 0 &&
            languageList.map((val: any, index: any) => (
              <span
                key={index}
                id={val.id}
                onClick={() => handleLanguageChange(val.id)}
                className={val.id === lang ? "selected" : "other"}
              >
                {val.name}
              </span>
            ))}
        </div>

        <div
          style={{
            left: 0,
            right: 0,
          }}
        >
          
          {!listening ? (
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
                <img
                  onClick={() =>      
                    isSpeechRecognitionSupported()
                      ? startRecognition()
                      : requestPermission()
                  }
                  src="Mic.svg"
                  alt="mic"
                  style={{
                    zIndex: 999,
                    display: "block",
                    margin: "auto",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                />

                <Button
                  variant="contained"
                  // disabled={selectedOptions.length < 3 ? true : false}
                  startIcon={<CheckCircleSharp />}
                  style={{
                    fontFamily: "IBM Plex Sans Devanagari",
                    width: "fit-content",
                    borderRadius: "8px",
                    backgroundColor: "#91278F",
                    marginTop: "20px",
                    margin: "auto",
                  }}
                  onClick={onClickLanguage}
                >
                  {(FlowHeaders as any)[selectedLanguage]?.submit}
                </Button>
              </div>
            </>
          ) : (
            <ListeningMic />
          )}

          {/* {listening &&  */}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection;
