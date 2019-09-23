import {
  RIMBLE_ADD_PROGRESSALERT,
  RIMBLE_TOGGLE_PROGRESSALERT,
  RIMBLE_SET_PROGRESSALERT_STATUS,
  RIMBLE_SET_PROGRESSALERT_TX_HASH,
  RIMBLE_UPDATE_PROGRESSALERT_CONTENT,
  RIMBLE_UPDATE_PROGRESSALERT_REMAININGTIME,
  RIMBLE_UPDATE_PROGRESSALERT_TXFEE
} from "../actionTypes";

// Initialize rimbleAlert store
const initialRimbleProgressAlert = {
  allIds: [],
  byIds: {}
};

const getIdByTxHash = ({ state, txHash }) => {
  const id = Object.keys(state.byIds).find(keys => {
    return state.byIds[keys].txHash === txHash;
  });

  return id;
};

const getIdByStackTempKey = ({ state, stackTempKey }) => {
  const id = Object.keys(state.byIds).find(keys => {
    return state.byIds[keys].stackTempKey === stackTempKey;
  });

  return id;
};

const getProgressAlertPosition = ({ state, id, txHash, stackTempKey }) => {
  let progressAlertPosition = null;

  if (typeof txHash !== "undefined") {
    progressAlertPosition = getIdByTxHash({ state, txHash });
  } else if (typeof stackTempKey !== "undefined") {
    progressAlertPosition = getIdByStackTempKey({ state, stackTempKey });
  } else {
    progressAlertPosition = id;
  }

  return progressAlertPosition;
};

// Managing progressAlert component's state
export default function(state = initialRimbleProgressAlert, action) {
  switch (action.type) {
    case RIMBLE_ADD_PROGRESSALERT: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content: {
              token: {
                id: "DevConAttendance",
                name: "Conference ticket",
                ethPrice: "5.63",
                usdPrice: "1,000.00",
                image: "conference.png"
              }
            },
            remainingTime: {
              string: "Calculating remaining time...",
              percent: null,
              seconds: null
            },
            completed: false,
            status: "unknown",
            txHash: "0x123",
            stackTempKey: "123"
          }
        }
      };
    }
    case RIMBLE_TOGGLE_PROGRESSALERT: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    case RIMBLE_SET_PROGRESSALERT_STATUS: {
      const { status, id, txHash, stackTempKey } = action.payload;
      const pa = getProgressAlertPosition({ state, id, txHash, stackTempKey });

      switch (status) {
        case "started":
          return {
            ...state,
            byIds: {
              ...state.byIds,
              [pa]: {
                ...state.byIds[pa],
                status: status
              }
            }
          };
        case "pending":
          return {
            ...state,
            byIds: {
              ...state.byIds,
              [pa]: {
                ...state.byIds[pa],
                status: status,
                timeEstimate: 10
              }
            }
          };
        case "success":
          return {
            ...state,
            byIds: {
              ...state.byIds,
              [pa]: {
                ...state.byIds[pa],
                status: status,
                timeEstimate: null,
                completed: true
              }
            }
          };
        case "error":
          return {
            ...state,
            byIds: {
              ...state.byIds,
              [pa]: {
                ...state.byIds[pa],
                status: status,
                timeEstimate: null,
                completed: true
              }
            }
          };
        default:
          return state;
      }
      if (status === "pending") {
      } else if (status === "success") {
      } else if (status) {
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [pa]: {
              ...state.byIds[pa],
              status: status
            }
          }
        };
      } else {
        return state;
      }
    }
    case RIMBLE_SET_PROGRESSALERT_TX_HASH: {
      const { stackTempKey, txHash, id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            txHash: txHash,
            stackTempKey: stackTempKey
          }
        }
      };
    }
    case RIMBLE_UPDATE_PROGRESSALERT_CONTENT: {
      const { content, id, txHash, stackTempKey } = action.payload;

      const pa = getProgressAlertPosition({ state, id, txHash, stackTempKey });

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [pa]: {
            ...state.byIds[pa],
            content: {
              ...state.byIds[pa].content,
              ...content
            }
          }
        }
      };
    }
    case RIMBLE_UPDATE_PROGRESSALERT_REMAININGTIME: {
      const { content, id, txHash, stackTempKey } = action.payload;

      const pa = getProgressAlertPosition({ state, id, txHash, stackTempKey });

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [pa]: {
            ...state.byIds[pa],
            remainingTime: {
              string: "Less than 2 minutes remaining",
              percent: 38,
              seconds: 100
            }
          }
        }
      };
    }
    case RIMBLE_UPDATE_PROGRESSALERT_TXFEE: {
      const { content, id, txHash, stackTempKey } = action.payload;

      const pa = getProgressAlertPosition({ state, id, txHash, stackTempKey });

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [pa]: {
            ...state.byIds[pa],
            txFee: {
              usd: 0.42,
              eth: 0.00112
            }
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}
