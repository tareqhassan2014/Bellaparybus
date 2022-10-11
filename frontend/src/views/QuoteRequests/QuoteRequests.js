import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import QuoteRequestItem from "../../components/QuoteRequests/QuoteRequestItem";
import Button from "@mui/material/Button";

const rideInfo = {
    type: 'Hourly Ride',
    pickupDate: new Date(),
    pickupTime: new Date(),
    passengers: 1,
    duration: '1 hour',
    pickupLocation: 'USA',
    dropOffLocation: 'USA',
    occasion: 'Road Show',
}

const passengerInfo = {
    name: 'Nate',
    email: 'nate@gmail.com',
    phone: '55555555555'
}

const bookingDetails = {
    date: new Date(),
    bookedBy: {
        name: 'Nate',
        email: 'nate@gmail.com'
    }
}

const quoteRequests = [{
    id: '750LH',
    rideInfo,
    passengerInfo,
    bookingDetails
}, {
    id: '751LH',
    rideInfo,
    passengerInfo,
    bookingDetails
}]

const QuoteRequests = () => {
    const [expandAll, setExpandAll] = useState(false)
    const [collapseAll, setCollapseAll] = useState(false)

    const handleExpansionChange = () => {
        setExpandAll(false);
        setCollapseAll(false);
    }

    useEffect(() => {
        if (expandAll) {
            setCollapseAll(false)
        }
    },[expandAll]);

    useEffect(() => {
        if (collapseAll) {
            setExpandAll(false)
        }
    },[collapseAll])

    return (
        <Box>
            <Box>
                <Button onClick={()=> {setExpandAll(true)}}>Expand All</Button>
                <Button onClick={()=> {setCollapseAll(true)}}>Collapse All</Button>
            </Box>
            {quoteRequests.map(quoteRequest => <QuoteRequestItem isExpandAll={expandAll} isCollapseAll={collapseAll} onExpansionChange={handleExpansionChange} quoteRequest={quoteRequest} key={quoteRequest.id} />)}
        </Box>
    );
};

export default QuoteRequests;