import React from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button as MuiButton
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/users';
import { User } from '../../types/user';

const required = (value: User) => (value ? undefined : 'Required');

export const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (values: User) => {
    dispatch(addUser(values));
    navigate('/');
  };

  return (
    <Container>
      <Box sx={{ padding: '20px 0px' }}>
        <Typography variant="h6">Create User Form</Typography>
      </Box>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={12}>
                <Grid item xs={12}>
                  <Field fullWidth name="avatar">
                    {(props) => (
                      <MuiButton variant="contained" component="label">
                        <input
                          type="file"
                          hidden
                          name={props.input.name}
                          onChange={props.input.onChange}
                          value={props.input.value}
                        />
                        Upload Avatar
                      </MuiButton>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="firstName" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        error={meta.error && meta.touched && meta.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                        label="First Name"
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="lastName" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Last Name"
                        error={meta.error && meta.touched && meta.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="emailId" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        {...input}
                        error={meta.error && meta.touched && meta.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item style={{ paddingTop: '50px' }}>
                  <MuiButton type="submit" variant="contained" onClick={handleSubmit}>
                    Save
                  </MuiButton>
                </Grid>
                <Grid item style={{ paddingTop: '50px' }}>
                  <MuiButton
                    type="button"
                    color="error"
                    onClick={() => {
                      form.reset();
                      navigate('/');
                    }}
                    variant="contained"
                  >
                    Cancel
                  </MuiButton>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </Container>
  );
};
