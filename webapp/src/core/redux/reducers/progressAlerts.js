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
      const { status, id, stackTempKey, txHash } = action.payload;
      console.log(
        "RIMBLE_SET_PROGRESSALERT_STATUS",
        status,
        id,
        stackTempKey,
        txHash
      );
      if (typeof id !== "undefined") {
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
      } else if (typeof stackTempKey !== "undefined") {
        // Get the Id
        const id = Object.keys(state.byIds).find(keys => {
          return state.byIds[keys].stackTempKey === stackTempKey;
        });

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
      } else if (typeof txHash !== "undefined") {
        // Get the Id
        const id = Object.keys(state.byIds).find(keys => {
          return state.byIds[keys].txHash === txHash;
        });
        console.log("typeof txHash", id);

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
    default: {
      return state;
    }
  }
}
