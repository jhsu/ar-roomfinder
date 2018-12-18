import React from 'react';
import Room from './Room';
import * as roomDetails from '../roomDetails';

export const User = ({ position }) => {
    return <a-entity
    position={position}
    id='User'
    >
        <a-sphere position="0 1.2 0" radius="0.12" color="#840e84" ></a-sphere>
        <a-box position="0 0.5 0" height="1" width="0.3" depth="0.15" color="#840e84" scale=".5"></a-box>
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
            latitude: 45.520380,
            longitude: -122.679334,
        },
    };
    render() {
        const { userLocation, targetRoomName } = this.props;
        const { latitude, longitude } = userLocation;
        const { latitude: originLat, longitude: originLong } = this.props.origin;
        const longDist = Math.abs(longitude - originLong) * 111000;
        const latDist = Math.abs(latitude - originLat) * 111000;

        const targetPos = roomDetails[targetRoomName] || {};

      // const moveWorld = {x: longDist, y: 0, z: latDist };

      // const rotateFloor = 77.349;
        return (
            <a-entity id="PortlandOffice">>
                <a-entity rotation="0 0 0">
                </a-entity>
                {this.props.children}
                {targetRoomName && getRoom(targetRoomName)}
                <a-entity id="portlandfloorplan" rotation="0 90 0" position="0 0 0" scale="0.93 0.93 0.93">
                  <a-plane src="#portlandfloor" position="-15 0 -15" height="30" width="30" rotation="-90 0 0"></a-plane>
                </a-entity>
            </a-entity>
        );
    }
}
