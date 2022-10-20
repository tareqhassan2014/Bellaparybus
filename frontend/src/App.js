import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { USER_ENTRY_FORM_TYPE } from './common/constant';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Redirect from './components/Redirect';
import ReurnAndRefunds from './components/ReurnAndRefunds/ReurnAndRefunds';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import ForgotPassword from './components/UserEntry/ForgotPassword';
import LoginForm from './components/UserEntry/LoginForm';
import SignUpForm from './components/UserEntry/SignUpForm';
import theme from './utils/theme';
import BlankPage from './views/BlankPage/BlankPage';
import Booking from './views/Booking/Booking';
import ContactUs from './views/ContactUs';
import Home from './views/Home';
import MyAccount from './views/MyAccount/MyAccount';
import PastRide from './views/PastRide/PastRide';
import PaymentMethods from './views/PaymentMethods/PaymentMethods';
import QuoteRequests from './views/QuoteRequests/QuoteRequests';
import BookingVehicles from './views/Reservation';
import UpcomingRide from './views/UpcomingRide/UpcomingRide';

function App() {
    const navigate = useNavigate();

    const handleFormTypeChange = (formType) => {
        let route = '';
        switch (formType) {
            case USER_ENTRY_FORM_TYPE.Login:
                route = '/login';
                break;
            case USER_ENTRY_FORM_TYPE.SignUp:
                route = '/signup';
                break;
            case USER_ENTRY_FORM_TYPE.ForgotPassword:
                route = '/forgot';
                break;
            default:
        }
        navigate(route);
    };

    return (
        <>
            <MessengerCustomerChat
                pageId={process.env.REACT_APP_FACEBOOK_PAGE_ID}
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            />
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div
                        style={{
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<ContactUs />} />
                            <Route
                                path="/login"
                                element={
                                    <Box marginTop="60px">
                                        <LoginForm
                                            onChangeFormType={
                                                handleFormTypeChange
                                            }
                                        />{' '}
                                    </Box>
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    <Box marginTop="60px">
                                        <SignUpForm
                                            onChangeFormType={
                                                handleFormTypeChange
                                            }
                                        />
                                    </Box>
                                }
                            />
                            <Route
                                path="/forgot"
                                element={
                                    <Box marginTop="60px">
                                        <ForgotPassword onSubmit={() => {}} />{' '}
                                    </Box>
                                }
                            />

                            <Route path="/booking" element={<Booking />}>
                                <Route
                                    index
                                    element={
                                        <Redirect to="/booking/reservation" />
                                    }
                                />
                                <Route
                                    path="reservation"
                                    element={<BookingVehicles />}
                                />
                                <Route
                                    path="upcoming-ride"
                                    element={<UpcomingRide />}
                                />
                                <Route
                                    path="past-ride"
                                    element={<PastRide />}
                                />
                                <Route
                                    path="quote-requests"
                                    element={<QuoteRequests />}
                                />
                                <Route
                                    path="payment-methods"
                                    element={<PaymentMethods />}
                                />
                                <Route
                                    path="my-account"
                                    element={<MyAccount />}
                                />

                                <Route path="blank" element={<BlankPage />} />
                            </Route>
                            <Route
                                path="/conditions"
                                element={<TermsAndConditions />}
                            />
                            <Route
                                path="/ReurnAndRefunds"
                                element={<ReurnAndRefunds />}
                            />
                            <Route
                                path="/PrivacyPolicy"
                                element={<PrivacyPolicy />}
                            />
                        </Routes>
                        <Footer />
                    </div>
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
