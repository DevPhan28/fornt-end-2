import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { Infro } from '../interface';
import Sidebar from './leftBar';

const EditProduct = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<Infro | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/products/${id}`);
        setInitialValues(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (values: Infro) => {
    try {
      await axios.put(`http://localhost:4000/api/products/${id}`, values);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/admin/dashboard');
      }, 2000); // Hiển thị thông báo trong 2 giây trước khi chuyển hướng
    } catch (error) {
      console.error('Error updating product:', error);
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
      errors.price = 'Giá không được âm';
    }
    return errors;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {showAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Cập nhật thành công
          </Alert>
        )}
        <Typography variant="h5" align="center" gutterBottom>
          Edit Product
        </Typography>
        {initialValues && (
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            initialValues={initialValues}
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
                    Save Changes
                  </Button>
                </Box>
              </form>
            )}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditProduct;
