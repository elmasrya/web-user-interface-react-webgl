import React, {createContext, useContext, useReducer} from "react";
import PMDataReducer from "./PMDataReducer";
import {
    setMapElementReference as _setMapElementReference,
    setMapLibraryInstance as _setMapLibraryInstance,
    setMapLibraryType as _setMapLibraryType,
    setDeckglGoogleMapsOverlay as _setDeckglGoogleMapsOverlay,
    setDeckglMapboxOverlay as _setDeckglMapboxOverlay,
    setDeckglOverlayType as _setDeckglOverlayType,
} from "./PMDataActions";

const DataContext = createContext();
export const usePMData = () => useContext(DataContext);

const initialState = {
    mapElementReference:null,
    mapLibraryInstance:null,
    deckglGoogleMapsOverlay:null,
    deckglMapboxOverlay:null,
    deckglOverlayType:null
}

export default function PMDataProvider({children}) {

    const [state, dispatch] = useReducer(PMDataReducer, initialState);

    const setMapElementReference = (mapReference) => _setMapElementReference(mapReference, dispatch);
    const setMapLibraryInstance = (mapLibraryInstance) => _setMapLibraryInstance(mapLibraryInstance, dispatch);

    const setMapLibraryType = (mapLibraryType) => _setMapLibraryType(mapLibraryType, dispatch);
    const setDeckglGoogleMapsOverlay = (deckglGoogleMapsOverlay) => _setDeckglGoogleMapsOverlay(deckglGoogleMapsOverlay, dispatch);
    const setDeckglMapboxOverlay = (deckglMapboxOverlay) => _setDeckglMapboxOverlay(deckglMapboxOverlay, dispatch);
    const setDeckglOverlayType = (deckglOverlayType) => _setDeckglOverlayType(deckglOverlayType, dispatch);


    const mapElementReference = state.mapElementReference;
    const mapLibraryInstance = state.mapLibraryInstance;
    const deckglGoogleMapsOverlay = state.deckglGoogleMapsOverlay;
    const deckglMapboxOverlay = state.deckglMapboxOverlay;
    const deckglOverlayType = state.deckglOverlayType;

    return (
        <DataContext.Provider value={
            {
                mapElementReference,
                mapLibraryInstance,
                deckglGoogleMapsOverlay,
                deckglMapboxOverlay,
                deckglOverlayType,
                setMapElementReference,
                setMapLibraryInstance,
                setMapLibraryType,
                setDeckglGoogleMapsOverlay,
                setDeckglMapboxOverlay,
                setDeckglOverlayType
            }}>
            {children}
        </DataContext.Provider>
    );
};