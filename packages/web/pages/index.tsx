import type { NextPage } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../src/layout";
import ResetPasswordForm from "../src/components/resetPasswordForm";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

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
  const methods = useForm<ResetPasswordFields>({
    resolver: yupResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <Layout>
      <FormProvider {...methods}>
        <ResetPasswordForm onSubmit={onSubmit}></ResetPasswordForm>
      </FormProvider>
    </Layout>
  );
};

export default Home;
