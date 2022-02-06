import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { css } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type ResetPasswordFields = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function () {
  const [formState, setFormstate] = useState({
    showPassword: false,
    showComfirmPassword: false,
  });
  const { handleSubmit } = useForm<ResetPasswordFields>();

  const onSubmit = handleSubmit(({ email, password, passwordConfirm }) => {
    console.log(email, password, passwordConfirm);
  }); //

  const handleClickShowPassword = () => {
    setFormstate({
      ...formState,
      showPassword: !formState.showPassword,
    });
  };
  const handleClickShowComfirmPassword = () => {
    setFormstate({
      ...formState,
      showComfirmPassword: !formState.showComfirmPassword,
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
      <TextField
        id="standard-basic"
        label="email"
        variant="standard"
        margin="normal"
        css={styles.fields}
      />
      <TextField
        id="standard-basic"
        name="asda"
        label="new password"
        variant="standard"
        margin="normal"
        type={formState.showPassword ? "text" : "password"}
        autoComplete="current-password"
        css={styles.fields}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {formState.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="standard-basic"
        label="comfirm new password"
        variant="standard"
        margin="normal"
        type={formState.showComfirmPassword ? "text" : "password"}
        autoComplete="current-password"
        css={styles.fields}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowComfirmPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {formState.showComfirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        css={css`
          width: 25%;
          margin: 50px;
        `}
      >
        Contained
      </Button>
    </Box>
  );
}
