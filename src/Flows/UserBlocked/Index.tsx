import React from "react";
import { ContainerVoice } from "../../UI/Style";
import { useSelector } from "react-redux";
import { apiSelector, reducer } from "../../store/Redux-selector/Selector";
import { Translations } from "../../translation";
import { playAudio } from "../../utils/data";

function BlockedUser() {
  const apiData = useSelector(apiSelector).apiData;
  const { selectedLanguage } = useSelector(reducer);

  React.useEffect(() => {
    playAudio(apiData && apiData.audio);
  }, []);
  
  return (
    <ContainerVoice className={"ContainerVoice"}>
      <div
        style={{
          height: "100%",
          flexGrow: 1,
          padding: "10px",
          borderTopRightRadius: "16px",
          borderTopLeftRadius: "16px",
          backgroundColor: "#F0D9F0f",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          {(Translations as any)[selectedLanguage]?.block}
        </p>
      </div>
      <div
        style={{
          height: "25vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <img src="block.png" alt="blocked" width="60px" />
        <span
          style={{
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          {(Translations as any)[selectedLanguage]?.blockMssg}
        </span>
      </div>
    </ContainerVoice>
  );
}

export default BlockedUser;
