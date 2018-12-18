import React from 'react';

import Room from './Room';

export default class PortlandOffice extends React.Component {
    render() {
        // TODO: setup origin
        // for now, origin is cuckoo's nest
        return (
            <a-entity>
                <Room id="StandByMe" x={-24} y={0} />
                <Room id="CuckoosNest" x={0} y={0} />
                <Room id="Goonies"  x={-24} y={3.15} />
                <Room id="ShortCircuit" x={-24} y={6.3} />
                <Room id="AnimalHouse" x={-24} y={26} width={10} height={4}/>
                <Room id="Widmer" x={-12} y={19.6} height={4} />
                <Room id="Ninkasi" x={-12} y={16} />
                <Room id="FullSail" x={-12} y={12.75} />
                <Room id="Bridgeport" x={-12} y={9.6} />
                <a-plane scale="0.25 0.25 0.25" src="#portlandfloor" position="-8.4 0 10.25" height="100" width="100" rotation="-90 93 0"></a-plane>
            </a-entity>
        );
    }
}