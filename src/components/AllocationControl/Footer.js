import React from 'react'
import styled from 'styled-components'
import { BarWrapper } from './BarWrapper'

const FooterWrapper = styled.div`
  position: absolute;
  width: 315px;
  vertical-align: middle;
  display: inline-flex;
  padding-left: 10px;
  height: 60px;
  line-height: 60px;
  color: #fff;
  .button {
    line-height: 18px;
  }
`

export const Footer = props =>
  <BarWrapper color={props.color} style={{ marginLeft: '25px' }}>
    <FooterWrapper>
      <div className='button'>Add Resource</div>
    </FooterWrapper>
  </BarWrapper>
