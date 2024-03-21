import React, { useEffect, useState } from "react";
import { OptionHeader } from "../../ChatBot/ChatContent/Style";
import { reducer, apiSelector } from "../../store/Redux-selector/Selector";
import { useSelector } from "react-redux";
import { ContainerMic } from "../../UI/Style";
import useSpeechRecognitionHook from "../../Hooks/useSpeechRecognitionHook";

import { CheckCircleSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { setIntrest_view } from "../../store/Redux-Dispatcher/FlowDispatcher";
import { registerFlow } from "../../Apis";
import { Translations } from "../../translation";
import Mic from "../../UI/Mic";
import ListeningMic from "../../UI/Listening";
import { setBackgroundColor } from "../../store/Redux-Dispatcher/Dispatcher";
import { getIntrest } from "../../utils/data";
function AreaOfIntrest() {
  const { selectedLanguage, loading } = useSelector(reducer);
  const { nextContext, apiData } = useSelector(apiSelector);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  // const  = {
  //   status: true,
  //   next_context: "4b7c27be-5f61-437e-a271-ad72c9a11y66",
  //   audio:
  //     "https://storage.googleapis.com/ami-tts-storage/6fecab7b-9d52-4dbf-9113-24079b201616.wav",
  //   areaOfInterest: [
  //     {
  //       id: 26,
  //       name: "Health",
  //     },
  //     {
  //       id: 31,
  //       name: "Agriculture",
  //     },
  //     {
  //       id: 17,
  //       name: "Employment",
  //     },
  //     {
  //       id: 25,
  //       name: "Government Schemes",
  //     },
  //     {
  //       id: 16,
  //       name: "Education",
  //     },
  //     {
  //       id: 1,
  //       name: "News",
  //     },
  //     {
  //       id: 3,
  //       name: "Sports",
  //     },
  //   ],
  //   areaOfIntrestView: true,
  // };
  // const apiData = {
  //   status: true,
  //   next_context: "4b7c27be-5f61-437e-a271-ad72c9a11y66",
  //   audio:
  //     "https://coroverbackendstorage.blob.core.windows.net/chatbot-audio-bucket/7cb2c4bc-d265-4174-bed1-c468bb0d1340_hi.mp3",
  //   areaOfInterest: [
  //     {
  //       id: 26,
  //       name: "स्वास्थ्य",
  //     },
  //     {
  //       id: 31,
  //       name: "कृषि",
  //     },
  //     {
  //       id: 17,
  //       name: "रोज़गार",
  //     },
  //     {
  //       id: 25,
  //       name: "सरकारी योजनाएँ",
  //     },
  //     {
  //       id: 16,
  //       name: "शिक्षा",
  //     },
  //     {
  //       id: 1,
  //       name: "समाचार",
  //     },
  //     {
  //       id: 3,
  //       name: "खेल",
  //     },
  //   ],
  //   areaOfIntrestView: true,
  // };
  interface AreaOfInterestInterface {
    id: number;
    name: string;
  }
  const {
    transcript,
    startRecognition,
    stopRecognition,
    isSpeechRecognitionSupported,
    requestPermission,
    listening,
    resetTranscript,
  } = useSpeechRecognitionHook();
  const [dots, setDots] = useState(3);

  const handleIntrestChange = (id: any) => {
    const isSelected = selectedOptions.includes(id);

    if (!isSelected) {
      setSelectedOptions((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((optionId) => optionId !== id)
      );
    }
  };

  const onClickIntrest = async () => {
    setIntrest_view(false);

    setBackgroundColor("#91278F");
    const cleanedOptions = Array.from(new Set(selectedOptions)).filter(
      (option) => option !== null && option !== undefined && option !== ""
    );

    await registerFlow(cleanedOptions, nextContext);
  };

  function getInterestIdByName(name: string) {
    const normalizedName = name.toLowerCase();
    let data = [...apiData.areaOfInterest];
    data = data.map((item) => {
      if (item.name === "रोज़गार") {
        return { ...item, name: "रोजगार" };
      }
      return item;
    });
    const interest = data.find((item: AreaOfInterestInterface) => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(normalizedName);
    });
    return interest ? interest.id : null;
  }

  useEffect(() => {
    const audio = new Audio(apiData.audio);

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => {
        return dots < 3 ? dots + 1 : 0;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      stopRecognition();
      // setTranscriptState("");
      resetTranscript();
    };
  }, []);

  useEffect(() => {
    console.log(transcript);
    const interestId =
      transcript.length > 0 &&
      transcript.split(" ").map((item: any) => getInterestIdByName(item));

    if (interestId) {
      setSelectedOptions((prevSelectedOptions) => {
        return [...prevSelectedOptions, ...(interestId || [])];
      });
    }
  }, [transcript]);

  return (
    <div>
      <OptionHeader
        className="optionHeader"
        style={{ fontSize: "24px !important " }}
      >
        {(Translations as any)[selectedLanguage]?.intrest}
      </OptionHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          cursor: "pointer",
          overflow: "scroll",
          marginTop: "20px",
          alignContent: "space-between",
          justifyContent: "center",
          // maxHeight: "60vh",
          padding: "0px 10px ",
        }}
      >
        {apiData &&
          apiData.areaOfInterest.length > 0 &&
          apiData.areaOfInterest.map((val: any) => (
            <span
              key={val.id}
              id={val.id}
              onClick={() => handleIntrestChange(val.id)}
              style={{ margin: "5px !important", padding: "5px !important" }}
              className={
                selectedOptions.includes(val.id)
                  ? "selectedIntrest"
                  : "otherIntrest"
              }
            >
              {val.name}
            </span>
          ))}
      </div>

      {!listening && (
        <ContainerMic
          className={"ContainerVoice"}
          style={{ backgroundColor: "white !important" }}
        >
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              padding: "15px",

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
              }}
            />

            <Button
              variant="contained"
              disabled={selectedOptions.length < 3 ? true : false}
              startIcon={<CheckCircleSharp />}
              style={{
                fontFamily: "IBM Plex Sans Devanagari ",
                width: "fit-content",
                borderRadius: "8px",
                backgroundColor: "#91278F",
                marginTop: "10px",
              }}
              onClick={onClickIntrest}
            >
              {(Translations as any)[selectedLanguage]?.submit}
            </Button>
          </div>
        </ContainerMic>
      )}

      {listening && <ListeningMic />}
    </div>
  );
}

export default AreaOfIntrest;
