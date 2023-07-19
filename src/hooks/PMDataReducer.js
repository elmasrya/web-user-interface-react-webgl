import {config} from '../Configuration';

export default (state, action) => {
    switch(action.type) {
        case 'UPDATE_PREFERENCES':
            return {...state, preferences: action.payload}

        case 'SET_MAP_REFERENCE':
            console.log("PMDataReducer: SET_MAP_REFERENCE");
            config.mapElementReference = action.payload;
            return {...state, mapElementReference: action.payload}

        case 'SET_MAP_LIBRARY_INSTANCE':
            console.log("PMDataReducer: SET_MAP_LIBRARY_INSTANCE");
            config.mapLibraryInstance = action.payload;
            return {...state, mapLibraryInstance: action.payload}

        case 'SET_MAP_LIBRARY_TYPE':
            console.log("PMDataReducer: SET_MAP_LIBRARY_TYPE");
            config.mapLibraryType = action.payload;
            return {...state, mapLibraryType: action.payload}

        case 'SET_DECKGL_GOOGLE_MAPS_OVERLAY':
            console.log("PMDataReducer: SET_DECKGL_GOOGLE_MAPS_OVERLAY");
            config.deckglGoogleMapsOverlay = action.payload;
            return {...state, deckglGoogleMapsOverlay: action.payload}

        case 'SET_DECKGL_MAPBOX_MAPS_OVERLAY':
            console.log("PMDataReducer: SET_DECKGL_MAPBOX_MAPS_OVERLAY");
            config.deckglMapboxOverlay = action.payload;
            return {...state, deckglMapboxOverlay: action.payload}

        case 'SET_DECKGL_OVERLAY_TYPE':
            console.log("PMDataReducer: SET_DECKGL_OVERLAY_TYPE");
            config.deckglOverlayType = action.payload;
            return {...state, deckglOverlayType: action.payload}

        default:
            return state;
    }
}