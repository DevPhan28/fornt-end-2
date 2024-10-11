import React, { useEffect, useState } from "react";
import Sidebar from "./leftBar";
import axios from "axios";
import { Infro } from "../interface";
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import ConfirmDeleteDialog from "../component/confirmDeleteDialog";


const Dashboard = () => {
  const [products, setProducts] = useState<Infro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteProductId, setDeleteProductId] = useState<string>("");

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteProductId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${deleteProductId}`);
      setDeleteDialogOpen(false);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 140 },
    { field: 'name', headerName: 'Name', width: 300 },
    { 
      field: 'image', 
      headerName: 'Image', 
      width: 130,
      renderCell: (params) => (
        <img src={params.value} alt="product" style={{ width: '100%', height: 'auto' }} />
      )
    },
    { field: 'price', headerName: 'Price', type: 'number', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 8 }}
            component={Link}
            to={`/admin/edit/${params.row._id}`}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  
  const rows = products.map((product) => ({
    ...product,
    id: product._id,
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/admin/add"
          sx={{ marginBottom: 2 }}
        >
          Add Product
        </Button>
        <div style={{ height: 670, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            getRowHeight={() => 110}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
