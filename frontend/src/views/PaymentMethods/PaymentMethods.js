import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import PaymentMethodDialog from "../../components/PaymenMethod/PaymentMethodDialog";

const PaymentMethods = () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const handleAddClick = () => {
        setIsOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setIsOpenDialog(false)
    }

    return (
        <Box>
            <Box sx={{textAlign: 'right', marginBottom: 3}}>
                <Button variant='contained' onClick={handleAddClick}>Add new Card</Button>
                <PaymentMethodDialog isOpen={isOpenDialog} onClose={handleCloseDialog}/>
            </Box>

            <Alert severity="info">No cards are on file. Put a card on file to save time on future reservations.</Alert>

        </Box>
    );
};

export default PaymentMethods;