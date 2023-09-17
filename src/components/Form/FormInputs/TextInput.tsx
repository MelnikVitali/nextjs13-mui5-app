import { TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { styles } from './style';

type FormInputProps = {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
} & TextFieldProps;

const TextInput: FC<FormInputProps> = ({ name, control, errors, ...otherProps }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          variant='outlined'
          required
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
          fullWidth
          margin='dense'
          sx={styles.formInput}
        />
      )}
    />
  );
};

export default TextInput;
