import React from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { TextField as MUITextField } from "@mui/material";
import { css } from "@emotion/react";

type TextFieldProps = {
  control: Control<any, object>;
  label: string;
  name: string;
  disabled?: boolean;
};

export default function TextField({
  name,
  control,
  label,
  disabled,
}: TextFieldProps) {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <MUITextField
      {...field}
      label={label}
      variant="standard"
      margin="normal"
      css={css`
        width: 50%;
      `}
      disabled
      error={!!errors?.[name]?.message}
      helperText={errors?.[name]?.message}
    />
  );
}
