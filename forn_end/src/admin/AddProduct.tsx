import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Button, Box, Typography, Alert, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Infro } from '../interface';
import Sidebar from './leftBar';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: Infro) => {
    try {
      await axios.post('http://localhost:4000/api/products', values);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/admin/dashboard');
      }, 2000); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  

  const validate = (values: Infro) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name không được bỏ trống';
    }
    if (!values.image) {
      errors.image = 'Image không được bỏ trống';
    }
    if (!values.price) {
      errors.price = 'Price không được bỏ trống';
    } else if (isNaN(Number(values.price))) {
      errors.price = 'Phải là số';
    }
    else if (values.price <= 0) {
      errors.price = 'Giá không được âm';
    }
    return errors;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {showAlert && (
          <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >Thêm thành công 
         </Alert>
        )}
        <Typography variant="h5" align="center" gutterBottom>
          Add New Product
        </Typography>
        <Form
          onSubmit={handleSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <Field name="name">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Name"
                      fullWidth
                      error={meta.error && meta.touched}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field name="image">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Image URL"
                      fullWidth
                      error={meta.error && meta.touched}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field name="price">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Price"
                      fullWidth
                      error={meta.error && meta.touched}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field name="desc">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      error={meta.error && meta.touched}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting || pristine}
                >
                  Add Product
                </Button>
              </Box>
            </form>
          )}
        />
      </Box>
    </Box>
  );
};

export default AddProduct;
