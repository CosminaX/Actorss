import React from 'react'
import PropTypes from 'prop-types';
const Actor = (props) => {

  const listItem = Object.keys(props);
  console.log(listItem);
  return (
    <div className="App">
      {/* Display the object’s information in jsx using <ul> and <li> tags. */}
      <ul>
        <li>{props.name}</li>
        <li>{props.score}</li>
        <li>{props.hobbies}</li>
        <li>{props.description}</li>
      </ul>
      {/* Display the object’s information in jsx, imagining that you don’t know its properties in advance. */}
      <ul>
        {listItem.map((item, index) => (
          <li key={index}>
            {item}: {props[item]}
          </li>
        ))}
      </ul>
    </div>
  );
}
Actor.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  hobbies: PropTypes.string,
  description: PropTypes.string
}

export default Actor
