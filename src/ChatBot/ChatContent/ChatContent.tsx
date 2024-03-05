import "./Style.css";
import { LogoImage, TopLogoHeader } from "../Body/Style";
import { useSelector } from "react-redux";
import {
  flowReducer,
  reducer,
  apiSelector,
} from "../../store/Redux-selector/Selector";
import LoadingComponent from "../../Loading/LoadingComponent";

import LanguageSelection from "../../Flows/LanguageOption/Index";
import MobileNumber from "../../Flows/MobileNo/Index";
import OTPValidation from "../../Flows/OTPValidation/Index";
import Name from "../../Flows/Name/Index";
import Gender from "../../Flows/Gender/Index";
import DateOfBirth from "../../Flows/DateOfBirth/Index";
import BlockedUser from "../../Flows/UserBlocked/Index";
import ExistUser from "../../Flows/UserExist/Index";
import State from "../../Flows/State/Index";
import District from "../../Flows/District/Index";
import City from "../../Flows/City/Index";
import AreaOfIntrest from "../../Flows/AreaOfIntrest/Index";
import FlowComplete from "../../Flows/FlowComplete/Index";
import PinCode from "../../Flows/PinCode/Index";

function ChatContent() {
  const {
    languageView,
    mobileNoView,
    nameView,
    generateOtpView,
    genderView,
    dobView,
    stateView,
    districtView,
    cityView,
    pincodeView,
    areaOfIntrest,
  } = useSelector(flowReducer);
  const { loading, bgColor } = useSelector(reducer);
  const { apiData, isBlocked, hasProfile, isNewUser, enableLocation } =
    useSelector(apiSelector);
  // console.log("enableLocation", enableLocation);
  const renderComponent = () => {
    switch (true) {
      case loading:
        return <LoadingComponent />;
      case languageView:
        return <LanguageSelection />;
      case mobileNoView:
        return <MobileNumber />;
      case generateOtpView:
        return <OTPValidation />;
      case apiData && isBlocked:
        return <BlockedUser />;
      case apiData && hasProfile:
        return <ExistUser />;
      case nameView && isNewUser:
        return <Name />;
      case genderView:
        return <Gender />;
      case dobView:
        return <DateOfBirth />;
      case !enableLocation && stateView:
        return <State />;
      case !enableLocation && districtView:
        return <District />;
      case !enableLocation && cityView:
        return <City />;
      case !enableLocation && pincodeView:
        return <PinCode />;
      case areaOfIntrest:
        return <AreaOfIntrest />;
      case apiData && apiData.flowComplete:
        return <FlowComplete />;
      default:
        return <LanguageSelection />;
    }
  };
  return (
    <div className="ContentChat" style={{ backgroundColor: `${bgColor}` }}>
      <TopLogoHeader className={"TopLogoHeader"}>
        <LogoImage className={"LogoImage"} src="a_logo.png" alt="header" />
      </TopLogoHeader>

      {renderComponent()}
    </div>
  );
}

export default ChatContent;
