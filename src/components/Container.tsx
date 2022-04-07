import React from "react";
import styled from "styled-components";
const SContainer = styled.div`
  max-width: 480px;
  height: 680px;
  background-color: ${(props) => props.theme.boxColor};
  margin: 10% auto;
  padding: 1rem 1em;
  display: flex;
  flex-direction: column;
  border-radius: 50px;
  box-shadow: 2px 4px 18px 9px rgba(0, 0, 0, 0.73);
`;

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <SContainer>{children}</SContainer>;
}

export default Container;
