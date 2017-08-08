import React from 'react'
import PropTypes from 'prop-types'
import styled, { injectGlobal } from 'styled-components'

const { array } = PropTypes

/* eslint-disable no-unused-expressions */
injectGlobal`  
  body {
    font-family: 'Roboto';
    margin: 0;
    height: 100%;
    min-height: 100vh;
   }
  .button {
    background-color: #0f1c25;
    border-radius: 5px;
    border: 1px solid #c4d1da;
    text-align: center;
    padding: 5px;
    background-color: #202b35;
    margin: 10px;
    text-transform: uppercase;
    font-size: 12px;
    padding:10px;

    a {
      line-height: 24px;
    }
  }
  main {
    width:1200px;
      margin: auto;
  }
  input {
    text-align: right;
    max-width: 60px;
    border-radius: 5px;
    border: 1px solid #252633;
    &[type=number] {
     font-size:14px;
     height: 27px 
    }
  }
`

const Root = styled.div`
  background-color: #0f1c25;
  color: #872f4f;
  min-height: 100vh;
  height: 100%;
  max-width: 100%;
`

const ThemedApp = ({ theme, children }) =>
  <Root>
    {children}
  </Root>

ThemedApp.propTypes = {
  children: array
}

export default ThemedApp
