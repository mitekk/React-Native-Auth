import { Container } from "@mui/material";
import React from "react";
import { css } from "@emotion/react";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container
      maxWidth="md"
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
    </Container>
  );
}
