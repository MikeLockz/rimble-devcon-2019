import { SET_FILTER } from "./actionTypes";

export const setFilter = filter => {
  console.log("setFilter", filter);
  return { type: SET_FILTER, payload: { filter } };
};
