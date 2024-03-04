import Chatbot from "./ChatBot/Body/ChatBot";
import React, { useEffect, useState } from "react";
import {
  setLocation,
  setEnableLocation,
} from "./store/Redux-Dispatcher/ApiDispatcher";
import {  } from "./Apis";
import { useSelector } from "react-redux";
import { apiSelector } from "./store/Redux-selector/Selector";

function App() {
  const { location, enableLocation } = useSelector(apiSelector);
  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error(`Error retrieving location: ${err.message}`);
        }
      );
    };

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          setEnableLocation(true);
          // console.log("Permission granted");
          fetchLocation();
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            () => {
              console.log("Permission granted");
              fetchLocation();
            },
            (err) => {
              console.error(`Error retrieving location: ${err.message}`);
              // console.log("Permission denied");
              setEnableLocation(false);
            }
          );
        } else if (result.state === "denied") {
          // console.log("Permission denied");
          setEnableLocation(false);
          console.error("Geolocation permission denied");
        }
      });
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);
  
  

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
        <Chatbot />
    </div>
  );
}

export default App;
