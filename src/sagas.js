import { delay, eventChannel, END } from "redux-saga";
import {
  all,
  fork,
  call,
  put,
  select,
  take,
  takeEvery
} from "redux-saga/effects";

import { actions } from "./store";

function* handleAction(action) {
  yield put({ type: "INACTION" });
}

function* logger(action) {
  console.log(action.type);
}

function* watchLogger() {
  yield takeEvery("*", logger);
}

function* watchAction() {
  yield takeEvery("ACTION", handleAction);
}

function createOrientationWatcher() {
  return eventChannel(emit => {
    const handler = evt => {
      emit(evt);
    };
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handler, false);
    }

    return () => {
      window.removeEventListener("deviceorientation", handler);
    };
  });
}

function* watchOrientation() {
  const channel = yield call(createOrientationWatcher);
  while (true) {
    const orientation = yield take(channel);
    const initialHeading = yield select(state => state.initialHeading);
    if (!initialHeading) {
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
  } else {
    //  yield put({ type: actions.USER_MOVED, position: action.position });
  }
}

export default function*() {
  yield all([
    // watchLogger(),
    watchAction(),
    takeEvery(actions.CAMERA_MOVE, cameraMove),
    fork(watchOrientation),
    fork(watchGeolocation)
  ]);
}
