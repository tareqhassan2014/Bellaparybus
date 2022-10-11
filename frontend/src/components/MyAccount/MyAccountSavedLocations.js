import React, {useState} from 'react';
import MyAccountInfoWrapper from "./MyAccountInfoWrapper";
import Button from "@mui/material/Button";
import MyAccountLocationItem from "./MyAccountLocationItem";
import {useDispatch, useSelector} from "react-redux";
import MyAccountSavedLocationDialog from "./MyAccountSavedLocationDialog";
import {DELETE_SAVE_LOCATION} from "../../store/actionTypes";

const MyAccountSavedLocations = () => {
    const {savedLocations} = useSelector((state) => ({
        savedLocations: state.accountInfo.savedLocations
    }))

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [chosenLocation, setChosenLocation] = useState(null);
    const dispatch = useDispatch();

    const handleDialogClose = () => {
        setIsOpenDialog(false)
    }

    const handleOpenDialog = (location) => () => {
        setIsOpenDialog(true);
        setChosenLocation(location)
    }

    const handleDeleteLocation = (location) => () => {
        dispatch({
            type: DELETE_SAVE_LOCATION,
            payload: location
        })
    }

    return (
        <MyAccountInfoWrapper title='Saved Location' actionButton={<Button variant='contained' onClick={handleOpenDialog(null)}>Add Location</Button>}>
            <MyAccountSavedLocationDialog location={chosenLocation} isOpen={isOpenDialog} onClose={handleDialogClose}/>
            {savedLocations.map((location) => <MyAccountLocationItem onDelete={handleDeleteLocation(location)} onEdit={handleOpenDialog(location)} location={location} key={location.id}/>)}
        </MyAccountInfoWrapper>
    );
};

export default MyAccountSavedLocations;