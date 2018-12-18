import React from 'react';
import Room from './Room';
import * as roomDetails from '../roomDetails';

const User = ({ position }) => {
    return <a-entity
    position={position}
    >
        <a-sphere position="0 1.6 0" radius="0.3" color="#840e84"></a-sphere>
        <a-box position="0 0.5 0" height="1" width="0.5" depth="0.25" color="#840e84"></a-box>
    </a-entity>;
};

const getRoom = (targetRoomName) => {
    const room = roomDetails[targetRoomName];
    return <Room id={targetRoomName} x={room.x} y={room.y} height={room.height} width={room.width} />
};

/*
* This component manages a specific office and knows how to navigate from a location to a target room name
* this will need to translate a start location to virtual space within the building
*/
export default class PortlandOffice extends React.Component {
    static defaultProps = {
        origin: {
            latitude: 45.520380,
            longitude: -122.679334,
        },
        userLocation: {
            latitude: 45.520438,
            longitude: -122.679555,
        },
    };
    render() {
        const { userLocation, targetRoomName } = this.props;
        const { latitude, longitude } = userLocation;
        const { latitude: originLat, longitude: originLong } = this.props.origin;
        const longDist = Math.abs(longitude - originLong) * 111000;
        const latDist = Math.abs(latitude - originLat) * 111000;

        const targetLocation = roomDetails[targetRoomName] || {};
        const targetPos = {
            x: Math.abs(targetLocation.longitude - longitude) * 111000,
            z: Math.abs(targetLocation.latitude - latitude) * 111000,
        };

        const moveWorld = {x: longDist, y: 0, z: latDist };
        return (
            <a-entity>
                <User position="0 0 0" />

                <User position={`${targetPos.x} 0 ${targetPos.z}`}/>
                {this.props.children}
                <a-entity position={`${moveWorld.x} 0 ${moveWorld.z}`}>
                    {this.props.children}
                    <a-box position="0 0 0" width="0.2" height="0.2" depth="0.2" color="#000" />
                    <a-box position="0 0 -10" width="0.2" height="0.5" depth="0.5" color="#000" />
                    {targetRoomName && getRoom(targetRoomName)}
                    <a-entity id="portlandfloorplan" rotation="0 77.349 0" position="4.078 0 -2.043">
                        <a-plane src="#portlandfloor" position="-15 0 -15" height="30" width="30" rotation="-90 0 0"></a-plane>
                    </a-entity>
                </a-entity>
            </a-entity>
        );
    }
}
