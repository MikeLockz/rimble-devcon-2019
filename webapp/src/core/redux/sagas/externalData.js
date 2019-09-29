import { put, call, takeEvery } from "redux-saga/effects";
import {
  RIMBLE_FETCH_ETH_PRICE,
  RIMBLE_RECEIVED_ETH_PRICE,
  RIMBLE_CALL_TX_GAS_PRICE,
  RIMBLE_RECEIVED_TX_GAS_PRICE,
  RIMBLE_FETCH_GAS_STATION_RECENT_TX,
  RIMBLE_RECEIVE_TX_TIME_ESTIMATE,
  RIMBLE_ERROR_GAS_STATION_RECENT_TX
} from "../actionTypes";

// fetch data from service using sagas
export function* fetchEthPrice(action) {
  const quote = yield fetch(
    "https://api.infura.io/v1/ticker/eth" + action.payload.value
  ).then(response => response.json());
  yield put({ type: RIMBLE_RECEIVED_ETH_PRICE, quote });
}

export function* callTxGasPrice(action) {
  const { web3, txHash } = action.payload;

  try {
    const transaction = yield call(web3.eth.getTransaction, txHash);
    const txGas = transaction.gas; // returns 214806, units
    const txGasPrice = parseInt(
      web3.utils.fromWei(transaction.gasPrice, "gwei")
    ); // normalize units
    const txGasEstimate = web3.utils.fromWei(
      (txGas * txGasPrice).toString(),
      "gwei"
    );

    const gas = {
      txGasPrice: txGasPrice,
      txGas: txGas,
      txGasEstimate: txGasEstimate
    };

    yield put({ type: RIMBLE_RECEIVED_TX_GAS_PRICE, gas });
  } catch (error) {}
}

const findClosestPrediction = (gasStationInfo, gas) => {
  //const counts = [4, 9, 15, 6, 2];
  const counts = gasStationInfo.map(entry => {
    return entry.gasprice;
  });

  const goal = gas;
  const closest = counts.reduce(function(prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  const index = counts.indexOf(closest);
  const closestGas = gasStationInfo[index];

  return closestGas;
};

export function* fetchGasStationRecentTx(action) {
  try {
    const txEstimate = yield fetch(
      "https://ethgasstation.info/json/predictTable.json"
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        const closestPrediction = findClosestPrediction(responseJson, 1);
        return closestPrediction;
      });
    yield put({ type: RIMBLE_RECEIVE_TX_TIME_ESTIMATE, txEstimate });
  } catch (error) {
    yield put({ type: RIMBLE_ERROR_GAS_STATION_RECENT_TX, error });
  }
}

// app root saga
export function* appRootSaga() {
  yield takeEvery(RIMBLE_FETCH_ETH_PRICE, fetchEthPrice);
  yield takeEvery(RIMBLE_CALL_TX_GAS_PRICE, callTxGasPrice);
  yield takeEvery(RIMBLE_FETCH_GAS_STATION_RECENT_TX, fetchGasStationRecentTx);
}

export default appRootSaga;
