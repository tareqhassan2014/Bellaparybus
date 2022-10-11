import React from 'react';

const TabPanel = (props) => {
    const { children, value, index, prefix, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${prefix}-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}


export default TabPanel;
