export const SET_FCM_TOKEN = 'SET_FCM_TOKEN';
export const SET_CREDENTIAL = 'SET_CREDENTIAL';
export const RESET_DEVICE = 'RESET_DEVICE';

export function SetFCMToken(token) {
  return { type: SET_FCM_TOKEN, token };
}

export function SetCredential(credential) {
  return { type: SET_CREDENTIAL, credential };
}

export function ResetDevice() {
  return { type: RESET_DEVICE };
}
