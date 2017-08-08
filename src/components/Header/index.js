import React from 'react'
import Nav from './Nav.jsx'
import styled from 'styled-components'
import ProjectDetails from 'containers/ProjectDetails'
// import Stacked from '../Stacked/Stacked';

const Wrapper = styled.div`width: 100%;`

const Header = props =>
  <Wrapper className='header'>
    <Nav />
    <ProjectDetails data={props.data} />
    {/* <Stacked data={props.data} /> */}
  </Wrapper>

export default Header
