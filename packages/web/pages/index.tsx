import type { NextPage } from "next";
import Layout from "../src/layout";
import ResetPasswordForm from "../src/components/resetPasswordForm";

const Home: NextPage = () => {
  return (
    <Layout>
      <ResetPasswordForm></ResetPasswordForm>
    </Layout>
  );
};

export default Home;
