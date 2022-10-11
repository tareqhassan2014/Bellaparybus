import React from 'react';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const MyAccountLocationItem = ({location, onEdit, onDelete}) => {
    return (
        <Grid container alignItems='center' spacing={2} marginBottom={2}>
            <Grid item xs sm >
                {location.value}
            </Grid>
            <Grid item xs={2} sm={1} textAlign='center'>
                <IconButton onClick={onEdit}>
                    <EditIcon />
                </IconButton>
            </Grid>
            <Grid item xs={2} sm={1} textAlign='center'>
                <IconButton onClick={onDelete}>
                    <CancelIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default MyAccountLocationItem;