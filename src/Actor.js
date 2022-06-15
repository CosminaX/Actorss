import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import actorphoto from "./Photos/actor.png";
import styled from "styled-components";
import Radio from "./Radio";
import AddActors from "./AddActors";
import Popup from "./Popup.js";
import errorSign from "./Photos/error-alert.svg";
import serviceApi from "./Services/index";
import editimg from "./Photos/editimg.svg";
import deleteicon from "./Photos/Delete.svg";
import sad from "./Photos/sad.svg";
import DeleteModal from "./DeleteModal";
import added from "./Photos/added.svg";
import addedMax from "./Photos/addedMax.svg";

const Actor = (props) => {
  const services = new serviceApi();
  // const listItem = Object.keys(props);
  const [actors, setActors] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [titleModal, setTitleModal] = useState([]);
  const [modalTypeOpened, setModalTypeOpened] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [isAdded, setIsAdded] = useState(true);
  const [show, setShow] = useState(false);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [isMax, setIsMax] = useState(true);

  //Data from modal
  const handleDataActors = (actorsData, type) => {
    const { name, occupation, hobbies, description } = actorsData;
    const newFormattedData = {
      name,
      occupation,
      hobbies,
      description,
    };
    if (type === "create") {
      services.post("actors", newFormattedData).then(() => {
        setIsAdded(true);
        getActors();
        setIsOpen(false);
        togglePopup();
      });
    }
    if (type === "update") {
      services.put(`actors/${selectedData.id}`, newFormattedData).then(() => {
        const newActors = [...actors];
        const index = actors.findIndex((actor) => actor.id === selectedData.id);
        newActors[index] = { id: selectedData.id, ...newFormattedData };
        setActors(newActors);
        setIsOpen(false);
        setSelectedData([]);
      });
    }
  };

  const handleOpenModal = (title) => {
    setIsOpen(!isOpen);
    setTitleModal(title);
  };

  const handleAsc = () => {
    const sortedData = [...actors].sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setSortData(sortedData);
  };

  const handleDesc = () => {
    const sortedData = [...actors].sort((a, b) => {
      return a.name < b.name ? 1 : -1;
    });
    setSortData(sortedData);
  };

  const sorting = () => {
    setActors(sortData);
  };

  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  const getActors = () => {
    services.get("actors").then((data) => {
      setActors(data);
      setIsOpen(false);
    });
  };

  const isChecked = (data) => {
    let copyOfActors = JSON.parse(JSON.stringify(actors));
    const copyOfSelectedItems = itemsSelected;
    copyOfActors.map((actor) => {
      if (JSON.stringify(actor) === JSON.stringify(data)) {
        actor.isSelected = !actor.isSelected;
      }
      return actor;
    });
    if (copyOfSelectedItems.includes(data.id)) {
      copyOfSelectedItems.splice(copyOfSelectedItems.indexOf(data.id), 1);
    } else {
      copyOfSelectedItems.push(data.id);
    }
    setActors(copyOfActors);
    setItemsSelected(copyOfSelectedItems);
  };

  const handleSelectedAll = () => {
    const copyOfActors = JSON.parse(JSON.stringify(actors));
    const copyOfSelectedItems = itemsSelected;
    copyOfActors.map((actor) => {
      actor.isSelected = !isSelectedAll;
      if (actor.isSelected) {
        copyOfSelectedItems.push(actor.id);
      } else {
        copyOfSelectedItems.splice(copyOfSelectedItems.indexOf(actor.id), 1);
      }
      return actor;
    });
    setActors(copyOfActors);
    setIsSelectedAll(!isSelectedAll);
    setItemsSelected(copyOfSelectedItems);
  };

  const removeActors = () => {
    const promisesList = itemsSelected.map((itemId) => {
      return services.delete("actors", itemId);
    });
    Promise.all(promisesList)
      .then(() => {
        const updatedActors = actors.filter(
          (actor) => !itemsSelected.includes(actor.id)
        );
        setActors(updatedActors);
        setItemsSelected([]);
        setShow((s) => !s);
        // setIsOpen(!isOpen);
      })
      .catch((err) => console.log(err));
  };
  const DeleteDinamic = () => {
    if (!isSelectedAll) {
      removeActors();
    } else {
      setModalTypeOpened("delete");
      handleOpenModal(
        "Are you sure you want to delete all the actors of the list?"
      );
    }
  };

  const AddingMax = () => {
    if (actors.length === 7) {
      setIsMax(false);
      !show && togglePopup();
    } else {
      setIsMax(true);
      !show && handleOpenModal("Add new actor");
      !show && setModalTypeOpened("edit");
    }
  };

  useEffect(() => {
    getActors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div
        className="sort-select"
        style={{ display: actors.length === 0 ? "none" : "flex" }}
      >
        <div
          className="show-when-delete"
          style={{ display: !show ? "none" : "flex" }}
        >
          <div className="select-items">
            <span
              onClick={() => {
                setShow((s) => !s);
                setItemsSelected([]);
                setIsSelectedAll(false);
              }}
              style={{ display: !show ? "none" : "block" }}
              className="close-icon"
            >
              X
            </span>
            <span>{itemsSelected.length} Selected</span>
            <span className="vertical-line">|</span>
            <span>Select All</span>
            <input
              name="selectAll"
              type="checkbox"
              checked={isSelectedAll}
              className="select-all"
              onClick={() => handleSelectedAll()}
            />
          </div>
          <div className="delete-btn">
            <button onClick={() => DeleteDinamic()}>
              Delete
              <img src={deleteicon} className="delete-icon" alt="deleteicon" />
            </button>
          </div>
        </div>
        <button
          className="sort-btn"
          onClick={() => {
            setModalTypeOpened("sort");
            handleOpenModal("Select type of sort");
          }}
          style={{ display: show ? "none" : "block" }}
        >
          Sort
        </button>
        <button
          className="sort-btn"
          onClick={() => {
            setShow((s) => !s);
          }}
          style={{ display: show ? "none" : "block" }}
        >
          Select
        </button>
      </div>
      <div className="cards">
        {actors.length === 0 ? (
          <div className="notFound">
            <div className="empty">
              <img src={sad} className="sad-img" alt="sad-img" />
              <h1>There are no actors here. Consider adding one.</h1>
            </div>
          </div>
        ) : (
          actors.map((actor, index) => (
            <div key={index} className="card">
              {/* {actor.photo} */}
              {/* <div className='selected' style={{ display: show ? "block" : "none" }}> */}
              <input
                type="checkbox"
                className="checkbox-card"
                style={{ display: show ? "block" : "none" }}
                onChange={() => isChecked(actor)}
                checked={actor.isSelected}
              />
              {/* </div> */}
              <img src={actorphoto} alt="actor" />
              <div className="container">
                <h4>{actor.name}</h4>
                <p>
                  {actor.occupation}
                  {actor.score}
                </p>
                <p>{actor.hobbies}</p>
                <p>{actor.description}</p>
              </div>
              <div className="edit">
                <button
                  className="edit-btn"
                  onClick={() => {
                    handleOpenModal("Edit actor");
                    setSelectedData(actor);
                    setModalTypeOpened("edit");
                  }}
                >
                  Edit <img src={editimg} alt="editimg" className="edit-img" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="add">
        <button
          className={`add-btn ${show ? "disabled" : ""}`}
          onClick={() => {
            AddingMax();
          }}
        >
          Add new actor
        </button>
      </div>
      <Modal
        {...{
          isOpen,
          setIsOpen,
          title: titleModal,
          togglePopup,
          setSelectedData,
          setIsAdded,
          modalTypeOpened,
        }}
      >
        {modalTypeOpened === "sort" ? (
          <Radio
            handleAsc={handleAsc}
            handleDesc={handleDesc}
            sorting={sorting}
            handleOpenModal={handleOpenModal}
          />
        ) : modalTypeOpened === "edit" ? (
          <AddActors
            handleDataActors={handleDataActors}
            selectedData={selectedData}
          />
        ) : modalTypeOpened === "delete" ? (
          <DeleteModal removeActors={removeActors} setIsOpen={setIsOpen} />
        ) : null}
      </Modal>
      {openPopup && (
        <Popup
          content={
            isAdded === false ? (
              <>
                <StyledPopup backgroundColor={"#FFE5F2"} color={"#ED2E7E"}>
                  <div className="PopupError">
                    <img src={errorSign} alt="error" className="error-sign" />
                    <p>Your changes were not saved.</p>
                  </div>
                </StyledPopup>
              </>
            ) : isAdded === true && isMax === true ? (
              <>
                <StyledPopup backgroundColor={"#E5FFF2"} color={"#00994D"}>
                  <div className="PopupError">
                    <img src={added} alt="error" className="error-sign" />
                    <p>Actor added successfully.</p>
                  </div>
                </StyledPopup>
              </>
            ) : (
              <>
                <StyledPopup backgroundColor={"#FEFEE5"} color={"#6A5300"}>
                  <div className="PopupError">
                    <img src={addedMax} alt="error" className="error-sign" />
                    <p>You can add max. 7 actors.</p>
                  </div>
                </StyledPopup>
              </>
            )
          }
          handleClose={togglePopup}
        ></Popup>
      )}
    </StyledActor>
  );
};
Actor.propTypes = {
  name: PropTypes.string,
  score: PropTypes.string,
  hobbies: PropTypes.string,
  description: PropTypes.string,
};

export default Actor;
const StyledPopup = styled.div`
  .PopupError {
    background-color: ${(props) => `${props.backgroundColor}`};
    display: flex;
    height: 100%;

    p {
      margin: 10px;
      color: ${(props) => `${props.color}`};
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      display: flex;
      align-items: center;
    }
    .error-sign {
      width: 25px;
      margin: 10px;
    }
  }
`;
const StyledActor = styled.div`
  background-color: #eff0f6;
  padding: 10px 80px;
  .cards {
    display: flex;
    flex-wrap: wrap;
  }
  .sort-select {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 50px;
    .sort-btn {
      height: 40px;
      width: 50%;
      margin-bottom: 10px;
      background-color: #eee5fe;
      border-radius: 6px;
      border-color: #6308f7;
      font-style: normal;
      font-weight: 500;
      font-size: 17px;
      line-height: 120%;
      color: #14142b;
    }
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 285px;
    display: grid;
    margin: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    position: relative;
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 2px 16px;
  }
  .add {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 24px 0px;
    .add-btn {
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
    }
  }

  .edit {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    padding: 10px 0px;
    .edit-btn {
      width: 90%;
      text-align: center;
      color: #2a00a2;
      border-radius: 5px;
      border: 1px solid #2a00a2;
      background-color: #ffffff;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 120%;
      .edit-img {
        width: 14px;
      }
    }
  }
  .selected {
    position: relative;
  }
  .checkbox-card {
    position: absolute;
    right: 0px;
    height: 30px;
    width: 30px;
    color: #d9dbe9;
    margin: 0px;
    clip-path: circle(46% at 50% 50%);
    accent-color: #6308f7;
  }
  .show-when-delete {
    width: 100%;
    justify-content: space-between;
  }
  .select-items {
    background-color: #ffffff;
    border: 1px solid #a0a3bd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    span {
      padding: 0px 5px;
    }
  }
  .vertical-line {
    padding: 0px;
    color: #d9dbe9;
  }
  .select-all {
    height: 20px;
    width: 20px;
    color: #d9dbe9;
    margin: 0px;
    clip-path: circle(46% at 50% 50%);
    accent-color: #6308f7;
  }
  .close-icon {
    cursor: pointer;
  }
  .delete-btn {
    button {
      color: #ffffff;
      background-color: #6308f7;
      border-radius: 5px;
      border: none;
      font-size: 16px;
      display: flex;
      align-items: center;
      padding: 5px;
      .delete-icon {
        height: 16px;
        width: 16px;
        padding-left: 5px;
      }
    }
  }
  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .notFound {
    width: 100%;
    text-align: -webkit-center;
    .empty {
      width: 40%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        text-align: center;
        width: 90%;
        align-self: center;
      }
      .sad-img {
        height: 150px;
      }
    }
  }
`;
