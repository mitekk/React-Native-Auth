import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { css } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  useFormContext,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { ResetPasswordFields } from "../../pages";

type ResetPasswordFormProps = {
  onSubmit: (data: FieldValues) => void;
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

  console.log(errors);

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
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            label="email"
            variant="standard"
            margin="normal"
            css={styles.fields}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            label="new password"
            variant="standard"
            margin="normal"
            type={passwordVisibility.showPassword ? "text" : "password"}
            autoComplete="current-password"
            css={styles.fields}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {passwordVisibility.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="passwordConfirm"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            label="comfirm new password"
            variant="standard"
            margin="normal"
            type={passwordVisibility.showComfirmPassword ? "text" : "password"}
            autoComplete="current-password"
            css={styles.fields}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowComfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {passwordVisibility.showComfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Button
        variant="contained"
        css={css`
          width: 25%;
          margin: 50px;
        `}
        onClick={handleSubmit(onSubmit)}
      >
        Reset
      </Button>
    </Box>
  );
}
