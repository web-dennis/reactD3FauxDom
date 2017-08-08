import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  color: white;
  font-weight: 700;
  border-bottom: 1px solid rgba(135, 149, 161, 0.4);
  display: inline-flex;
  justify-content: space-between;
  width: 100%;

  .project-details {
    margin: 20px 2px 20px 30px;
  }

  .project-edit {
    margin: 10px 0px;
  }

  h3, h6 {
    margin:0;
    span {
      color: #2487a1
    }
  }
`

const ProjectDetails = (props) => (
    <Wrapper className="project">
      <div className="project-details">
        <h3>{props.project.title}</h3>
        <h6>Type: <span>{props.project.type}</span></h6>
      </div>
      <div className="project-edit">
        <div className="button">Edit Project</div>
      </div>
    </Wrapper>
)

export default ProjectDetails