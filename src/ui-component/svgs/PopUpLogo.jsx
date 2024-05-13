import React from 'react';
import homePageLogo from 'assets/fiver/SVG Vector Files/Transparent Logo.svg';

// RegisterPopUpLogo
const PopUpLogo = () => {
    return (
        <div style={{ display: 'flex', width: '100px', height: '70px' }}>
            <img src={homePageLogo} alt="Timekeeper logo"></img>
        </div>
    );
};
export default PopUpLogo;
