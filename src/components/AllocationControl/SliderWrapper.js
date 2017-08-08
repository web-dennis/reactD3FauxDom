import styled from 'styled-components'

export const SliderWrapper = styled.div`
  width: 820px;
  display: inline-flex;
  .slider {
    min-width: 0;
    min-height: 0;
    width: 100%;
    max-width: 100%;
    height: 60px;
  }
  .handle {
    background-color: transparent;
    cursor: pointer;
  }
  .slider .handle {
    width: 60px;
    height: 60px;
  }
`
