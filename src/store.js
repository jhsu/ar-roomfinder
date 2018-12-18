import produce from "immer";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSagas from "./sagas";

export const actions = {
  ORIENTATION: "ORIENTATION",
  GEOLOCATION: "GEOLOCATION",
  CAMERA_MOVE: "CAMERA_MOVE",
  PLACE_USER: "PLACE_USER",
  USER_MOVED: "USER_MOVED",
  START_HEADING: "START_HEADING",
  START_LOCATION: "START_LOCATION"
};

const initialState = {
  initialHeading: null,
  initialLocation: null,
  orientation: null,
  coords: {},
  userPosition: null
};

function reducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "ERROR":
        draft.error = action.error;
        break;
      case actions.ORIENTATION:
        // draft.initialHeading = action.orientation.webkitCompassHeading;
        draft.orientation = action.orientation;
        break;
      case actions.GEOLOCATION:
        draft.coords = action.coords;
        break;
      case actions.CAMERA_MOVE:
        const  {x, y, z} = action.position;
        const dx = 0 - x;
        const dy = 1.6 - y;
        const dz = 0 - z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        draft.distanceTraveled = distance;
        draft.userPosition = action.position;
        break;
      case actions.PLACE_USER:
      case actions.START_HEADING:
        draft.initialHeading = action.heading;
        break;
      case actions.START_LOCATION:
        draft.initialLocation = action.location;
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
