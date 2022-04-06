import React from "react";
import { Container } from "@mui/material";
import { css } from "@emotion/react";
import { Box } from "@mui/system";

type LayoutProps = {
  children: JSX.Element;
  title: string;
};

export default function Layout({ title, children }: LayoutProps) {
  return (
    <Container
      maxWidth="md"
      css={css`
        display: flex;
        height: 100vh;
        flex-direction: column;
      `}
    >
      <Box
        css={css`
          flex: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        `}
      >
        <Box
          css={css`
            font-size: 75px;
          `}
        >
          Pocket
        </Box>
        <Box>{title}</Box>
      </Box>
      <Box
        css={css`
          flex: 5;
        `}
      >
        {children}
      </Box>
    </Container>
  );
}
