import React, { useState } from 'react';
import bannerImage from '../../assets/All Images/P3OLGJ1 copy 1.png';
import Popup from './Popup'; // Import the Popup component

const Header = () => {
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

    function handleGetStarted() {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn) {
            // Display the popup if the user is already logged in
            setShowPopup(true);
        } else {
            // Redirect to the login page or any other desired action
            window.location.href = '/'; 
        }
    }

    return (
        <div>
            <div className='md:flex items-center mb-12 px-6'>
                <div className="header-details md:w-3/5 tracking-wider ">
                    <h1 className='text-7xl w-auto md:w-5/6'>
                        One Step Closer  To Your <span className='custom-text text-7xl'>Dream Job</span>
                    </h1>
                    <p className='w-auto md:w-5/6 mt-6 leading-relaxed'>Explore thousands of job opportunities with all the information you need. Its your future. Come find it. Manage all your job application from start to finish.</p>
                    <button type='button' className='custom-btn mt-4' onMouseDown={handleGetStarted}>Get Started</button>
                </div>
                <div className="image-section md:w-1/2">
                    <img src={bannerImage} alt="" srcSet="" />
                </div>
            </div>
            {showPopup && ( // Render the popup only when showPopup is true
                <Popup 
                    message="You are already logged in. No need to get started again!" 
                    onClose={() => setShowPopup(false)} // Close the popup when the close button is clicked
                />
            )}
        </div>
    );
};

export default Header;
