import { actionTypes } from "./store";

const onSelectRoom = (data) => ({
    type: actionTypes.SELECT_ROOM,
    data,
});

const onCameraMove = (position) => ({
  type: actionTypes.CAMERA_MOVE,
  position,
});

export {
  onCameraMove,
  onSelectRoom,
}