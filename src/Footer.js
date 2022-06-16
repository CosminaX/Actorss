import React from "react";
import styled from "styled-components";
const Footer = () => {
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");
  return (
    <StyledFooter>
      <p className="date-time">{formattedDate}</p>
      <h3 className="logo">ActoKedavra</h3>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
  bottom: 0;
  width: 100%;
  font-size: 10px;
  .date-time {
    float: left;
    margin: 10px;
  }
  .logo {
    float: right;
    margin: 10px;
  }
`;
