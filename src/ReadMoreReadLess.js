import React, { useState } from "react";
import styled from "styled-components";
import MoreLess from "./Photos/MoreLess.svg";

const ReadMoreReadLess = ({ children }) => {
  const [showMore, setShowMore] = useState(false);
  const text = children;
  const handleToggle = () => {
    setShowMore((prevState) => !prevState);
  };
  return (
    <StyledReadMoreReadLess>
      {showMore ? text : text.substr(0, 45) + "..."}
      <p onClick={() => handleToggle()}>
        {showMore ? "Read less" : "Read more"}
        <img
          className={showMore ? "more-icon" : "less-icon"}
          src={MoreLess}
          alt="more-less-icon"
        />
      </p>
    </StyledReadMoreReadLess>
  );
};

export default ReadMoreReadLess;

const StyledReadMoreReadLess = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  color: #6e7191;
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
    color: #f4b740;
    cursor: pointer;
    .more-icon {
      font-style: normal;
      height: 16px;
      transform: rotate(180deg);
    }
    .less-icon {
      font-style: normal;
      height: 16px;
    }
  }
`;
