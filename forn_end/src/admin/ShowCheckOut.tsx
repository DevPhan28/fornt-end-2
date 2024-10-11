import { useEffect, useState } from "react";
import Sidebar from "./leftBar";
import axios from "axios";
import { Infro } from "../interface";
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from "react-router-dom";


const ShowCheckOut = () => {
  const [products, setProducts] = useState<Infro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/orders");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 140 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', type: 'number', width: 200 },
    { field: 'phone', headerName: 'Phone', type: 'string', width: 200 },
    { field: 'payment', headerName: 'payment', type: 'string', width: 200 },
  ];
  
  const rows = products.map((product) => ({
    ...product,
    id: product._id,
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 2 }}>
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
      </Box>
    </Box>
  );
};

export default ShowCheckOut;
