import React from "react";
import {
  ContainerVoice,
  VoiceRecognitionContainer,
} from "../UI/Style";
import { LoadingContainer, Logo, LoadingAnimation } from "./Style";
import { Loading } from "../translation";
import { useSelector } from "react-redux";
import { reducer } from "../store/Redux-selector/Selector";

function LoadingComponent() {
  const selectLanguage = useSelector(reducer).selectedLanguage;
  return (
  
      <ContainerVoice className={"ContainerVoice"}>
        <div
          style={{
            height: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <ContainerVoice
            className={"ContainerVoice"}
            style={{ bottom: "0px" }}
          >
            <div style={{ height: "100%", flexGrow: 1, paddingBottom: "30px" }}>
              <div
                style={{
                  margin: "auto",
                  textAlign: "justify",
                  padding: "0px 15px 0px 15px",
                }}
              >
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  {(Loading as any)[selectLanguage]}
                </p>
              </div>
            </div>

            <div
              style={{
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
              }}
            >
              <LoadingContainer className={"LoadingContainer"}>
                <LoadingAnimation
                  className={"LoadingAnimation"}
                ></LoadingAnimation>
              </LoadingContainer>
            </div>
          </ContainerVoice>
        </div>
      </ContainerVoice>
    
  );
}

export default LoadingComponent;
