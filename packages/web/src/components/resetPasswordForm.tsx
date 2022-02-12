import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField as MUITextField,
} from "@mui/material";
import { css } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "./formFields/text.field";
import PasswordField from "./formFields/password.field";

type ResetPasswordFormProps = {
  onSubmit: () => void;
};

export default function ({ onSubmit }: ResetPasswordFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    showComfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setPasswordVisibility({
      ...passwordVisibility,
      showPassword: !passwordVisibility.showPassword,
    });
  };
  const handleClickShowComfirmPassword = () => {
    setPasswordVisibility({
      ...passwordVisibility,
      showComfirmPassword: !passwordVisibility.showComfirmPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const styles = {
    fields: css`
      width: 50%;
    `,
  };

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
      <TextField control={control} name="email" label="Email"></TextField>

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
