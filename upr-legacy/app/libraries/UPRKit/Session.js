import axios from 'axios';
import _ from 'lodash';
import { API_ENDPOINT } from './index';
import { store } from '../../../App';
import * as SessionActions from '../../actions/SessionActions';

let previousSessionState;
let tempSessionInterval;

async function RequestToken() {
  store.dispatch(
    SessionActions.SetSessionState(SessionActions.SessionStates.DISCONNECTED)
  );
  const tokenResponse = await axios
    .get(`${API_ENDPOINT}/NewSession`)
    .catch(err => console.error(err));
  const token = tokenResponse.data;
  const holdfor = Math.floor(Math.random() * 900000) + 100000;
  store.dispatch(SessionActions.SetSessionToken(token, holdfor));
}

function SubscribeToSessionChanges() {
  tempSessionInterval = setInterval(() => {
    QueryTempSession();
  }, 1500);
}

function UnsubscribeFromSessionChanges() {
  if (tempSessionInterval) clearInterval(tempSessionInterval);
}

async function QueryTempSession() {
  const Session = store.getState().Session;
  const Device = store.getState().Device;

  if (Session.state !== SessionActions.SessionStates.WAITING) {
    return;
  }

  const tempSessionResponse = await axios
    .get(`${API_ENDPOINT}/TempSession`, {
      params: {
        token: Session.token,
        holdfor: Session.holdfor,
        fcmtoken: Device.FCMToken
      }
    })
    .catch(err => console.error(err));
  const tempSession = tempSessionResponse.data;
  switch (tempSession) {
    case 0:
      await RequestToken();
      break;
    case 1:
      break;
    case 2:
      store.dispatch(
        SessionActions.SetSessionState(SessionActions.SessionStates.READY)
      );
      break;
  }
}

async function SlideUp() {
  const Session = store.getState().Session;

  await axios
    .get(`${API_ENDPOINT}/SlideUp`, {
      params: {
        token: Session.token,
        holdfor: Session.holdfor
      }
    })
    .catch(err => console.error(err));
}

async function SlideDown() {
  const Session = store.getState().Session;

  await axios
    .get(`${API_ENDPOINT}/SlideDown`, {
      params: {
        token: Session.token,
        holdfor: Session.holdfor
      }
    })
    .catch(err => console.error(err));
}

async function PlayMedia() {
  const Session = store.getState().Session;

  await axios
    .get(`${API_ENDPOINT}/PlayMedia`, {
      params: {
        token: Session.token,
        holdfor: Session.holdfor
      }
    })
    .catch(err => console.error(err));
}

export default {
  RequestToken,
  SubscribeToSessionChanges,
  UnsubscribeFromSessionChanges,
  SlideUp,
  SlideDown,
  PlayMedia
};
