export function setMapElementReference(mapRef, dispatch) {
    dispatch({
        type: 'SET_MAP_REFERENCE',
        payload: mapRef
    });
}

export function setMapLibraryInstance(mapLibraryInstance, dispatch) {
    dispatch({
        type: 'SET_MAP_LIBRARY_INSTANCE',
        payload: mapLibraryInstance
    });
}

export function setMapLibraryType(mapLibraryType, dispatch) {
    dispatch({
        type: 'SET_MAP_LIBRARY_TYPE',
        payload: mapLibraryType
    });
}

export function setDeckglGoogleMapsOverlay(deckglGoogleMapsOverlay, dispatch) {
    dispatch({
        type: 'SET_DECKGL_GOOGLE_MAPS_OVERLAY',
        payload: deckglGoogleMapsOverlay
    });
}

export function setDeckglMapboxOverlay(deckglMapboxOverlay, dispatch) {
    dispatch({
        type: 'SET_DECKGL_MAPBOX_MAPS_OVERLAY',
        payload: deckglMapboxOverlay
    });
}

export function setDeckglOverlayType(deckglOverlayType, dispatch) {
    dispatch({
        type: 'SET_DECKGL_OVERLAY_TYPE',
        payload: deckglOverlayType
    });
}