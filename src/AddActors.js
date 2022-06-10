import React, { useState } from 'react'
import styled from 'styled-components'

const AddActors = ({ handleOpenModal,
  handleDataActors,
  selectedData }) => {
  const [addFormData, setAddFormData] = useState({
    name: selectedData.name || "",
    occupation: selectedData.occupation || "",
    hobbies: selectedData.hobbies || "",
    description: selectedData.description || ""
  })

  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    const fieldName = name || event.target.getAttribute("name");
    const newFormData = { ...addFormData };
    newFormData[fieldName] = value;
    setAddFormData(newFormData)
  }
  return (
    <StyledAddActors>
      <div className='n_o'>
        <div className='name'>Name</div>
        <div className='occupation'>Occupation besides acting</div>
      </div>
      <label className='n_oInputs'>
        <input
          type='text'
          className='inputMdl'
          name="name"
          onChange={handleAddFormChange}
          value={addFormData.name}
        />
        <input
          type='text'
          className='inputMdl'
          name="occupation"
          onChange={handleAddFormChange}
          value={addFormData.occupation}
        />
      </label>
      <label className='mdlLabel'>
        Hobbies
        <input
          type='text'
          className='inputMdl'
          name="hobbies"
          onChange={handleAddFormChange}
          value={addFormData.hobbies}
        />
      </label>
      <label className='mdlLabel'>
        Description
        <input
          type='text'
          className='inputMdl'
          name="description"
          onChange={handleAddFormChange}
          value={addFormData.description}
        />
      </label>
      {
        selectedData.length === 0 ? (
          <div className='add-update'>
            <button className='add-update-btn' onClick={() => handleDataActors(addFormData, "create")}>Add new actor</button>
          </div>
        ) : (
          <div className='add-update'>
            <button className='add-update-btn' onClick={() => handleDataActors(addFormData, "update")}>Update</button>
          </div>
        )
      }

    </StyledAddActors >
  )
}

export default AddActors
const StyledAddActors = styled.div`
*{
  padding: 2px;
}
.n_o{
  display: flex;
  justify-content: space-between;
  width: 75%;
  .name {
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    align-items: center;
    color: #4E4B66;
  }
  .occupation{
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    align-items: center;
    color: #4E4B66;
  }
}
.n_oInputs{
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
}
.inputMdl{
  width: 99%;
  border-radius:5px;
  height: 30px;
  border:1px solid grey;
}
.mdlLabel{
  display: block;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  align-items: center;
  color: #4E4B66;
  .inputMdl{
    height: 60px;
  }
}
.add-update{
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 0px;
  .add-update-btn{
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

`