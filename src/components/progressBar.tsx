import React from 'react'
import styled from "styled-components";

export default function ProgressBar(bar:any):JSX.Element {
    return (
        <PBar style={{ width: `${bar.bar}%`, backgroundColor: bar.bar > 100 ? '#dd0000': '' }}></PBar>
    )
}

const PBar = styled.span`
  background-color: #00ddff;
  height: 40px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  transition: width 400ms ease-in-out;
`;
