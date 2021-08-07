const ALERT_SUCCESS = "error/ALERT_SUCCESS";
const ALERT_ERROR = "error/ALERT_ERROR";
const RESET_ERROR_INFO = "error/RESET_ERROR_INFO";

export const alertError = (requestType, payload) => ({
  type: ALERT_ERROR,
  requestType: requestType,
  payload: payload,
});

export const alertSuccess = (requestType) => ({
  type: ALERT_SUCCESS,
  requestType: requestType,
});

export const resetErrorInfo = () => ({
  type: RESET_ERROR_INFO,
});

const initialState = {};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ALERT_ERROR:
      return {
        ...state,
        // [action.requestType]: /\d{3}/.exec(action.payload.message)[0],
        [action.requestType]: action.payload.message,
      };
    case ALERT_SUCCESS:
      return {
        ...state,
        [action.requestType]: false,
      };
    case RESET_ERROR_INFO:
      return initialState;
    default:
      return state;
  }
}
