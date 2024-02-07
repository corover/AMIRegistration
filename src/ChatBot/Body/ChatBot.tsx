import React from "react";
import ChatContent from "../ChatContent/ChatContent";
import {
  Container,
  TopLogoHeader,
  LogoImage,
  Footer,
  FooterLink,
} from "./Style";

const Chatbot = () => {
  //  throw new Error('Oops, something went wrong!');

  return (
    <Container
      className={"Container"}
      style={{ fontFamily: "  IBM Plex Sans Devanagari !important" }}
    >
      <ChatContent />
      <Footer className={"Footer"}>
        <span>
          Powered by
          <FooterLink className={"FooterLink"} href="https://corover.ai/">
            <img
              src="CoRover.png"
              alt="corover"
              width="50px"
              style={{ marginBottom: "-2px" }}
            />
          </FooterLink>
        </span>
      </Footer>
    </Container>
  );
};

export default Chatbot;
