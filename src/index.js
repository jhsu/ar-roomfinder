import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { onCameraMove, onSelectRoom } from "./actions";
import Building from "./components/Building";
import Compass from "./components/Compass";
import Orientation from "./components/Orientation";
import { User } from "./components/PortlandOffice";
import SelectRoomModel from "./components/SelectRoomModel";
import store from "./store";
import "./style.css";
import 'lucid-ui/dist/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.cameraRef = React.createRef();
  }

  componentDidMount() {
    this.cameraRef.current.addEventListener("componentchanged", evt => {
      if (evt.detail.name !== "position") {
        return;
      }
      this.props.onCameraMove(evt.detail.target.getAttribute("position"));
    });
  }

  render() {
    const {
      initialHeading,
      initialLocation,
      targetRoomName,
      onSelectRoom
    } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <SelectRoomModel isOpen={!targetRoomName} onSelect={onSelectRoom} />
        <a-scene ar arjs="trackingMethod: best;">
          <a-assets>
            <img id="portlandfloor" src="./portland.png" />
          </a-assets>
          <a-entity position="0 -2 0">
            <Orientation userOrientation={-135}>
              {initialLocation && (
                <Building targetRoomName={targetRoomName} heading={initialHeading} userLocation={initialLocation}>
                  <Compass />
                </Building>
              )}
            </Orientation>
          </a-entity>
          <a-entity ref={this.cameraRef} camera="active: true" look-controls wasd-controls data-aframe-default-camera>
            <User position="0.030 -1.51 -1.04" />
          </a-entity>
          <a-sky color="#6EBAA7" />
        </a-scene>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

const mapDispatchToProps = {
  onCameraMove,
  onSelectRoom,
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("app")
);
