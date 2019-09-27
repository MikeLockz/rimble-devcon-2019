import { RIMBLE_RECEIVED_ETH_PRICE } from "../actionTypes";

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
    default: {
      return state;
    }
  }
}
