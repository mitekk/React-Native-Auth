import React from "react";
import type { NextPage } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "urql";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { reset_password_mutation } from "../src/urql/mutation.urql";
import Layout from "../src/layout";
import PasswordField from "../src/components/formFields/password.field";
import TextField from "../src/components/formFields/text.field";
import { resetPasswordSchema } from "../src/assert/resetPassword.schema";

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

const ResetPassword: NextPage = () => {
  const { query } = useRouter();
  const [{ data, error, fetching }, resetPassword] = useMutation(
    reset_password_mutation
  );
  const { control, handleSubmit } = useForm<ResetPasswordFields>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: defaultLoginValues,
  });

  const { token } = query;

  const onSubmit: SubmitHandler<ResetPasswordFields> = async ({
    email,
    password,
  }) => {
    const result = await resetPassword({ email, password, token });
  };

  return (
    <Layout>
      {data || error ? (
        <Box
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column;
            margin: 50px;
          `}
        >
          <Box>Request was submited successfully</Box>
          <Box>You can return to Pocket application</Box>
        </Box>
      ) : (
        <Box
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin-top: 50px;
          `}
          autoCapitalize="false"
        >
          <TextField control={control} name="email" label="email"></TextField>

          <PasswordField
            control={control}
            name="password"
            label="new password"
          ></PasswordField>

          <PasswordField
            control={control}
            name="passwordConfirm"
            label="confirm password"
          ></PasswordField>

          <LoadingButton
            loading={fetching}
            variant="contained"
            css={css`
              width: 25%;
              margin: 50px;
            `}
            onClick={handleSubmit(onSubmit)}
          >
            Reset
          </LoadingButton>
        </Box>
      )}
    </Layout>
  );
};

export default ResetPassword;
