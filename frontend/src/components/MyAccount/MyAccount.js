import React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const MyAccountInfoWrapper = ({
    title, actionButton, children
}) => {
    return (
        <Card>
            <CardHeader title={title} action={actionButton} />
            <CardContent>
                {children}
            </CardContent>

        </Card>
    );
};

export default MyAccountInfoWrapper;