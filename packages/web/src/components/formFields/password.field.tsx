import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  InputAdornment,
  IconButton,
  TextField as MUITextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { css } from "@emotion/react";

type PasswordFieldProps = {
  control: Control<FieldValues, object>;
  label: string;
  name: string;
};

export default function PasswordField({
  name,
  control,
  label,
}: PasswordFieldProps) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const handleClickShowPassword = () =>
    setPasswordVisibility(!passwordVisibility);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <MUITextField
          {...field}
          label={label}
          variant="standard"
          margin="normal"
          type={passwordVisibility ? "text" : "password"}
          autoComplete="current-password"
          css={css`
            width: 50%;
          `}
          error={!!errors?.[name]?.message}
          helperText={errors?.[name]?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
