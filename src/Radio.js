import React from 'react'
import styled from 'styled-components'

const Radio = ({
  handleAsc,
  handleDesc,
  sort,
  handleOpenModal
}) => {
  const radioChange = (e) => {
    if (e.target.value === "Ascending") {
      handleAsc()
    } else {
      handleDesc()
    }
  }
  return (
    <StyledRadio>
      <input type="radio" id="Ascending" name="sort" value="Ascending" onChange={(e) => radioChange(e)} />
      <label for="Ascending">Ascending</label><br />
      <input type="radio" id="Descending" name="sort" value="Descending" onChange={(e) => radioChange(e)} />
      <label for="Descending">Descending</label><br />
      <div className='sorting'>
        <button className='sort' onClick={() => { sort(); handleOpenModal() }}>Sort</button>
      </div>
    </StyledRadio >
  )
}

export default Radio
const StyledRadio = styled.div`
.sorting{
  width: 100%;
  display: flex;
  justify-content: center;
}

`