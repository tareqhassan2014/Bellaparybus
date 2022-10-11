import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
    isHasErrorByErrorObj,
    mapValueToErrorMessage,
    validateOnlyNumber,
    validateRequired
} from "../../helpers/validateHelper";

const paymentMethodValidators = {
    cardNumber: [validateRequired(), validateOnlyNumber()],
    expiredMonth: [validateRequired(), validateOnlyNumber()],
    expiredYear: [validateRequired(), validateOnlyNumber()],
    CVV: [validateRequired(), validateOnlyNumber()],
    nameOnCard: [validateRequired()],
    zipCode: [validateRequired(), validateOnlyNumber()]
}

const PaymentMethodDialog = ({isOpen, onClose}) => {
    const [values, setValues] = useState({
        cardNumber: '',
        expiredMonth: '',
        expiredYear: '',
        CVV: '',
        nameOnCard: '',
        zipCode: ''
    })

    const [errors, setErrors] = useState({
        cardNumber: '',
        expiredMonth: '',
        expiredYear: '',
        CVV: '',
        nameOnCard: '',
        zipCode: ''
    });

    const handleOnChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const validateForm = () => {
        const newErrors = mapValueToErrorMessage(values, paymentMethodValidators);
        setErrors(newErrors);

        return !isHasErrorByErrorObj(newErrors)
    }

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        console.log(values)
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                Add Payment Method
            </DialogTitle>
            <Grid paddingLeft={3} paddingRight={3} paddingBottom={3} paddingTop={1} container spacing={2}
                  alignItems='flex-end'>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label='Card Number'
                        name='cardNumber'
                        value={values.cardNumber}
                        error={!!errors.cardNumber}
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    Expiration Date
                    <Grid container marginTop={1}>
                        <Grid item xs={6}>
                            <TextField
                                label='Month'
                                name='expiredMonth'
                                fullWidth
                                value={values.expiredMonth}
                                error={!!errors.expiredMonth}
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Year'
                                name='expiredYear'
                                onChange={handleOnChange}
                                value={values.expiredYear}
                                error={!!errors.expiredYear}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth label='CVV Number'
                        onChange={handleOnChange}
                        value={values.CVV}
                        error={!!errors.CVV}
                        name='CVV'/>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <TextField
                        fullWidth label='Name On Card' name='nameOnCard'
                        value={values.nameOnCard}
                        error={!!errors.nameOnCard}
                        onChange={handleOnChange}

                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth label='Billing Zip Code' name='zipCode' value={values.zipCode}
                        error={!!errors.zipCode}
                        onChange={handleOnChange}/>
                </Grid>

            </Grid>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit}>Add Card</Button>

            </DialogActions>
        </Dialog>
    );
};

export default PaymentMethodDialog;