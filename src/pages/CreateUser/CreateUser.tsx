import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import ReactImageUploading from 'react-images-uploading';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button as MuiButton,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/users';
import { User } from '../../types/user';

const required = (value: User) => (value ? undefined : 'Required');

export const CreateUser = () => {
  const [image, setImage] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (values: User) => {
    console.log(image);
    const user = { ...values, avatar: image[0].data_url };
    dispatch(addUser(user));
    navigate('/');
  };

  const onChange = (img: any) => {
    setImage(img);
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
                    {() => (
                      <ReactImageUploading
                        multiple
                        value={image}
                        onChange={onChange}
                        maxNumber={1}
                        dataURLKey="data_url"
                      >
                        {({ imageList, onImageUpdate, onImageRemove, onImageUpload }) => (
                          // write your building UI
                          <div>
                            <Button variant="contained" onClick={onImageUpload}>
                              Upload
                            </Button>
                            {imageList.map((img: any, index: number) => (
                              <div key={index}>
                                <img src={img.data_url} alt="" width="100" />
                                <div>
                                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                  <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ReactImageUploading>
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
