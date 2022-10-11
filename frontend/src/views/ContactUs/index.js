import {
    Box,
    Button,
    Grid,
    Paper,
    TextareaAutosize,
    TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import {
    validateEmail,
    validatePhone,
    validateRequired,
    validateValue,
} from '../../helpers/validateHelper';
import { sendContactInfo } from '../../services/authServices';

const requiredValidators = [validateRequired()];
const emailValidators = [validateEmail()];
const phoneValidators = [validatePhone()];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const [formClicked, setFormClicked] = useState(false);
    const mapConfig = {
        center: {
            lat: 40.768815,
            lng: -74.146107,
        },
        zoom: 11,
    };

    const contactInfo = [
        'BellaPartyBus, LLC',
        '10 Kearny Ave, Kearny, NJ 07032',
        'Phone: 973-979-0159',
    ];

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const confirmForm = async () => {
        setFormClicked(true);
        if (
            !validateEmail(email) &&
            !validatePhone(phone) &&
            !validateRequired(name)
        ) {
            return;
        }
        //Data here

        await sendContactInfo({ name, email, message, phone });
        window.alert('Your message has been sent!');
    };

    const getMapOptions = (maps: Maps) => {
        return {
            streetViewControl: false,
            scaleControl: true,
            fullscreenControl: false,
            styles: [
                {
                    featureType: 'poi.business',
                    elementType: 'labels',
                    stylers: [
                        {
                            visibility: 'off',
                        },
                    ],
                },
            ],
            gestureHandling: 'greedy',
            disableDoubleClickZoom: true,
            minZoom: 11,
            maxZoom: 18,

            mapTypeControl: true,
            mapTypeId: maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: maps.ControlPosition.TOP_LEFT,
                mapTypeIds: [
                    maps.MapTypeId.ROADMAP,
                    maps.MapTypeId.SATELLITE,
                    maps.MapTypeId.HYBRID,
                ],
            },

            zoomControl: true,
            clickableIcons: false,
        };
    };

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: mapConfig.center,
            map,
            title: 'BellaPartyBus, LLC',
        });

        return marker;
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            style={{ marginTop: 50 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <img
                            width="100%"
                            src={'https://picsum.photos/600/100'}
                            alt="Banner"
                        />
                    </Item>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Item>
                        <div
                            style={{
                                fontSize: 40,
                                textAlign: 'left',
                                fontWeight: 'bold',
                            }}
                        >
                            Contact US
                        </div>
                        <TextField
                            style={{ width: '100%', margin: '10px 0 0 0' }}
                            label="Your Name"
                            value={name}
                            data-testid={formClicked}
                            error={
                                formClicked &&
                                !validateValue(name, requiredValidators)
                            }
                            required
                            variant="outlined"
                            onChange={handleNameChange}
                        />
                        <TextField
                            style={{ width: '100%', margin: '10px 0 0 0' }}
                            label="Your Email"
                            value={email}
                            error={!validateValue(email, emailValidators)}
                            required
                            variant="outlined"
                            onChange={handleEmailChange}
                        />
                        <TextField
                            style={{ width: '100%', margin: '10px 0 0 0' }}
                            label="Phone Number"
                            value={phone}
                            error={!validateValue(phone, phoneValidators)}
                            required
                            variant="outlined"
                            onChange={handlePhoneChange}
                        />
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                width: '100%',
                                margin: '10px 0 0 0',
                                resize: 'vertical',
                                padding: 12,
                            }}
                        />
                        <Button
                            variant="contained"
                            style={{ marginTop: 20 }}
                            onClick={confirmForm}
                        >
                            Submit
                        </Button>
                    </Item>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Item xs={12} style={{ textAlign: 'left', fontSize: 16 }}>
                        {contactInfo.map((contactInfo) => (
                            <div key={contactInfo}>{contactInfo}</div>
                        ))}
                    </Item>
                    <Item xs={12}>
                        <div style={{ height: '300px', width: '100%' }}>
                            <GoogleMapReact
                                options={getMapOptions}
                                bootstrapURLKeys={{
                                    key: 'AIzaSyCVRTzzQ6QFpeM9D4svdq9U7KSAX0JUHSw',
                                }}
                                defaultCenter={mapConfig.center}
                                defaultZoom={mapConfig.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) =>
                                    renderMarkers(map, maps)
                                }
                            ></GoogleMapReact>
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactUs;
