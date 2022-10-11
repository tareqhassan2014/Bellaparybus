import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Vehicles() {
  const baseURL = `${process.env.REACT_APP_BASEURL}/vehicles`;
  const [allVehicles, getAllVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      const data = response.data.vehicles;
      getAllVehicles(data);
      setLoading(false);
    });
  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 100, sortable: false },
    { field: 'vehicle', headerName: 'Vehicle', width: 500 },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={loading}
          rows={allVehicles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
}

export default Vehicles;