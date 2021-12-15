import React from 'react';
import { Copyright } from '../../components/Copyright';
import NavBar from '../../components/NavBar';
import { QRCodeContainer } from '../../components/QRCodeContainer';

export const Home = () => {
    return (
        <>
            <NavBar />
            <QRCodeContainer />

            <Copyright sx={{ mt: 8, mb: 4 }} />
        </>
    );
}
