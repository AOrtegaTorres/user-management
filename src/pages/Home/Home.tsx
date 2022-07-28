import React, { useMemo } from 'react';
import { Box, Container } from '@mui/material';
import Table from '../../components/Table';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store';

export const Home = () => {
  const users = useSelector(selectUsers);
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

  return (
    <Container maxWidth="lg">
      <Box>
        <Table data={users} columns={columns} />
      </Box>
    </Container>
  );
};
