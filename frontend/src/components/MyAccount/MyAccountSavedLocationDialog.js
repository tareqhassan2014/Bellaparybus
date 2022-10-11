import React, {useEffect, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {ADD_SAVE_LOCATION, EDIT_SAVE_LOCATION} from "../../store/actionTypes";
import {getErrorValidateMessage, validateRequired} from "../../helpers/validateHelper";

const locationValidator = [validateRequired()];

const MyAccountSavedLocationDialog = ({isOpen, location, onClose}) => {
    const [value, setValue] = useState(location?.value || '');
    const [error, setError] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        setValue(location?.value || '');
        setError('')
    }, [location, isOpen]);

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const validateForm = () => {
        const newError = getErrorValidateMessage(value, locationValidator);
        setError(newError)

        return !newError;
    }


    const handleSubmit = () => {
        if (!validateForm()) {
            return
        }

        if (!location) {
            dispatch({
                type: ADD_SAVE_LOCATION,
                payload: {
                    value,
                    id: Date.now()
                }
            })
        } else {
            dispatch({
                type: EDIT_SAVE_LOCATION,
                payload: {
                    value,
                    id: location.id
                }
            })
        }

        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                {!location ? 'Add Location' : 'Edit Location'}
            </DialogTitle>
            <DialogContent>
                <Box marginTop={2}>
                    <TextField
                        onChange={handleChange}
                        name='location'
                        value={value}
                        fullWidth
                        label='Location'
                        error={!!error}
                        helperText={error}
                        InputProps={{endAdornment: <Button onClick={handleSubmit}>{!location ? 'Add' : 'Edit'}</Button>}}/>
                </Box>

            </DialogContent>
        </Dialog>
    );
};

export default MyAccountSavedLocationDialog;