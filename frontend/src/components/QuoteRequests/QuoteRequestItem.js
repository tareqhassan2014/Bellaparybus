import React, {useEffect, useState} from 'react';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {formatDateString} from "../../helpers/timeHelpers";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";


const QuoteRequestItem = ({quoteRequest, isExpandAll, isCollapseAll, onExpansionChange}) => {
    const [expanded, setExpanded] = useState(false)

    const handleExpansionChange = (event, isExpanded) => {
        setExpanded(isExpanded);
        onExpansionChange(isExpanded)
    }
    useEffect(() => {
        if (isExpandAll) {
            setExpanded(true)
        }
    }, [isExpandAll])

    useEffect(() => {
        if (isCollapseAll) {
            setExpanded(false)
        }
    }, [isCollapseAll])

    return (
        <Accordion expanded={expanded} onChange={handleExpansionChange} sx={{marginBottom:3}} >
            <AccordionSummary sx={{
                flexDirection: 'row-reverse'
            }}
            expandIcon={<ExpandMoreIcon />}
            >
                <Grid container alignItems='center'>
                    <Grid item xs={12} sm sx={{fontWeight: 'bold'}}>
                        {quoteRequest.id} (Quote Requested)
                    </Grid>

                    <Grid xs={12} sm item>
                        <div>{formatDateString(quoteRequest.rideInfo.pickupDate, 'LLLL do, yyyy')}, {formatDateString(quoteRequest.rideInfo.pickupTime, 'hh:mmaaa')}</div>
                        <div>{quoteRequest.rideInfo.pickupLocation}</div>
                    </Grid>
                    <Grid xs={12} sm item textAlign='right'>
                        <Button variant='contained'>
                            <ShoppingCartIcon />
                        </Button>
                    </Grid>
                </Grid>
            </AccordionSummary>

            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h5' sx={{fontWeight: 'bold'}} color='primary'>{quoteRequest.rideInfo.type}</Typography>
                        <p>
                            <b>Duration: </b> <span>{quoteRequest.rideInfo.duration}</span>
                        </p>
                        <p>
                            <b>Passengers: </b> <span>{quoteRequest.rideInfo.passengers}</span>
                        </p>
                        <p>
                            <b>Service Occasion: </b> <span>{quoteRequest.rideInfo.occasion}</span>
                        </p>
                        <p>
                            <b>Pickup Date: </b> <span>{formatDateString(quoteRequest.rideInfo.pickupDate, 'LLLL do, yyyy')}</span>
                        </p>
                        <p>
                            <b>Pickup Time: </b> <span>{formatDateString(quoteRequest.rideInfo.pickupTime, 'hh:mmaaa')}</span>
                        </p>
                        <p>
                            <b>Pickup Location: </b> <span>{quoteRequest.rideInfo.pickupLocation}</span>
                        </p>
                        <p>
                            <b>Drop-off Location: </b> <span>{quoteRequest.rideInfo.dropOffLocation}</span>
                        </p>
                        <Typography variant='h5' sx={{fontWeight: 'bold'}} color='primary'>Booking Details</Typography>
                        <p>
                            <b>Date Requested: </b> <span>{formatDateString(quoteRequest.bookingDetails.date,'dd/MM/yy hh:mmaaa')}</span>
                        </p>
                        <p>
                            <b>Booked by: </b> <span>{quoteRequest.bookingDetails.bookedBy.name} ({quoteRequest.bookingDetails.bookedBy.email})</span>
                        </p>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h5' sx={{fontWeight: 'bold'}} color='primary'>Passenger Info</Typography>
                        <p>
                            <b>Name: </b> <span>{quoteRequest.passengerInfo.name}</span>
                        </p>
                        <p>
                            <b>Email: </b> <span>{quoteRequest.passengerInfo.email}</span>
                        </p>
                        <p>
                            <b>Phone number: </b> <span>{quoteRequest.passengerInfo.phone}</span>
                        </p>
                    </Grid>

                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default QuoteRequestItem;