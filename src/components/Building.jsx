import React from 'react';
import PortlandOffice from './PortlandOffice';

const Building = () => {
    // this component renders an office and wraps Path to direct a user through the office
    return <a-entity>
        <PortlandOffice />
        </a-entity>
};

export default Building;