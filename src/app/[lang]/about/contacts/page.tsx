'use client';
import { Box, Typography, TextField, TextareaAutosize, Button } from '@mui/material';
import { useState } from 'react';
import { styles } from './styles';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // console.log({ email, firstName, subject, message });
  };

  return (
    <Box sx={styles.container}>
      <Typography variant='h4' sx={{ textAlign: 'center' }}>
        Contact Us
      </Typography>
      <Box sx={styles.containerForm} component='form' noValidate autoComplete='off'>
        <TextField
          label='Full Name'
          variant='outlined'
          fullWidth
          sx={styles.textField}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          sx={styles.textField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label='Subject'
          variant='outlined'
          fullWidth
          sx={styles.textField}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextField
          aria-label='minimum height'
          label='Enter a message'
          variant='outlined'
          placeholder='Enter a message'
          minRows={5}
          multiline
          fullWidth
          sx={styles.textField}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant='contained'
          type='submit'
          color='primary'
          sx={styles.btn}
          onClick={submitForm}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
