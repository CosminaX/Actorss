import React from "react";
import styled from "styled-components";

const DeleteModal = ({ removeActors, setIsOpen }) => {
  return (
    <StyledDeleteModal>
      <button
        className="delete-btn"
        onClick={() => {
          removeActors();
          setIsOpen(false);
        }}
      >
        Yes, delete all
      </button>
    </StyledDeleteModal>
  );
};

export default DeleteModal;

const StyledDeleteModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 0px;
  .delete-btn {
    width: 40%;
    height: 45px;
    border-radius: 6px;
    background-color: #6308f7;
    border-color: #fcfcfc;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.75px;
    color: #fcfcfc;
    cursor: pointer;
  }
`;
