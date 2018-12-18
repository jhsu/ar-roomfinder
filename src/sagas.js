import { delay, eventChannel, END } from "redux-saga";
import {
  race,
  all,
  fork,
  call,
  put,
  select,
  take,
  takeEvery
} from "redux-saga/effects";

import { actions } from "./store";

function createOrientationWatcher() {
  return eventChannel(emit => {
    const handler = evt => {
      emit(evt);
    };
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handler, false);
    } else {
      emit({ error: 'no orientation info'});
      emit(END);
    }

    return () => {
      window.removeEventListener("deviceorientation", handler);
    };
  });
}

function* watchOrientation() {
  const channel = yield call(createOrientationWatcher);
  while (true) {
    const { realOrientation, timeout } = yield race({ realOrientation: take(channel),  timeout: delay(2500) });
    const orientation = realOrientation || 180;
    const initialHeading = yield select(state => state.initialHeading);
    if (!realOrientation) {
      yield put({
        type: actions.START_HEADING,
        heading: 180,
      });
      break;
    }
    if (orientation.error) {
      yield put({
        type: 'ERROR',
        error: orientation.error,
      });
      continue;
    } else if (!initialHeading) {
      yield put({
        type: actions.START_HEADING,
        heading: orientation.webkitCompassHeading
      });
    }
    yield put({
      type: actions.ORIENTATION,
      orientation: {
        alpha: orientation.alpha,
        gamma: orientation.gamma,
        beta: orientation.beta,
        webkitCompassHeading: orientation.webkitCompassHeading
      }
    });
  }
}

function createGeolocation() {
  return eventChannel(emit => {
    const handler = position => {
      emit(position.coords);
    };

    navigator.geolocation.getCurrentPosition(handler);

    var watchID = navigator.geolocation.watchPosition(handler, err => {
      emit(
        { error: err },
        {
          enableHighAccuracy: true
        }
      );
    });

    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  });
}

function* watchGeolocation() {
  yield delay(1000);
  const watcher = yield call(createGeolocation);
  while (true) {
    const coords = yield take(watcher);
    const initialLocation = yield select(state => state.initialLocation);

    if (!initialLocation) {
      yield put({
        type: actions.START_LOCATION,
        location: { latitude: coords.latitude, longitude: coords.longitude }
      });
    }
    if (coords.error) {
      yield put({ type: "ERROR", message: coords.error.message });
    } else {
      yield put({
        type: actions.GEOLOCATION,
        coords: { latitude: coords.latitude, longitude: coords.longitude }
      });
    }
  }
}

function* cameraMove(action) {
  // if this is the first move, than reorient the world
  const userPosition = yield select(state => state.userPosition);
  if (!userPosition) {
    // TODO: re-orient the world
    // join with geolocation and orientation
    yield put({ type: actions.PLACE_USER, position: action.position });
  }
}

export default function*() {
  yield all([
    takeEvery(actions.CAMERA_MOVE, cameraMove),
    fork(watchOrientation),
    fork(watchGeolocation)
  ]);
}
