import React from "react";
import "./Footer.css";
import { Fade } from "react-reveal";
import { greeting } from "../../portfolio.js";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="footer-div">
      <Fade>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          &copy; {year}{" "}
          <a
            href="https://wa.me/2348134041124"
            style={{ color: props.theme.secondaryText, textDecoration: "none" }}
          >
            {" "}
            {greeting.foot}{" "}
          </a>
        </p>
        {/* <ToggleSwitch theme={props.theme} onToggle={props.onToggle}/> */}
      </Fade>
    </div>
  );
}
