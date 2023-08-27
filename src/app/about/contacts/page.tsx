'use client';
import { Box, Typography, TextField, TextareaAutosize, Button } from '@mui/material';
import { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({ email, firstName, subject, message });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          flexGrow: 1,
          padding: '10px',
          maxWidth: '700px',
          margin: '30px auto',
        }}
      >
        <Typography variant='h4' sx={{ textAlign: 'center' }}>
          Contact Us
        </Typography>
        <Box
          sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}
          component='form'
          noValidate
          autoComplete='off'
        >
          <TextField
            label='Full Name'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px !important' }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px !important' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label='Subject'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px !important' }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <TextareaAutosize
            aria-label='minimum height'
            minRows={6}
            placeholder='Enter a message'
            //@ts-ignore
            sx={{
              width: '100%',
              marginBottom: '20px',
              fontSize: '16px',
              padding: '10px',
            }}
            spellCheck
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            variant='contained'
            type='submit'
            color='primary'
            sx={{ width: '200px', fontSize: '16px', margin: '30px auto 0' }}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Contact;
