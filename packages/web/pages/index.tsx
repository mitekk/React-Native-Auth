import type { NextPage } from "next";
import { useMutation, gql } from "urql";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../src/layout";
import ResetPasswordForm from "../src/components/resetPasswordForm";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

const reset_password_mutation = gql`
  mutation ResetPassword($email: String!, $password: String!, $token: String!) {
    resetPassword(email: $email, password: $password, token: $token) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        email
      }
      token
    }
  }
`;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    // .email('Invalid email format')
    .required("Please enter an email"),
  password: yup.string().required("Please enter your password"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  // ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export type ResetPasswordFields = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const defaultLoginValues: ResetPasswordFields = {
  email: "",
  password: "",
  passwordConfirm: "",
};

const Home: NextPage = () => {
  const { query } = useRouter();
  const [{}, resetPassword] = useMutation(reset_password_mutation);
  const methods = useForm<ResetPasswordFields>({
    resolver: yupResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const { token } = query;

  const onSubmit: SubmitHandler<ResetPasswordFields> = async ({
    email,
    password,
  }) => {
    const result = await resetPassword({ email, password, token });
    console.log("result", result);
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <ResetPasswordForm
          onSubmit={methods.handleSubmit(onSubmit)}
        ></ResetPasswordForm>
      </FormProvider>
    </Layout>
  );
};

export default Home;
