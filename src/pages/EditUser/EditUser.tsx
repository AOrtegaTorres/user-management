import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
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
import { User } from '../../types/user';
import { emailValidator } from '../../utils';
import { selectUsers, updateUser } from '../../store/users';

type Error = {
  emailId?: string;
};
const required = (value: User) => (value ? undefined : 'Required');

export const EditUser = () => {
  const { id } = useParams();
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user: { firstName: any; avatar?: string | undefined; lastName: any; emailId: any };
  const [image, setImage] = useState<any[]>([]);
  const onSubmit = (values: User) => {
    const newImage = image[0]?.data_url ?? user?.avatar;
    const updatedUser = { ...values, avatar: newImage };
    dispatch(updateUser(updatedUser));
    navigate('/');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    user = users.filter((u) => u.emailId === id)[0];
  }, []);

  const onChange = (img: any) => {
    setImage(img);
  };

  return (
    <Container>
      <Box sx={{ padding: '20px 0px' }}>
        <Typography variant="h6">Edit User</Typography>
      </Box>
      <Form
        onSubmit={onSubmit}
        validate={(values: any) => {
          const errors: Error = {};
          if (!values.emailId) errors.emailId = 'Required';
          else if (!emailValidator(values.emailId)) errors.emailId = 'Invalid Email';
          return errors;
        }}
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
                          <div>
                            <Grid item>
                              {user?.avatar && <img width="100" src={user?.avatar} />}
                            </Grid>
                            <Grid>
                              {image.length < 1 && (
                                <Button variant="contained" onClick={onImageUpload}>
                                  Update
                                </Button>
                              )}
                            </Grid>
                            {imageList.map((img: any, index: number) => (
                              <div key={index}>
                                <img src={img.data_url} alt="" width="100" />
                                <Grid item>
                                  <Button variant="contained" onClick={() => onImageUpdate(index)}>
                                    Update
                                  </Button>
                                  <Button
                                    sx={{ marginLeft: 2 }}
                                    variant="contained"
                                    color="error"
                                    onClick={() => onImageRemove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Grid>
                              </div>
                            ))}
                          </div>
                        )}
                      </ReactImageUploading>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field
                    fullWidth
                    name="firstName"
                    validate={required}
                    defaultValue={user?.firstName}
                  >
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
                  <Field
                    fullWidth
                    name="lastName"
                    validate={required}
                    defaultValue={user?.lastName}
                  >
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
                  <Field fullWidth name="emailId" defaultValue={user?.emailId}>
                    {({ input }) => <TextField fullWidth disabled label="Email" {...input} />}
                  </Field>
                </Grid>
                <Grid item style={{ paddingTop: '50px' }}>
                  <MuiButton type="submit" variant="contained" onClick={handleSubmit}>
                    Update
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
