import React, { useEffect } from "react";
import type { NextPage } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "urql";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { verify_email_mutation } from "../src/urql/mutation.urql";
import Layout from "../src/layout";
import TextField from "../src/components/formFields/text.field";
import { validateEmailSchema } from "../src/assert/resetPassword.schema";

export type VerifyEmailFields = {
  email: string;
};

const defaultLoginValues: VerifyEmailFields = {
  email: "",
};

const ResetPassword: NextPage = () => {
  const { query } = useRouter();
  const [{ data, error, fetching }, verifyEmail] = useMutation(
    verify_email_mutation
  );

  const { token, email } = query;

  const { control, setValue, handleSubmit } = useForm<VerifyEmailFields>({
    resolver: yupResolver(validateEmailSchema),
    defaultValues: defaultLoginValues,
  });

  useEffect(() => {
    if (typeof email === "string" || email instanceof String) {
      setValue("email", email.toString());
    }
  }, [email]);

  const onSubmit: SubmitHandler<VerifyEmailFields> = () =>
    verifyEmail({ token });

  return (
    <Layout title="verify e-mail">
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
          <Box>{data?.verifyEmail?.message}</Box>
          {data?.verifyEmail?.errors?.map(
            ({ message }: { message: string }) => (
              <Box>{message}</Box>
            )
          )}
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
          <TextField
            control={control}
            name="email"
            label="email"
            disabled
          ></TextField>

          <LoadingButton
            loading={fetching}
            variant="contained"
            css={css`
              width: 25%;
              margin: 50px;
            `}
            onClick={handleSubmit(onSubmit)}
          >
            Verify
          </LoadingButton>
        </Box>
      )}
    </Layout>
  );
};

export default ResetPassword;
