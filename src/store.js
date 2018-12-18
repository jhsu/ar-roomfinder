import produce from "immer";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSagas from "./sagas";

export const actionTypes = {
  ORIENTATION: "ORIENTATION",
  GEOLOCATION: "GEOLOCATION",
  CAMERA_MOVE: "CAMERA_MOVE",
  PLACE_USER: "PLACE_USER",
  USER_MOVED: "USER_MOVED",
  START_HEADING: "START_HEADING",
  START_LOCATION: "START_LOCATION",
  SELECT_ROOM: "SELECT_ROOM",
};

const initialState = {
  initialHeading: null,
  initialLocation: null,
  orientation: null,
  coords: {},
  userPosition: null,
  targetRoomName: undefined,
};

function reducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "ERROR":
        draft.error = action.error;
        break;
      case actionTypes.ORIENTATION:
        // draft.initialHeading = action.orientation.webkitCompassHeading;
        draft.orientation = action.orientation;
        break;
      case actionTypes.GEOLOCATION:
        draft.coords = action.coords;
        break;
      case actionTypes.PLACE_USER:
        draft.distanceTraveled = action.distance;
        draft.userPosition = action.position;
        break;
      case actionTypes.START_HEADING:
        draft.initialHeading = action.heading;
        break;
      case actionTypes.START_LOCATION:
        draft.initialLocation = action.location;
        break;
      case actionTypes.SELECT_ROOM:
        draft.targetRoomName = action.data;
        break;
      default:
        break;
    }
  });
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSagas);

export default store;
