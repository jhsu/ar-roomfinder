import React from 'react';
import PortlandOffice from './PortlandOffice';

const Building = ({ children, heading, userLocation, targetRoomName }) => {
    // this component renders an office and wraps Path to direct a user through the office


    // - floors
    // - pass target room
    // - pass current position
    // - get directions
    return <a-entity>
            <PortlandOffice heading={heading} startLocation={userLocation} targetRoomName={targetRoomName}>
            {children}
            </PortlandOffice>
        </a-entity>
};

export default Building;