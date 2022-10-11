import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Occasions() {
  const baseURL = `${process.env.REACT_APP_BASEURL}/occasions`;
  const [allOccasions, getAllOccasions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      const data = response.data.occasions;

      getAllOccasions(data);
      setLoading(false);
    });
  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 100, sortable: false },
    { field: 'occasion', headerName: 'Occasion', width: 500 },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={loading}
          rows={allOccasions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
}

export default Occasions;