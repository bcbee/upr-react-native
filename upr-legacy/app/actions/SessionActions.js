export const SET_SESSION_TOKEN = 'SET_SESSION_TOKEN';
export const SET_SESSION_STATE = 'SET_SESSION_STATE';
export const RESET_SESSION = 'RESET_SESSION';

const DISCONNECTED = 'DISCONNECTED';
const WAITING = 'WAITING';
const READY = 'READY';
export const SessionStates = { DISCONNECTED, WAITING, READY };

export function SetSessionToken(token, holdfor) {
  return { type: SET_SESSION_TOKEN, token, holdfor };
}

export function SetSessionState(state) {
  return { type: SET_SESSION_STATE, state };
}

export function ResetSession() {
  return { type: RESET_SESSION };
}
