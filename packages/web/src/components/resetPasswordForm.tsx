import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { css } from "@emotion/react";
import { useFormContext } from "react-hook-form";
import TextField from "./formFields/text.field";
import PasswordField from "./formFields/password.field";

type ResetPasswordFormProps = {
  onSubmit: () => void;
};

export default function ({ onSubmit }: ResetPasswordFormProps) {
  const { control } = useFormContext();

  return (
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
        label="confirm new password"
      ></PasswordField>

      <Button
        variant="contained"
        css={css`
          width: 25%;
          margin: 50px;
        `}
        onClick={onSubmit}
      >
        Reset
      </Button>
    </Box>
  );
}
