import { SAVE_FILTERS } from "../types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SAVE_FILTERS:
      console.log("SAVE_FILTERS");
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
