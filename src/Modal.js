import React from 'react'
import styled from 'styled-components'

const Modal = ({ title, isOpen, setIsOpen, children }) => {
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen && (
        <StyledModal>
          <div className='modal'>
            <div className='overlay' ></div>
            <div className='modal-content'>
              <h2 className='title-modal'> {title} </h2>
              <hr className='hr' />
              <div className='content'>
                {children}
              </div>
              <p className='close-modal' onClick={toggleModal}> x </p>
              <div className='modal-footer'>
              </div>
              {/* <button variant="outlined" className='sort-button' onClick={toggleModal} >Sort</button> */}
            </div>
          </div>
        </StyledModal>
      )}
    </>
  )
}

export default Modal

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

.modal, .overlay {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
}
.overlay {
  background: rgba(49,49,49,0.8);
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background:  #FFFFFF;
  padding: 14px 28px;
  border-radius: 3px;
  height: auto;
  width: 360px;
}

.close-modal {
  position: absolute;
  top: -20px;
  right: 5px;
  padding: 5px 7px;
  font-weight: bold;
  cursor: pointer;
}
.title-modal{
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
  color: #000000;
  margin: 5px;
}
.hr{
  margin-bottom: 20px;
}
.add-button {
  width:100px;
  height:36px;
  border-radius: 5px;
  margin: 10px;
}
.sort-button{
  position: relative;
  left: 175px;
  bottom: 10px;
  width:66px;
  height:36px;
  border-radius: 5px;
  margin: 10px;
}
.css-1rwt2y5-MuiButtonBase-root-MuiButton-root:hover,
.css-1rwt2y5-MuiButtonBase-root-MuiButton-root
{
    background-color: #F5F5F7 !important;
    color: black ;
    border: none;
  }
.css-sghohy-MuiButtonBase-root-MuiButton-root{
  background-color: #1A1A1A !important;
  color: #44DABD !important;
}
.modal-footer{
  position: absolute;
  top: 370px;
  right: 0;
  margin: 20px;
}

`