import React from 'react';
import homePageLogo from 'assets/fiver/SVG Vector Files/Transparent Logo.svg';

// ==============================|| HOMEPAGE LOGO ||============================== //
const RegisterFormLogo = () => {
    return (
        <div style={{ display: 'flex', width: '140px', height: '80px' }}>
            <img src={homePageLogo} alt="Timekeeper logo"></img>
        </div>
    );
};

export default RegisterFormLogo;
