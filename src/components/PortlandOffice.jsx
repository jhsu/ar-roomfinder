import React from 'react';

const User = ({ position }) => {
    return <a-entity
    position={position}
    >
        <a-sphere position="0 1.6 0" radius="0.3" color="#840e84"></a-sphere>
        <a-box position="0 0.5 0" height="1" width="0.5" depth="0.25" color="#840e84"></a-box>
    </a-entity>;
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


        const ROOMS = {
            AnimalHouse: {
                x: -24,
                y: 24,
            },
            StandByMe: {
                x: -24,
                y: 1,
            },
            CuckoosNest: {
                x: -2,
                y: 1,
            },
            Widmer: {
                x: -15,
                y: 20,
            }
        };
        const targetPos = ROOMS[targetRoomName];

        // const moveWorld = {x: longDist, y: 0, z: latDist };

        // const rotateFloor = 77.349;
        return (
            <a-entity id="PortlandOffice">
                <User position="0 0 0" />
                <User position={`${longDist} 0 ${latDist}`} />

                <a-entity rotation="0 0 0">
                </a-entity>

                <User position={`${targetPos.x} 0 ${targetPos.y}`}/>
                {this.props.children}
                <a-entity id="portlandfloorplan" rotation="0 90 0" position="0 0 0" scale="0.93 0.93 0.93">
                    <a-plane src="#portlandfloor" position="-15 0 -15" height="30" width="30" rotation="-90 0 0"></a-plane>
                </a-entity>
            </a-entity>
        );
    }
}
