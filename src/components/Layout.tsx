import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 480px;
  height: 680px;
  background-color: ${(props) => props.theme.boxColor};
  margin: 10% auto;
  padding: 1rem 1em;
`;

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <Container>{children}</Container>;
}

export default Layout;
