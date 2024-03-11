import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    width: 100%;
    height: 100%;
    opacity: 0;
    box-shadow: inset 0 0 50px rgba(17, 17, 17, 0.1);
  }
  100% {
    width: 0;
    height: 0;
    opacity: 1;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.8);
  }
`;

export const ContainerVoice = styled.div`
  width: 424px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  position: absolute;
  bottom: 29px;
  left: 0px;
  background-color: white;
  z-index: 999999;
  border-bottom: 1px solid rgba(128, 128, 128, 0.31);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  // transition: transform 0.5s ease-in-out;
  transition: transform 0.5s ease-in-out;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const CloseIcon = styled.img`
  align-self: end;
  margin: 10px;
  display: flex;
`;

export const VoiceRecognitionContainer = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VoiceRecognitionSpan = styled.span`
  position: absolute;
  animation: ${animate} 3s linear infinite;
  border-radius: 50%;

  &:nth-child(1) {
    background-color: #d3d3d3;
    animation-delay: 2s;
  }
  &:nth-child(2) {
    background-color: #d3d3d3;
    animation-delay: 1.5s;
  }
  &:nth-child(3) {
    background-color: #d3d3d3;
    animation-delay: 0s;
  }
  &:nth-child(4) {
    background-color: #d3d3d3;
    animation-delay: 0.5s;
  }
  &:nth-child(5) {
    background-color: #d3d3d3;
    animation-delay: 1s;
  }
  &:nth-child(6) {
    background-color: #d3d3d3;
    animation-delay: 2.5s;
  }
  &:nth-child(7) {
    background-color: #d3d3d3;
    animation-delay: 3s;
  }
  &:nth-child(8) {
    background-color: #d3d3d3;
    animation-delay: 3.5s;
  }
  &:nth-child(9) {
    background-color: #d3d3d3;
    animation-delay: 4s;
  }
  &:nth-child(10) {
    background-color: #d3d3d3;
    animation-delay: 4.5s;
  }
`;

export const ContainerMic = styled.div`width: 424px;
display: flex;
flex-direction: column;
transition: height 1s ease-in-out;
flex-grow: 1;
width: 100%;
position: absolute;
// bottom: 80px;
/* left: 0px; */
/* background-color: white; */
z-index: 999999;
/* border-top: 1px solid rgba(128, 128, 128, 0.31); */
/* border-top-left-radius: 15px; */
/* border-top-right-radius: 15px;`;
