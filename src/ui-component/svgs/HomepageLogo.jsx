import React from 'react';
import homePageLogo from 'assets/fiver/SVG Vector Files/Transparent Logo.svg';

// ==============================|| HOMEPAGE LOGO ||============================== //
const HomepageLogo = () => {
    return (
        <div
            style={{ display: 'flex', width: '100px', height: '70px' }}
            onClick={() => {
                window.location.href = '/';
            }}
            onKeyDown={(e) => {
                // Changed from onKeyPress to onKeyDown
                if (e.key === 'Enter' || e.key === ' ') {
                    window.location.href = '/';
                }
            }}
            role="button" // Add this line to indicate the element is interactive
            tabIndex={0} // Add this line to make the element focusable
        >
            <img src={homePageLogo} alt="Timekeeper logo"></img>
        </div>
    );
};

export default HomepageLogo;
