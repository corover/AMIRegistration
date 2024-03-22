import React, { useEffect, useState, useRef } from "react";
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
import { Translations } from "../../translation";
import { languageList, languageListEnglish, playAudio } from "../../utils/data";
import { LanguageHeader, audio } from "../../translation";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";
import ListeningMic from "../../UI/Listening";

function LanguageSelection() {
  const { selectedLanguage } = useSelector(reducer);
  const { nextContext } = useSelector(apiSelector);
  const [lang, setLang] = useState("en");

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

  function getLangIdByName(name: any) {
    const interest = languageListEnglish.find(
      (item: any) => item.label.toLowerCase() === name.toLowerCase()
    );
    return interest ? interest.value : null;
  }

  useEffect(() => {
    playAudio((audio as any)[selectedLanguage]?.langAudio);
    return () => resetTranscript();
  }, []);

  useEffect(() => {
    const val = getLangIdByName(transcript);
    if (val) {
      handleLanguageChange(val);
    }
  }, [transcript]);

  useEffect(() => {
    !listening && stopRecognition();
  }, [listening]);

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
            padding: "0px 20px ",
            marginTop: "15px",
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
                  {(Translations as any)[selectedLanguage]?.submit}
                </Button>
              </div>
            </>
          ) : (
            <ListeningMic />
          )}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection;
