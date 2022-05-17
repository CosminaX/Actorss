import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Modal from './Modal'
import actor from "./Photos/actor.png"
import actor2 from "./Photos/actor2.png"
import actor3 from "./Photos/actor3.png"
import actor4 from "./Photos/actor4.png"
import styled from 'styled-components';
const Actor = (props) => {

  // const listItem = Object.keys(props);
  const [actors, setActors] = useState([
    { photo: <img src={actor} alt="" />, name: "Leondardo Dicaprio", occupation: "Actor & Writer", score: "100", hobbies: "Traveling,Reading", description: "It's easy to believe Leonardo DiCaprio really ...”" },
    { photo: <img src={actor2} alt="" />, name: "Angelia Jolie", occupation: "Actress & Producer", score: "80", hobbies: "Traveling,Reading", description: "It's easy to believe Leonardo DiCaprio really ...”" },
    { photo: <img src={actor3} alt="" />, name: "Jennifer Aniston", occupation: "Actor & Writer", score: "100", hobbies: "Traveling,Reading", description: "It's easy to believe Leonardo DiCaprio really ...”" },
    { photo: <img src={actor4} alt="" />, name: "Dwayne Johnson", occupation: "Actor & Producer", score: "100", hobbies: "Traveling,Reading", description: "It's easy to believe Leonardo DiCaprio really ...”" },
  ])
  const [isOpen, setIsOpen] = useState(false);
  const [titleModal, setTitleModal] = useState([]);
  const handleOpenModal = (title) => {
    setIsOpen(!isOpen)
    setTitleModal(title)
  }
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
      <button className='sort-btn' onClick={() => handleOpenModal("Sort")} >Sort</button>
      <div className='cards'>
        {actors.map((actor) => (
          <div className='card'>
            {actor.photo}
            <div className="container">
              <h4>{actor.name}</h4>
              <p>{actor.occupation}{actor.score}</p>
              <p>{actor.hobbies}</p>
              <p>{actor.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal {...{ isOpen, setIsOpen, title: titleModal }}></Modal>
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
padding: 10px 80px;
.cards{
  display: flex;
flex-wrap: wrap;
}
.sort-btn{
  height: 40px;
  width: 50px;
  margin-bottom:10px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 285px;
  display: grid;
  margin-right: 20px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
`
