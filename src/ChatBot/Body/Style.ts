import styled from "styled-components";

export const Container = styled.div`
  width: 424px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  // border-radius: 15px;
  position: sticky;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const TopLogoHeader = styled.div`
   display: flex;
  //  flex-direction: row;
  justify-content: center;
  background-color: #F0D9F0;
  align-items: center;
  // border-bottom: 3px solid #;
  // padding-top: 10px;
  // padding-bottom: 10px;
  // height:10%
`;

export const LogoImage = styled.img`
  align-content: center;
  width: 50px;
  height: 50px;
  padding: 15px;
`;

export const Footer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size:10px;
  font-family:IBM Plex Sans Devanagari;
  // padding-top: 5px;
  // padding-bottom: 5px;
  border-top: 1px solid rgb(238, 238, 238);
  
`;

export const FooterLink = styled.a`
  font-size: 14px;
  font-weight: 600;
  margin-left: 3px;
`;
