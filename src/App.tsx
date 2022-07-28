import { Box, Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <Container maxWidth="xl">
      <Box>
        <Header title="User Management" />
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create-user" element={<CreateUser />} />
      </Routes>
    </Container>
  );
}

export default App;
