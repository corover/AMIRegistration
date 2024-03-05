import React from "react";
import { ContainerVoice } from "../../UI/Style";
import { useSelector } from "react-redux";
import { apiSelector, reducer } from "../../store/Redux-selector/Selector";
import { FlowHeaders } from "../../translation";

function BlockedUser() {
  const apiData = useSelector(apiSelector).apiData;
  const {selectedLanguage} = useSelector(reducer);

  React.useEffect(() => {
    const audio = new Audio(apiData && apiData.audio);

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, []);
  // console.log(selectedLanguage)
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
          {(FlowHeaders as any)[selectedLanguage]?.block}
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
          {(FlowHeaders as any)[selectedLanguage]?.blockMssg}
        </span>
      </div>
    </ContainerVoice>
  );
}

export default BlockedUser;
