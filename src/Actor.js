import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Modal from './Modal';
import actorphoto from './Photos/actor.png'
import styled from 'styled-components';
import Radio from './Radio';
import AddActors from './AddActors';
import Popup from './Popup.js';
import errorSign from './Photos/error-alert.svg';
import serviceApi from './Services/index';
import editimg from './Photos/editimg.svg';
const Actor = (props) => {
  const services = new serviceApi();
  // const listItem = Object.keys(props);
  const [actors, setActors] = useState([])
  const [openPopup, setOpenPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [titleModal, setTitleModal] = useState([]);
  const [selectedData, setSelectedData] = useState({})


  //Data from modal
  const handleDataActors = (actorsData, type) => {
    const { name, occupation, hobbies, description } = actorsData;
    const newFormattedData = {
      name,
      occupation,
      hobbies,
      description
    };
    if (type === "create") {
      services.post("actors", newFormattedData).then(() => {
        getActors();
        setIsOpen(false);
      })
    }
    if (type === "update") {
      services.put(`actors/${selectedData.id}`, newFormattedData).then(() => {
        const newActors = [...actors]
        console.log(newActors)
        const index = actors.findIndex((actor) => actor.id === selectedData.id);
        newActors[index] = { id: selectedData.id, ...newFormattedData };
        setActors(newActors);
        setIsOpen(false);
        setSelectedData([]);
      })
    }
  }

  const handleOpenModal = (title) => {
    setIsOpen(!isOpen)
    setTitleModal(title)
  }
  const [sortData, setSortData] = useState([])
  const handleAsc = () => {
    const sortedData = [...actors].sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    setSortData(sortedData)
  }
  const handleDesc = () => {
    const sortedData = [...actors].sort((a, b) => {
      return a.name < b.name ? 1 : -1
    })
    setSortData(sortedData)
  }
  const sorting = () => {
    setActors(sortData)
  }
  const togglePopup = () => {
    setOpenPopup(!openPopup)
  }

  const getActors = () => {
    services.get("actors").then((data) => {
      setActors(data);
      setIsOpen(false)
    })
  };
  useEffect(() => {
    getActors();
  }, [])
  return (
    <StyledActor className="App">
      {/* Display the object’s information in jsx using <ul> and <li> tags.
      <ul>
        <li>{props.name}</li>
        <li>{props.score}</li>
        <li>{props.hobbies}</li>
        <li>{props.description}</li>
      </ul>
      Display the object’s information in jsx, imagining that you don’t know its properties in advance.
      <ul>
        {listItem.map((item, index) => (
          <li key={index}>
            {item}: {props[item]}
          </li>
        ))}
      </ul> */}
      <div className='sort-select'>
        <button className='sort-btn' onClick={() => handleOpenModal("Select type of sort")} >Sort</button>
        <button className='sort-btn'>Select</button>
      </div>
      <div className='cards'>
        {actors.map((actor) => (
          <div className='card'>
            {/* {actor.photo} */}
            <img src={actorphoto} alt="actor" />
            <div className="container">
              <h4>{actor.name}</h4>
              <p>{actor.occupation}{actor.score}</p>
              <p>{actor.hobbies}</p>
              <p>{actor.description}</p>
            </div>
            <div className='edit'>
              <button className='edit-btn' onClick={() => { handleOpenModal("Edit actor"); setSelectedData(actor) }}>Edit <img src={editimg} alt="editimg" className='edit-img' /></button>
            </div>
          </div>
        ))}
      </div>
      <div className='add'>
        <button className='add-btn' onClick={() => handleOpenModal("Add new actor")}>Add new actor</button>
      </div>
      <Modal {...{ isOpen, setIsOpen, title: titleModal, togglePopup, setSelectedData }}>
        {titleModal.length > 13 ?
          (<Radio
            handleAsc={handleAsc}
            handleDesc={handleDesc}
            sorting={sorting}
            handleOpenModal={handleOpenModal}
          />
          ) : (
            <AddActors
              handleDataActors={handleDataActors}
              selectedData={selectedData}
            />
          )}
      </Modal>
      {openPopup && (
        <Popup
          content={
            <>
              <div className='PopupError'>
                <img src={errorSign} alt="error" className='error-sign' />
                <p>Your changes were not saved.</p>
              </div>
            </>
          }
          handleClose={togglePopup}
        >

        </Popup>
      )}

    </StyledActor>
  );
}
Actor.propTypes = {
  name: PropTypes.string,
  score: PropTypes.string,
  hobbies: PropTypes.string,
  description: PropTypes.string
}

export default Actor
const StyledActor = styled.div`
background-color: #EFF0F6;
padding: 10px 80px;
.cards{
  display: flex;
  flex-wrap: wrap;
}
.sort-select{
  display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;
gap: 50px;
  .sort-btn{
  height: 40px;
  width: 50%;
  margin-bottom:10px;
  background-color:#EEE5FE;
  border-radius: 6px;
  border-color:#6308F7;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 120%;
  color: #14142B;
}

}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 285px;
  display: grid;
  margin: 10px;
  background-color: #FFFFFF;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
.add{
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 0px;
  .add-btn{
    width: 40%;
    height: 45px;
    border-radius:6px;
    background-color: #6308F7;
    border-color: #FCFCFC;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.75px;
    color: #FCFCFC;
    
    }
}
.PopupError{
  background-color: #FFE5F2;
  display: flex;
  height: 100%;

  p{
    margin: 10px;
    color: #ED2E7E;
  }
  .error-sign{
    width:25px;
    margin:10px;
  }
}
.edit{
  width:100%;
  height: 36px;
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  .edit-btn{
    width: 90%;
    text-align: center;
    color:#2A00A2;
    border-radius: 5px;
    border: 1px solid #2A00A2;
    background-color: #FFFFFF;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 120%;
    .edit-img{
      width:14px;
    }
  }
}

`
