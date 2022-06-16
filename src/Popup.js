import React from "react";
import styled from "styled-components";

const Popup = (props) => {
  return (
    <StyledPopup>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {props.content}
        </div>
      </div>
    </StyledPopup>
  );
};

export default Popup;
const StyledPopup = styled.div`
  body {
    margin: 0;
    padding: 15px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  .popup-box {
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .box {
    position: relative;
    width: 60vh;
    margin: 0 auto;
    height: auto;
    height: 45px;
    margin-top: calc(100vh - 65vh - 20px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #999;
    overflow: auto;
    @media (max-width: 425px) {
      width: 250px;
    }
  }

  .close-icon {
    content: "x";
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 25px;
    height: 25px;
    color: #1a1a1a;
    @media (max-width: 425px) {
      width: 15px;
      height: 15px;
    }
  }
`;
