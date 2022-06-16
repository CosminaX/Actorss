import React, { useState } from "react";
import styled from "styled-components";

const AddActors = ({ handleOpenModal, handleDataActors, selectedData }) => {
  const [isRequired, setIsRequired] = useState([]);
  const [count, setCount] = useState(0);
  const [addFormData, setAddFormData] = useState({
    name: selectedData.name || "",
    occupation: selectedData.occupation || "",
    hobbies: selectedData.hobbies || "",
    description: selectedData.description || "",
  });

  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    if (event.target.name === "description") {
      setCount(event.target.value.length);
    }
    const fieldName = name || event.target.getAttribute("name");
    const newFormData = { ...addFormData };
    newFormData[fieldName] = value;
    setAddFormData(newFormData);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.occupation) {
      errors.occupation = "Occupation is required";
    }
    if (!values.hobbies) {
      errors.hobbies = "Hobbies is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    setIsRequired(errors);
    return errors;
  };
  const handleSubmit = (type) => {
    const haveErrors = validate(addFormData);
    if (Object.keys(haveErrors).length === 0) {
      handleDataActors(addFormData, type);
    }
  };
  return (
    <StyledAddActors inputColor={""}>
      {/* <div className="n_o">
        <div className="name">Name</div>
        <div className="occupation">Occupation besides acting</div>
      </div> */}
      <div className="n_o">
        <label>
          Name
          <input
            type="text"
            className={`inputMdl ${isRequired.name && "red"}`}
            name="name"
            onChange={handleAddFormChange}
            value={addFormData.name}
          />
          {isRequired && <p className="errorReq">{isRequired.name}</p>}
        </label>
        <label>
          Ocuppation
          <input
            type="text"
            className={`inputMdl ${isRequired.occupation && "red"}`}
            name="occupation"
            onChange={handleAddFormChange}
            value={addFormData.occupation}
          />
          {isRequired && <p className="errorReq">{isRequired.occupation}</p>}
        </label>
      </div>
      <label className="mdlLabel">
        Hobbies
        <input
          type="text"
          className={`inputMdl ${isRequired.hobbies && "red"}`}
          name="hobbies"
          onChange={handleAddFormChange}
          value={addFormData.hobbies}
        />
        {isRequired && <p className="errorReq">{isRequired.hobbies}</p>}
      </label>
      <label className="mdlLabel">
        Description
        <textarea
          rows="10"
          type="textarea"
          className={`inputMdl ${isRequired.description && "red"}`}
          name="description"
          onChange={handleAddFormChange}
          value={addFormData.description}
          maxLength={180}
        />
        {isRequired && <p className="errorReq">{isRequired.description}</p>}
        <p className="count">{180 - count} characters remained</p>
      </label>
      {selectedData.length === 0 ? (
        <div className="add-update">
          <button
            className="add-update-btn"
            onClick={() => handleSubmit("create")}
          >
            Add new actor
          </button>
        </div>
      ) : (
        <div className="add-update">
          <button
            className="add-update-btn"
            onClick={() => handleSubmit("update")}
          >
            Update
          </button>
        </div>
      )}
    </StyledAddActors>
  );
};

export default AddActors;
const StyledAddActors = styled.div`
  * {
    padding: 2px;
  }
  .n_o {
    display: flex;
    justify-content: space-between;
    width: 99%;
    label {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 120%;
      align-items: center;
      color: #4e4b66;
      width: 99%;
      padding-right: 10px;
    }
    @media (max-width: 400px) {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .n_oInputs {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 20px;
  }
  .inputMdl {
    width: 99%;
    border-radius: 5px;
    height: 30px;
    border: 1px solid grey;
    margin-bottom: 5px;
    background-color: ${(props) => `${props.inputColor}`};
  }
  .red {
    background-color: #ffe5f2;
    border: 2px solid #ed2e7e;
  }
  .mdlLabel {
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    margin-top: 10px;
    align-items: center;
    color: #4e4b66;
    .inputMdl {
      height: 60px;
    }
  }
  .add-update {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 24px 0px;
    .add-update-btn {
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
      @media (max-width: 500px) {
        width: 80%;
      }
    }
  }

  .errorReq {
    font-size: 12px;
    margin: 0px;
    color: #98014c;
  }
  .count {
    position: absolute;
    top: 65%;
  }
`;
