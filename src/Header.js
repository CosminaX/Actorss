import React from "react";
import styled from "styled-components";
const Header = () => {
  return (
    <StyledHeader>
      <h1>ActoKedavra</h1>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  h1 {
    text-align: center;
    @media (max-width: 375px) {
      font-size: 16px;
    }
  }
`;
