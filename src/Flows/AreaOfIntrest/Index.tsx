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
import { FlowHeaders } from "../../translation";
import Mic from "../../UI/Mic";
import ListeningMic from "../../UI/Listening";
import { setBackgroundColor } from "../../store/Redux-Dispatcher/Dispatcher";
function AreaOfIntrest() {
  const { selectedLanguage, loading } = useSelector(reducer);
  const { nextContext, apiData } = useSelector(apiSelector);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);



//   const apiData={
//     status : true,
//     next_context: "4b7c27be-5f61-437e-a271-ad72c9a11y66",
//     audio: "https://storage.googleapis.com/ami-tts-storage/6fecab7b-9d52-4dbf-9113-24079b201616.wav",
//     areaOfInterest: [
//         {
//             id: 26,
//             name: "Health"
//         },
//         {
//             id: 31,
//             name: "Agriculture"
//         },
//         {
//             id: 17,
//             name: "Employment"
//         },
//         // {
//         //     "id": 25,
//         //     "name": "Government Schemes"
//         // },
//         // {
//         //     "id": 16,
//         //     "name": "Education"
//         // },
//         // {
//         //     "id": 1,
//         //     "name": "News"
//         // },
//         // {
//         //     "id": 3,
//         //     "name": "Sports"
//         // }
//     ],
//     "areaOfIntrestView": true
// }

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
    const stringId = String(id); // Convert id to string
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
    // setLanguage_view(false);
    setBackgroundColor("#91278F");
    await registerFlow(selectedOptions, nextContext);
  };
  function getInterestIdByName(name: any) {
    const interest = apiData.areaOfInterest.find(
      (item: any) => item.name.toLowerCase() === name.toLowerCase()
    );

    return interest ? interest.id : null;
  }

  useEffect(() => {
    const audio = new Audio(apiData.audio);

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, []);

  // console.log(selectedOptions);
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

  // console.log("getInterestIdByName(transcript)", getInterestIdByName("movie"))
  useEffect(() => {
    const interestId = getInterestIdByName(transcript);
    if (interestId !== null && !selectedOptions.includes(String(interestId))) {
      setSelectedOptions((prevSelected) => [
        ...prevSelected,

        Number(interestId),
      ]);
    }
  }, [transcript]);

  return (
    <div>
      <OptionHeader
        className="optionHeader"
        style={{ fontSize: "24px !important " }}
      >
        {(FlowHeaders as any)[selectedLanguage]?.intrest}
      </OptionHeader>
      <div
        style={{
          display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            cursor: "pointer",
            overflow: "scroll",
            marginTop:"20px",
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
                fontFamily: 'IBM Plex Sans Devanagari ',
                width: "fit-content",
                borderRadius: "8px",
                backgroundColor: "#91278F",
                marginTop: "10px",
              }}
              onClick={onClickIntrest}
            >
              {(FlowHeaders as any)[selectedLanguage]?.submit}
            </Button>
          </div>
        </ContainerMic>
      )}

      {listening && <ListeningMic />}
    </div>
  );
}

export default AreaOfIntrest;
