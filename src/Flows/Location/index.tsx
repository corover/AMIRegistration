import React, { useState, useEffect, useRef } from "react";
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
import {
  isResponse,
  playAudioURL,
  getFrequentVoice,
  playAudio,
} from "../../utils/data";
import { audio } from "../../translation";
import { setCheckMic } from "../../store/Redux-Dispatcher/Dispatcher";
import ListeningMic from "../../UI/Listening";
import Mic from "../../UI/Mic";
import {
  setLocation,
  setEnableLocation,
} from "../../store/Redux-Dispatcher/ApiDispatcher";

function LocationAccess() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { selectedLanguage } = useSelector(reducer);
  const { mobileNoData } = useSelector(userProfileState);
  const [askValue, setAskValue] = useState(true);
  const [checkValue, setCheckValue] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [renderMic, setRenderMic] = useState(false);
  const [dots, setDots] = useState(3);
  const [transcriptState, setTranscriptState] = useState("");

  const { nextContext } = useSelector(apiSelector);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorState] = useState("");
  const [error, setError] = useState(true);
  const [optWorng, setOtpWorng] = useState(false);
  const [continuePinCode, setContinuePinCode] = useState(false);

  const flowComplete = useSelector(userProfileState);

  const { location, enableLocation, apiData } = useSelector(apiSelector);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setEnableLocation(true);

        registerFlow({ lat: latitude, lng: longitude }, nextContext);
        // console.log("Latitude: ", latitude, "Longitude: ", longitude);
      },
      (err) => {
        console.error(`Error retrieving location: ${err.message}`);
      }
    );
  };

  const allow = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          fetchLocation();
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            () => {
              // console.log("Permission granted");
              fetchLocation();
            },
            (err) => {
              console.error(`Error retrieving location: ${err.message}`);
            }
          );
        } else if (result.state === "denied") {
          console.error("Geolocation permission denied");
        }
      });
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  const deny = () => {
    setEnableLocation(false);
    // console.log("Permission denied");
    registerFlow({}, "862a79a6-3a3c-46f3-8721-332fe4ef4c00");
    // Add any additional logic you want to perform on denial
  };
  useEffect(() => {
    // const audioData = new Audio
    playAudio(apiData && apiData.audio);
  }, []);

  return (
    <div>
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
              {(FlowHeaders as any)[selectedLanguage]?.allowLocation}
            </p>
          </div>
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
            startIcon={<CheckCircleSharp />}
            style={{
              fontFamily: "IBM Plex Sans Devanagari ",
              width: "100%",
              borderRadius: "8px",
              marginBottom: "10px",
              backgroundColor: "#91278F",
            }}
            // onClick={() => setContinuePinCode(true)}
            onClick={allow}
          >
            {(FlowHeaders as any)[selectedLanguage]?.allow}
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
            onClick={deny}
          >
            {(FlowHeaders as any)[selectedLanguage]?.deny}
          </Button>
        </div>
      </ContainerVoice>
    </div>
  );
}

export default LocationAccess;
