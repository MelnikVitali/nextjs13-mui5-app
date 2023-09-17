import React, { FC, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styles } from './style';

interface IShowPassword {
  password?: boolean;
  confirmPassword?: boolean;
}

type FormInputProps = {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
} & TextFieldProps;

const PasswordInput: FC<FormInputProps> = ({ name, control, errors, ...otherProps }) => {
  const [showPassword, setShowPassword] = useState<IShowPassword>({
    password: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (name: keyof IShowPassword) => {
    if (name) {
      setShowPassword((prev) => {
        return {
          ...prev,
          [name]: !prev[name],
        };
      });
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          type={showPassword[name as keyof IShowPassword] ? 'text' : 'password'}
          variant='outlined'
          required
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
          fullWidth
          margin='dense'
          sx={styles.formInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => handleClickShowPassword(name as keyof IShowPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default PasswordInput;
