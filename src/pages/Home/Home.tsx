import React, { useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { selectUsers } from '../../store';

export const Home = () => {
  const users = useSelector(selectUsers);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar'
      },
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'emailId'
      }
    ],
    []
  );

  const handlerClick = () => {
    navigate('create-user', { replace: true });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '20px 0px' }}>
        <Button text="Create User" onClick={handlerClick} />
      </Box>
      <Box>
        <Table data={users} columns={columns} />
      </Box>
    </Container>
  );
};
