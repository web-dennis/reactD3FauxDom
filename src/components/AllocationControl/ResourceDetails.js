import React from 'react'
import styled from 'styled-components'

const ResourceDetailsWrapper = styled.div`
  width: 325px;
  height: 100%;
  vertical-align: middle;
  display: inline-flex;
  img {
    margin-left: 10px;
  }
  img.calendar {
    padding-top: 15px;
    width: 17px;
    height: 18px;
  }
  img.locker {
    padding-top: 23px;
    margin-left: 17px;
    width: 10px;
    height: 13px;
  }
  .resource-info {
    width: 180px;
    padding-top: 10px;
    padding-left: 10px;
  }
  .resource-label {
    font-size: 14px;
    line-height: 14px;
    margin-top: 15px;
  }
  .resource-role {
    font-size: 11px;
    line-height: 11px;
    position: relative;
  }
  .resource-value {
    padding-top: 13px;
  }
`

export const ResourceDetails = props =>
  <ResourceDetailsWrapper>
    <img src={'calendar.png'} alt='calendar' className='calendar' />
    <div className='resource-info'>
      <span className='resource-label'>
        {props.label}
      </span>
      <br />
      <span className='resource-role' style={{ color: props.color }}>
        {props.role}
      </span>
    </div>
    <div className='resource-value'>
      <input
        type='number'
        value={Math.round(props.value)}
        onChange={props.onChange()}
      />
    </div>
    <img
      src={props.locked ? 'locked.png' : 'unlocked.png'}
      onClick={props.toggleLocked}
      className='locker'
      alt='locker'
    />
  </ResourceDetailsWrapper>
