import {
  RIMBLE_ADD_PROGRESSALERT,
  RIMBLE_TOGGLE_PROGRESSALERT,
  RIMBLE_SET_PROGRESSALERT_STATUS,
  RIMBLE_SET_PROGRESSALERT_TX_HASH
} from "../actionTypes";

// Initialize rimbleAlert store
const initialRimbleProgressAlert = {
  allIds: [],
  byIds: {}
};

// Managing progressAlert component's state
export default function(state = initialRimbleProgressAlert, action) {
  console.log("rimbleProgressAlertReducer", action);
  switch (action.type) {
    case RIMBLE_ADD_PROGRESSALERT: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false,
            status: "unknown",
            hash: ""
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
      const { status, id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            status: status
          }
        }
      };
    }
    case RIMBLE_SET_PROGRESSALERT_TX_HASH: {
      const { hash, id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            hash: hash
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}
