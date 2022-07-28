import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { selectUsers } from '../../store';
import { deleteUser } from '../../store/users';
import { User } from '../../types/user';

export const Home = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editUserNavigate = (values: any) => {
    navigate(`edit-user/${values.emailId}}`);
  };

  const columns: readonly Column<object>[] = useMemo(
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
      },
      {
        Header: 'Actions',
        Cell: (props) => {
          const rowId = props.data[0] as User;
          return (
            <>
              <EditIcon color="primary" onClick={() => editUserNavigate(rowId)} />
              <DeleteIcon color="error" onClick={() => dispatch(deleteUser(rowId))} />
            </>
          );
        }
      }
    ],
    []
  );

  const handlerClick = () => {
    navigate('create-user');
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
