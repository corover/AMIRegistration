import React, { useState, useEffect, useRef } from "react";
import { ContainerVoice } from "../../UI/Style";
import { CheckCircleSharp, Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Translations } from "../../translation";
import { useSelector } from "react-redux";
import { reducer } from "../../store/Redux-selector/Selector";
import { registerFlow } from "../../Apis";
import { apiSelector } from "../../store/Redux-selector/Selector";
import { userProfileState } from "../../store/Redux-selector/Selector";
import { playAudio } from "../../utils/data";
import {
  setLocation,
  setEnableLocation,
} from "../../store/Redux-Dispatcher/ApiDispatcher";

function LocationAccess() {
  const { selectedLanguage } = useSelector(reducer);
  const { nextContext, apiData } = useSelector(apiSelector);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setEnableLocation(true);
        registerFlow({ lat: latitude, lng: longitude }, nextContext);
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
    registerFlow({}, "862a79a6-3a3c-46f3-8721-332fe4ef4c00");
  };

  useEffect(() => {
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
              {(Translations as any)[selectedLanguage]?.allowLocation}
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
            onClick={allow}
          >
            {(Translations as any)[selectedLanguage]?.allow}
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
            {(Translations as any)[selectedLanguage]?.deny}
          </Button>
        </div>
      </ContainerVoice>
    </div>
  );
}

export default LocationAccess;
