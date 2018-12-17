import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

const DISTANCE_BETWEEN_DOTS = "1";

class Path extends React.Component {
  static propTypes = {
    startPos: propTypes.string,
    endPos: propTypes.string
  };

  static defaultProps = {
    startPos: "0 0 0",
    endPos: "0 0 -20
  };

  renderPathDots(startPos, endPos) {
    const zStartPos = _.toNumber(_.split(startPos, " ")[2]);
    const zEndPos = _.toNumber(_.split(endPos, " ")[2]);
    const numPathDots = _.divide(
      _.add(zStartPos, zEndPos),
      DISTANCE_BETWEEN_DOTS
    );

    let pathDots = [];
    const isNegative = numPathDots < 0;

    for (let i = 0; i < Math.abs(numPathDots); i++) {
      const newZ = i * DISTANCE_BETWEEN_DOTS;
      pathDots.push(
        <a-sphere
          position={`0 0 ${isNegative ? "-" : ""}${newZ}`}
          key={`path-dot-${newZ}`}
          radius="0.05"
          color="#EF2D5E"
        />
      );
    }

    return <a-entity>{_.map(pathDots, pathDot => pathDot)}</a-entity>;
  }

  render() {
    return (
      <a-entity>
        <a-sphere position={this.props.startPos} radius="0.5" color="#EF2D5E" />
        <a-sphere position={this.props.endPos} radius="0.5" color="#EF2D5E" />
        {this.renderPathDots(this.props.startPos, this.props.endPos)}
      </a-entity>
    );
  }
}

export default Path;
