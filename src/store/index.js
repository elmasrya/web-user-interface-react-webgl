import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import geoLayersSlice from "./geolayers-slice";

let devToolsOptions = {
  name: "PM Redux DevTools",
  trace: false,
  serialize: false,
};

/*
 'configureStore' is a reduxjs/toolkit method that replaces the standard redux
 method 'createStore'.  This enables creating multiple state 'slices' that will
 become part of the single, global state.
 */
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    geoLayers: geoLayersSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'production' ? false : devToolsOptions,
});

export default store;