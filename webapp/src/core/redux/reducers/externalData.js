import {
  RIMBLE_RECEIVED_ETH_PRICE,
  RIMBLE_RECEIVED_TX_GAS_PRICE,
  RIMBLE_RECEIVE_TX_TIME_ESTIMATE
} from "../actionTypes";

// Initialize rimbleAlert store
const initialRimbleExternalData = {
  ethPrice: {}
};

export default function(state = initialRimbleExternalData, action) {
  switch (action.type) {
    case RIMBLE_RECEIVED_ETH_PRICE: {
      const { quote } = action;
      return {
        ...state,
        ethPrice: {
          ...quote
        }
      };
    }
    case RIMBLE_RECEIVED_TX_GAS_PRICE: {
      const { gas } = action;
      console.log("gas", gas);
      return {
        ...state,
        txGas: {
          ...gas
        }
      };
    }
    case RIMBLE_RECEIVE_TX_TIME_ESTIMATE: {
      const { txEstimate } = action;
      return {
        ...state,
        txEstimate: {
          ...txEstimate
        }
      };
    }
    default: {
      return state;
    }
  }
}
