import Chatbot from "./ChatBot/Body/ChatBot";
import { Provider } from "react-redux";
import store from "./store/Redux/Redux-Store";
import React, { useState, useEffect } from "react";
import { locationApi } from "./Apis";

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  interface Location {
    latitude: number;
    longitude: number;
  }

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setLocation({ latitude, longitude });
          locationApi(latitude, longitude)
        },
        (err) => {
          setError(`Error retrieving location: ${err.message}`);
        }
      );
    };

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
              setError(`Error retrieving location: ${err.message}`);
            }
          );
        } else if (result.state === "denied") {
          setError("Geolocation permission denied");
        }
      });
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);


// console.log("lo", location)
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Provider store={store}>
        <Chatbot />
      </Provider>
    </div>
  );
}

export default App;
