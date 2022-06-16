import React from "react";
import styled from "styled-components";

const Modal = ({
  title,
  isOpen,
  setIsOpen,
  children,
  togglePopup,
  setSelectedData,
  setIsAdded,
  modalTypeOpened,
}) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setSelectedData([]);
    setIsAdded(false);
  };

  return (
    <>
      {isOpen && (
        <StyledModal>
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              <h2 className="title-modal"> {title} </h2>
              <hr className="hr" />
              <div className="content">{children}</div>
              <p className="close-modal" onClick={toggleModal}>
                {" "}
                x{" "}
              </p>
              <div className="modal-footer"></div>
              {!(modalTypeOpened === "sort") ? (
                <p
                  className="add-close"
                  id="changed-my-mind"
                  onClick={() => {
                    toggleModal();
                    togglePopup();
                  }}
                >
                  I changed my mind
                </p>
              ) : null}
            </div>
          </div>
        </StyledModal>
      )}
    </>
  );
};

export default Modal;

const StyledModal = styled.div`
  body.active-modal {
    overflow-y: hidden;
  }
  .btn-modal {
    padding: 10px 20px;
    display: block;
    margin: 100px auto 0;
    font-size: 18px;
  }

  .modal,
  .overlay {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
  }
  .overlay {
    background: rgba(49, 49, 49, 0.8);
  }
  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #ffffff;
    padding: 14px 28px;
    border-radius: 3px;
    height: auto;
    width: 60%;
  }

  .close-modal {
    position: absolute;
    top: -20px;
    right: 5px;
    padding: 5px 7px;
    font-weight: bold;
    cursor: pointer;
  }
  .title-modal {
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 32px;
    color: #000000;
    margin: 5px;
  }
  .hr {
    margin-bottom: 20px;
  }
  .add-button {
    width: 100px;
    height: 36px;
    border-radius: 5px;
    margin: 10px;
  }
  .modal-footer {
    position: absolute;
    top: 370px;
    right: 0;
    margin: 20px;
  }
  .add-close {
    display: flex;
    justify-content: center;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    text-align: center;
    color: #4e4b66;
    margin: 0px;
    cursor: pointer;
  }
`;
