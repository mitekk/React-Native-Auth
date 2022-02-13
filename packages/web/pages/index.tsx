import { css } from "@emotion/react";
import type { NextPage } from "next";
import Layout from "../src/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div
        css={css`
          margin: 50px;
          display: flex;
          justify-content: center;
        `}
      >
        Welcome to Pocket Home page
      </div>
    </Layout>
  );
};

export default Home;
