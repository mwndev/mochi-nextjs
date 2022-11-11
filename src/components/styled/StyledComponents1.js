import styled from "styled-components"



export const IconWrapper = styled.div`
  height: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${p => p.color};
  background-color: white;
  svg{
    max-height: 50%;
    height: 50%;
    aspect-ratio: 1 / 1;
    color: ${p => p.color};
  }
`