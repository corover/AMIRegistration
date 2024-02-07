import styled from "styled-components";

export const ContentChat = styled.div`
  background: #eeeeee;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::before,
  &::after {
    content: "";
    display: block;
    height: 20px;
    width: 100%;
  }
`;

export const UserMessage = styled.div`
  background-color: #af0171;
  color: #fff;
  align-self: flex-end;
  border-radius: 18px 18px 1px 18px;
  padding: 10px;
  font-size: medium;
  max-width: 70%;
  margin-right: 10px;
`;

export const BotMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 10px;
  justify-content: flex-start;
`;

export const BotMessage = styled.div`
  background-color: #fff;
  align-self: flex-start;
  border-radius: 18px 18px 18px 1px;
  padding: 10px;
  margin-left: 5px;
  font-size: medium;
  max-width: 70%;
`;

export const BotSpeaker = styled.span`
  background-color: #fff;
  align-self: flex-start;
  border-radius: 18px 18px 18px 1px;
  padding: 7px;
  margin-left: 40px;
  max-width: 63%;
  min-width: 20%;
  padding-right: 12px;
  font-size: large;
  margin-bottom: 15px;
`;

export const TimeUser = styled.div`
  align-self: flex-end;
  font-size: 1.6vh;
  margin-right: 10px;
  margin-top: -10px;
  display: flex;
  justify-content: space-between !important;
`;

export const TimeBot = styled.div`
  align-self: flex-start;
  display: flex;
  padding-left: 5px;
  font-size: 1.6vh;
  margin-left: 37px;
  justify-content: space-between !important;
  margin-top: -18px;
  display: flex;
  flex-direction: row;
`;

export const DropDown = styled.div`
  margin-top: 2px;
  width: 424px;
  font-size: medium;
  z-index: 103;
  display: flex;
  flex-direction: column;
  margin: auto;
  position: absolute;
  max-height: 80vh;
  min-height: 30vh;
  background-color: white;
  bottom: 30px;
  left: 0;
  right: 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding-bottom: 8px;
  border-radius: 20px;
`;

export const CloseIcon = styled.img`
  align-self: end;
  margin: 10px;
  display: flex;
`;

export const OptionHeader = styled.p`
font-size: 24px;
font-weight: 400;
text-align: center;
padding-top: 14px;
margin: 4px;
`;

export const OptionItem = styled.p`
  padding: 4px;
  font-size: 1rem;
  text-align: center;
  margin: 4px;
  cursor: pointer;
`;

export const FileLabel = styled.label`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #af0171;
  width: 367px;
  text-align: center;
  border-radius: 8px;
  border: none;
`;


export const OptionContainer = styled.div`
  background-color: #f8f6f4;
  align-self: center;
  border-radius: 18px 18px 18px 18px;
  padding: 5px;
  margin-left: 15px;
  margin-right: 15px;
  min-width: 20%;
  font-size: large;
  margin-bottom: 10px;
`;

export const OtherLanguage = styled.span`
  margin: 10px;
  padding: 10px;
  width: fit-content;
  border: 1px solid #91278F;
  border-radius: 30px;
  color: #91278F;
  background-color: #fff;
`;

export const SelectedLanguage = styled.span`
  margin: 10px;
  padding: 10px;
  width: fit-content;
  border: 1px solid #91278F;
  border-radius: 30px;
  color: #91278F;
  font-weight: bold;
  background-color: #e9c7f3;
`;

export const SchemesList = styled.p`
padding: 4px;
font-size: 1rem;
text-align: center;
cursor: pointer;
max-width: 75%;
min-width: 30%;
margin: 10px auto;
padding: 7px;
background-color: #af0171;
color: #fff;
border-radius: 10px;
`;

export const LanguageContainer=styled.div`

  height: fit-content;
  z-index: 130;
  background-color: white;
  display: flex;
  margin: auto;
  flex-direction: column;
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: absolute;
  padding: 6px;

  align-items: start;
  margin: 0 auto;
  border-radius: 20px;
`



export const SchemeItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  cursor: pointer;
`;

export const SchemeName = styled.p`
  font-size: 16px;
  margin-left: 10px;
`;


export const ReadMoreButton = styled.button`
  display: block;
  margin: 10px auto;
  background-color: #af0171;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px;
  cursor: pointer;
  font-size: medium !important;
  font-weight:700 !important;

  &:focus {
    outline: none;
  }
`;


export const Close = styled.div`
  align-self: end;
  margin: 10px;
  display: flex;
`;

