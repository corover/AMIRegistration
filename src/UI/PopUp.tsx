import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    transform: translateX(calc(100% + 30px));
  }
  to {
    transform: translateX(0%);
  }
`;

const progressAnimation = keyframes`
  to {
    right: 100%;
  }
`;

const ToastContainer = styled.div<{ isActive: boolean }>`
  position: absolute;

  top: -13vh;
  left: 35%;
  width: fit-content;
  right: 50%;
  border-radius: 12px;
  background: #fff;
  padding: 20px 35px 20px 25px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  //   transform: translate(-50%, -50%) translateX(calc(100% + 30px));
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);

  &.active {
    animation: ${fadeIn} 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    transform: translateX(0%);
  }

  .toast-content {
    display: flex;
    align-items: center;

    .check {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 35px;
      min-width: 35px;
      background-color: rgb(145, 39, 143);
      color: #fff;
      font-size: 20px;
      border-radius: 50%;
    }

    .message {
      display: flex;
      flex-direction: column;
      margin: 0 20px;

      .text {
        font-size: 16px;
        font-weight: 400;
        color: #666666;
      }

      .text.text-1 {
        font-weight: 600;
        color: #333;
      }

      .text.text-2 {
        font-size: 20px;
        font-weight: 700;
        color: #666666;
      }
    }
  }

  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }

  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      background-color: rgb(145, 39, 143);
    }

    &.active:before {
      animation: ${progressAnimation} 5s linear forwards;
    }
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 20px;
  outline: none;
  border: none;
  background-color: rgb(145, 39, 143);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0e4bf1;
  }

  ~ ${ToastContainer}.active {
    pointer-events: none;
  }
`;

const PopUp = (props: any) => {
  const { otp } = props;
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isProgressActive, setIsProgressActive] = useState<boolean>(false);

  let timer1: NodeJS.Timeout;
  let timer2: NodeJS.Timeout;

  useEffect(() => {
    setIsActive(true);
    setIsProgressActive(true);

    // timer1 = setTimeout(() => {
    //   setIsActive(false);
    // }, 5000);

    // timer2 = setTimeout(() => {
    //   setIsProgressActive(false);
    // }, 5300);
  }, []);

  const hideToast = () => {
    setIsActive(false);

    setTimeout(() => {
      setIsProgressActive(false);
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
  };

  useEffect(() => {
    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      {isActive && (
        <ToastContainer
          className={isActive ? "active" : ""}
          isActive={isActive}
        >
          <div className="toast-content">
            {/* <i className="fas fa-solid fa-check check"></i> */}
            <div className="message">
              <span className="text text-1">OTP</span>
              <span className="  text text-2">{otp}</span>
            </div>
          </div>

          <img
            src="close.png"
            width="13px"
            alt="qq"
            onClick={hideToast}
            className="fa-solid fa-xmark close"
          />
          <div className={`progress ${isProgressActive ? "active" : ""}`}></div>
        </ToastContainer>
      )}

      {/* <Button onClick={showToast}>Show Toast</Button> */}
    </>
  );
};

export default PopUp;
