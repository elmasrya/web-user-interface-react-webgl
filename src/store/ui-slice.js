import { createSelector, createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    sourceUpdateRequest: null,
    openSidebar: null,
    geoDrawing: {
      isEditing: false,
    }
  },
  reducers: {
    openSidebar(state, action) {
      state.openSidebar = action.payload;
    },

    showNotification(state, action) {
      if (action.payload) {
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      } else {
        state.notification = null;
      }
    },

    setGeoDrawingIsEditing(state, action) {
      console.log(`Setting setGeoDrawingIsEditing: ${action.payload}`);
      state.geoDrawing.isEditing = action.payload;
    },
  },
});

export const geoDrawingIsEditing = (state) => state.ui.geoDrawing.isEditing;

export const uiActions = uiSlice.actions;

export default uiSlice;
