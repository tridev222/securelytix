// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const clients = [
  {
    id: 1,
    name: 'Tata Consultancy Services',
    contact: 'info@tcs.com',
    location: 'Mumbai, India',
    industry: 'Information Technology',
    employees: [
      { id: 1, name: 'Raj Malhotra', role: 'Software Engineer', contact: 'raj@tcs.com', department: 'Engineering' },
      { id: 2, name: 'Anjali Sharma', role: 'HR Manager', contact: 'anjali@tcs.com', department: 'Human Resources' },
      { id: 3, name: 'Vikram Singh', role: 'Business Analyst', contact: 'vikram@tcs.com', department: 'Business' }
    ]
  },
  {
    id: 2,
    name: 'HSBC Holdings',
    contact: 'support@hsbc.co.uk',
    location: 'London, UK',
    industry: 'Banking',
    employees: [
      { id: 4, name: 'Emma Watson', role: 'Risk Analyst', contact: 'emma@hsbc.co.uk', department: 'Risk' },
      { id: 5, name: 'George Taylor', role: 'Finance Manager', contact: 'george@hsbc.co.uk', department: 'Finance' },
      { id: 6, name: 'Liam Thompson', role: 'Operations Lead', contact: 'liam@hsbc.co.uk', department: 'Operations' },
      { id: 7, name: 'Olivia Brown', role: 'Compliance Officer', contact: 'olivia@hsbc.co.uk', department: 'Compliance' }
    ]
  },
  {
    id: 3,
    name: 'Apple Inc.',
    contact: 'hello@apple.com',
    location: 'Cupertino, USA',
    industry: 'Consumer Electronics',
    employees: [
      { id: 8, name: 'Michael Chen', role: 'Product Designer', contact: 'michael@apple.com', department: 'Design' },
      { id: 9, name: 'Sara Kim', role: 'iOS Developer', contact: 'sara@apple.com', department: 'Software' },
      { id: 10, name: 'Kevin Lee', role: 'QA Engineer', contact: 'kevin@apple.com', department: 'Testing' },
      { id: 11, name: 'Linda Garcia', role: 'Project Manager', contact: 'linda@apple.com', department: 'Management' },
      { id: 12, name: 'James Park', role: 'Data Scientist', contact: 'james@apple.com', department: 'AI/ML' }
    ]
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const client = clients.find(c => c.id === selectedClient);
  const employees = client ? client.employees : [];
  const employee = employees.find(e => e.id === selectedEmployee);

  const handleLogout = () => {
    toast.success('Successfully logged out');
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white' }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component="img" src={logo} alt="Securelytix Logo" sx={{ height: 40 }} />
          <Button onClick={handleLogout} variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight="bold" mb={4} fontFamily="'Segoe UI', sans-serif">
          Select Client and Employee
        </Typography>
        <Box display="grid" gridTemplateColumns={{ md: '1fr 1fr' }} gap={4}>
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: 'white' }}>Client</InputLabel>
              <Select
                value={selectedClient}
                onChange={(e) => {
                  setSelectedClient(e.target.value);
                  setSelectedEmployee('');
                }}
                label="Client"
                sx={{ color: 'white', backgroundColor: '#1e1e1e' }}
              >
                <MenuItem value=""><em>Select Client</em></MenuItem>
                {clients.map(client => (
                  <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {client && (
              <Paper sx={{ p: 3, bgcolor: 'white', color: 'black' }}>
                <Typography variant="h6">Client Info</Typography>
                <Box mt={1}>
                  <Typography><strong>Name:</strong> {client.name}</Typography>
                  <Typography><strong>Contact:</strong> {client.contact}</Typography>
                  <Typography><strong>Location:</strong> {client.location}</Typography>
                  <Typography><strong>Industry:</strong> {client.industry}</Typography>
                </Box>
              </Paper>
            )}
          </Box>

          <Box>
            <FormControl fullWidth sx={{ mb: 2 }} disabled={!client}>
              <InputLabel sx={{ color: 'white' }}>Employee</InputLabel>
              <Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                label="Employee"
                sx={{ color: 'white', backgroundColor: '#1e1e1e' }}
              >
                <MenuItem value=""><em>Select Employee</em></MenuItem>
                {employees.map(emp => (
                  <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {employee && (
              <Paper sx={{ p: 3, bgcolor: 'white', color: 'black' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Employee Info</Typography>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </Box>
                <Typography><strong>Name:</strong> {employee.name}</Typography>
                <Typography><strong>Role:</strong> {employee.role}</Typography>
                <Typography><strong>Department:</strong> {employee.department}</Typography>
                <Typography><strong>Contact:</strong> {employee.contact}</Typography>
                <Typography><strong>ID:</strong> EMP-{employee.id}</Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
