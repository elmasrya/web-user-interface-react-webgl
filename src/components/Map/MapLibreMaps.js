import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import { MAP_DEFAULTS, MAP_DIV_ID, STAMEN, DECKGL_OVERLAY_TYPE, MAP_LIBRARY_TYPE } from "../../lib/constants";

import { usePMData } from "../../hooks/PMDataProvider";

import "maplibre-gl/dist/maplibre-gl.css";

function MapLibreMaps({ children }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(MAP_DEFAULTS.LONGITUDE);
  const [lat] = useState(MAP_DEFAULTS.LATITUDE);
  const [zoom] = useState(MAP_DEFAULTS.ZOOM_LEVEL);
  const [mapTileSource] = useState(STAMEN.SOURCE);
  const [tileType] = useState(STAMEN.TILE_TYPE.TONER);
  const [TONER_TILE] = useState(STAMEN.TONER_TILE_SOURCE_URL);
  const [TERRAIN_TILE] = useState(STAMEN.TERRAIN_TILE_SOURCE_URL);

  const {
    setMapElementReference,
    setMapLibraryInstance,
    setMapLibraryType,
    setDeckglMapboxOverlay,
    setDeckglGoogleMapsOverlay,
    setDeckglOverlayType,
  } = usePMData();

  useEffect(() => {
    if (map.current) return; //stops map from initializing more than once

    if (mapTileSource === STAMEN.SOURCE) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            "raster-tiles": {
              type: "raster",
              tiles: [
                `${tileType === STAMEN.TILE_TYPE.TONER ? TONER_TILE : TERRAIN_TILE}`,
              ],
              tileSize: 256,
              attribution:
                'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
            },
          },
          layers: [
            {
              id: "simple-tiles",
              type: "raster",
              source: "raster-tiles",
              minzoom: 0,
              maxzoom: 22,
            },
          ],
          center: [lng, lat],
          zoom: zoom,
        },
      });
    } else {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [lng, lat],
        zoom: zoom,
      });
    }

    map.current.addControl(
      new maplibregl.NavigationControl(undefined),
      "bottom-left"
    );

    // Add Deck.GL layer to map
    const deckOverlay = new DeckOverlay({
      onViewStateChange: ({ viewState }) => {
        console.log(viewState);
      },
      layers: [],
    });

    map.current.addControl(deckOverlay);

    map.current.on("zoomend", function (e, e2, e3) {
      //let zoom = map.current.getZoom();
    });

    setMapLibraryInstance(map.current);
    setMapLibraryType(MAP_LIBRARY_TYPE.MAPLIBRE_GL_JS);
    setMapElementReference(mapContainer.current);
    setDeckglMapboxOverlay(deckOverlay);
    setDeckglGoogleMapsOverlay(null);
    setDeckglOverlayType(DECKGL_OVERLAY_TYPE.MAPBOX);
  });

  return (
    <>
      <div ref={mapContainer} id={MAP_DIV_ID} />
      {children}
    </>
  );
}

export default MapLibreMaps;
