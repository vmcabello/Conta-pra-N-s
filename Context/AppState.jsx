import React, { useReducer, useState } from "react";
import AppContext from "./AppContext";
import { rootReducer } from "./Reducers";
import { SAVE_FILTERS } from "./types";

const AppState = (props) => {
  const initialState = {
    data: {
      filters: null,
    },
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);

  const SaveFilters = (filters) => {
    dispatch({
      type: SAVE_FILTERS,
      payload: {
        filters: filters,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        Filters: state.data.filters,
        SaveFilters,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
