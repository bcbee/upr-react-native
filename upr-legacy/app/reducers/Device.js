import { SET_FCM_TOKEN, SET_CREDENTIAL, RESET_DEVICE } from '../actions/DeviceActions';

const initialState = {};

const actionsMap = {
  [SET_FCM_TOKEN](state, action) {
    return { ...state, FCMToken: action.token};
  },
  [SET_CREDENTIAL](state, action) {
    return { ...state, credential: action.credential};
  },
  [RESET_DEVICE](state, action) {
    return initialState;
  }
};

export default function Device(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
