import React from 'react';
import {
  Link
} from 'react-router-dom';
import styled from 'styled-components'

const Wrapper = styled.div`  
  background-color: black;
  width:100vw;
  display: inline-flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(135, 149, 161, 0.4);
  
  .linkGroup {
    margin: 10px;
    padding: 5px 0px 0px 0px;
    
    a {
      color: #c4d1da;
      padding:10px;
      text-decoration: none;
    }
  }
`

const Nav = () => (
    <Wrapper className="header-nav">
      <div className="linkGroup">
        <Link to="/" >
          <img src="logo.png" height='25px' alt="logo"/>
        </Link>
      </div>
      <div className="linkGroup">
        <Link to="/example">Example (dead simple)</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/people">People</Link>
      </div >
      <div className="button linkGroup"><Link to="/addProject">Add Project</Link></div>
    </Wrapper>
)

export default Nav