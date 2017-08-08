import styled from 'styled-components'

export const BarWrapper = styled.div`
  max-width: 1200px;
  height: 60px;
  display: flex;
  background: ${props => props.color || '#fff'};
  border-bottom: 1px solid #d7dee2;
`
