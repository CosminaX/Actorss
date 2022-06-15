import React from "react";
import styled from "styled-components";

const Radio = ({ handleAsc, handleDesc, sorting, handleOpenModal }) => {
  const radioChange = (e) => {
    if (e.target.value === "Ascending") {
      handleAsc();
    } else {
      handleDesc();
    }
  };
  return (
    <StyledRadio>
      <div className="sorting">
        <div className="asc">
          <input
            type="radio"
            id="Ascending"
            name="sort"
            value="Ascending"
            onChange={(e) => radioChange(e)}
          />
          <label>Ascending</label>
          <br />
        </div>
        <div className="desc">
          <input
            type="radio"
            id="Descending"
            name="sort"
            value="Descending"
            onChange={(e) => radioChange(e)}
          />
          <label>Descending</label>
          <br />
        </div>
      </div>
      <div className="sortingBtn">
        <button
          className="sort"
          onClick={() => {
            handleOpenModal("");
            sorting();
          }}
        >
          Sort
        </button>
      </div>
    </StyledRadio>
  );
};

export default Radio;
const StyledRadio = styled.div`
  .sortingBtn {
    width: 100%;
    display: flex;
    justify-content: center;
    .sort {
      left: 175px;
      bottom: 10px;
      width: 66px;
      height: 36px;
      border-radius: 5px;
      border-color: #6308f7;
      color: #6308f7;
      margin: 10px;
      cursor: pointer;
    }
  }
  .sorting {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  label {
    color: #6308f7;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.75px;
  }
  .asc,
  .desc {
    display: flex;
    justify-content: center;
  }
`;
