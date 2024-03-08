import React from "react";
import { ContainerVoice } from "../../UI/Style";
import { useSelector } from "react-redux";
import { apiSelector, reducer } from "../../store/Redux-selector/Selector";
import { FlowHeaders } from "../../translation";
import { playAudio } from "../../utils/data";
function ExistUser() {
  const [countdown, setCountdown] = React.useState(10);

  const apiData = useSelector(apiSelector).apiData;
  const { selectedLanguage } = useSelector(reducer);

  React.useEffect(() => {
    playAudio(apiData && apiData.audio);

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown <= 1 ? 10 : prevCountdown - 1
      );
    }, 1000);

    const redirect = setTimeout(() => {
      // window.location.href = 'https://corover-dev3.axispeople.org/';
    }, 5000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(redirect);
    };
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
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          {(FlowHeaders as any)[selectedLanguage]?.profileExist}
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
        <>
          <span
            style={{
              fontSize: "20px",
              paddingTop: "35px",
            }}
          >
            {(FlowHeaders as any)[selectedLanguage]?.profileExistMssg}
          </span>

          <div id="countdown">
            <div id="countdown-number">{countdown}</div>
            <svg
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "40px",
                height: "40px",
                transform: "rotateY(-180deg) rotateZ(-90deg)",
              }}
            >
              <circle r="18" cx="20" cy="20"></circle>
            </svg>
          </div>
        </>
      </div>
    </ContainerVoice>
  );
}

export default ExistUser;
