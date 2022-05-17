import React from 'react'
import styledComponents from 'styled-components'
const Header = () => {
  return (
    <StyledHeader>
      <h1>ActoKedavra</h1>

    </StyledHeader>
  )
}

export default Header

const StyledHeader = styledComponents.div`
h1{
  text-align:center;
}
`