import { createSlice } from "@reduxjs/toolkit";

const geoLayersSlice = createSlice({
  name: "geoLayers",
  initialState: {layers:[]},
  reducers: {
    replaceGeoLayers(state, action) {
      state.layers = action.payload;
    },
  },
});


export default geoLayersSlice;
