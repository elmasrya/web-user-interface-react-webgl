import React, {createContext, useContext, useReducer} from "react";
import PMDataReducer from "./PMDataReducer";
import {
    setMapElementReference as _setMapElementReference,
    setMapLibraryInstance as _setMapLibraryInstance,
    setMap as _setMap,
    setDeckglGoogleMapsOverlay as _setDeckglGoogleMapsOverlay,
    setDeckglMapboxOverlay as _setDeckglMapboxOverlay,
    setDeckglOverlayType as _setDeckglOverlayType,
    setMapType as _setMapType
} from "./PMDataActions";

const DataContext = createContext();
export const usePMData = () => useContext(DataContext);

const initialState = {
    mapElementReference:null,
    mapLibraryInstance:null,
    deckglGoogleMapsOverlay:null,
    deckglMapboxOverlay:null,
    deckglOverlayType:null,
    mapViews:null,
    map:null,
}

export default function PMDataProvider({children}) {

    const [state, dispatch] = useReducer(PMDataReducer, initialState);

    const setMapElementReference = (mapReference) => _setMapElementReference(mapReference, dispatch);
    const setMapLibraryInstance = (mapLibraryInstance) => _setMapLibraryInstance(mapLibraryInstance, dispatch);

    const setDeckglGoogleMapsOverlay = (deckglGoogleMapsOverlay) => _setDeckglGoogleMapsOverlay(deckglGoogleMapsOverlay, dispatch);
    const setDeckglMapboxOverlay = (deckglMapboxOverlay) => _setDeckglMapboxOverlay(deckglMapboxOverlay, dispatch);
    const setDeckglOverlayType = (deckglOverlayType) => _setDeckglOverlayType(deckglOverlayType, dispatch);
    const setMapViews = (mapViews) => _setDeckglOverlayType(mapViews, dispatch);
    const setMap= (map) => _setMap(map, dispatch);


    const mapElementReference = state.mapElementReference;
    const mapLibraryInstance = state.mapLibraryInstance;
    const deckglGoogleMapsOverlay = state.deckglGoogleMapsOverlay;
    const deckglMapboxOverlay = state.deckglMapboxOverlay;
    const deckglOverlayType = state.deckglOverlayType;
    const mapViews = state.mapViews;
    const map = state.map;

    return (
        <DataContext.Provider value={
            {
                mapElementReference,
                mapLibraryInstance,
                deckglGoogleMapsOverlay,
                deckglMapboxOverlay,
                deckglOverlayType,
                mapViews,
                map,
                setMapElementReference,
                setMapLibraryInstance,
                setDeckglGoogleMapsOverlay,
                setDeckglMapboxOverlay,
                setDeckglOverlayType,
                setMapViews,
                setMap
            }}>
            {children}
        </DataContext.Provider>
    );
};