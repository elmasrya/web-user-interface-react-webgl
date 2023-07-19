import React from "react";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "./GoogleMap.js";
import MapLibreMaps from "./MapLibreMaps";
import { useSelector } from "react-redux";
import { MAP_TYPE, GOOGLE_MAPS_API_KEY } from "../../lib/constants";

const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
};

const callback = (status, loader) => {
    console.log(`Google Map loading status:${status}`);
};

function Map({ children }) {

    const mapType = MAP_TYPE.MAPLIBRE
    console.log(`>>>> Map Component, mapType=${mapType}`);

    if(!mapType) return null;

    let mapEl;
    if (mapType === MAP_TYPE.GOOGLE_MAPS) {
        mapEl = (
            <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render} callback={callback}>
                <GoogleMap>{children}</GoogleMap>
            </Wrapper>
        );
    } else if(mapType === MAP_TYPE.OPENLAYERS || mapType === MAP_TYPE.MAPLIBRE) {
        mapEl = (
          <MapLibreMaps>{children}</MapLibreMaps>
        );
    }

    return (
        <>
            {mapEl}
        </>
    );
}

export default Map;
