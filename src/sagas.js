import { delay, END, eventChannel } from "redux-saga";
import { all, call, put, race, select, take, takeEvery } from "redux-saga/effects";

import { actionTypes } from "./store";

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
        type: actionTypes.START_HEADING,
        heading: 0,
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
        type: actionTypes.START_HEADING,
        heading: orientation.webkitCompassHeading
      });
    }
    yield put({
      type: actionTypes.ORIENTATION,
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
        type: actionTypes.START_LOCATION,
        location: { latitude: coords.latitude, longitude: coords.longitude }
      });
    }
    if (coords.error) {
      yield put({ type: "ERROR", message: coords.error.message });
    } else {
      yield put({
        type: actionTypes.GEOLOCATION,
        coords: { latitude: coords.latitude, longitude: coords.longitude }
      });
    }
  }
}

function* cameraMove(action) {
  const userPosition = yield select(state => state.userPosition);
  if (!userPosition) {
    const  {x, y, z} = action.position;
    const dx = 0 - x;
    const dy = 1.6 - y;
    const dz = 0 - z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    yield put({ type: actionTypes.PLACE_USER, position: action.position, distance });
  }
}

export default function*() {
  yield all([
    takeEvery(actionTypes.CAMERA_MOVE, cameraMove),
    call(watchOrientation),
    call(watchGeolocation)
  ]);
}
