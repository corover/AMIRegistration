import React, { useEffect } from "react";

import { FlowHeaders } from "../../translation";
import { useSelector } from "react-redux";
import { reducer, apiSelector } from "../../store/Redux-selector/Selector";
import { setBackgroundColor } from "../../store/Redux-Dispatcher/Dispatcher";

function FlowComplete() {
  const { selectedLanguage } = useSelector(reducer);
  const { apiData } = useSelector(apiSelector);

  useEffect(() => {
    const audio = new Audio(apiData.audio);

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    setBackgroundColor("white")
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "30px",
        textAlign: "center",
        color: "#91278F",
        fontWeight: "400",
        position: "absolute",
        top: "30%",
      }}
    >
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <span style={{ padding: "10px" }}>
        {(FlowHeaders as any)[selectedLanguage]?.complete}
      </span>
    </div>
  );
}

export default FlowComplete;
