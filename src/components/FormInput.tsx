import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// 👇 Styled Material UI TextField Component
const CssTextField = styled(TextField)({});

// 👇 Type of Props the FormInput will receive
type FormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
  // 👇 Utilizing useFormContext to have access to the form Context
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <CssTextField
          {...field}
          {...otherProps}
          variant='outlined'
          sx={{ mb: '1.5rem' }}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
        />
      )}
    />
  );
};

export default FormInput;
