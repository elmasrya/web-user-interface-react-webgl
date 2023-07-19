import React, { useRef, useEffect } from "react";
import {useSelector} from "react-redux";

import { GoogleMapsOverlay as DeckOverlay } from "@deck.gl/google-maps";


import {
  MAP_DEFAULTS,
  DECKGL_OVERLAY_TYPE,
  GOOGLE_MAPS_MAP_ID,
  MAP_DIV_ID,
  MAP_LIBRARY_TYPE
} from "../../lib/constants";

import { usePMData } from "../../hooks/PMDataProvider";

function GoogleMap({ children }) {
  const mapDivRef = useRef();
  const center = { lat: MAP_DEFAULTS.LATITUDE, lng: MAP_DEFAULTS.LONGITUDE };
  const zoom = MAP_DEFAULTS.ZOOM_LEVEL;

  const {
    setMapElementReference,
    setMapLibraryInstance,
    setMapLibraryType,
    setDeckglGoogleMapsOverlay,
    setDeckglMapboxOverlay,
    setDeckglOverlayType,
  } = usePMData();

  let defaultView = null;
  const mapViews = useSelector(
    (state) => state?.configuration?.preferences?.map?.views
  );

  if(mapViews && mapViews.length > 0) {
    defaultView = mapViews[0];
  }

  console.log(defaultView);

  /*
      Run only when the component is being loaded the first time.
      1. Creates a new Google Map instance.
      2. Creates a new Deck.gl GoogleMapsOverlay.
      3. Bind the Google Map instance to the Deck.gl overlay
   */
  useEffect(() => {
    // Create Google Map instance
    let googleMap = new window.google.maps.Map(mapDivRef.current, {
      mapId: GOOGLE_MAPS_MAP_ID,
      center,
      zoom,
      streetViewControl: false,
      mapTypeControl: true,
      // disableDefaultUI: true,
      fullscreenControl: false,
      gestureHandling: "greedy",
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
        mapTypeIds: ["hybrid", "roadmap", "terrain"],
      },
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
    });

    let googleMapsOverlay = new DeckOverlay({});

    googleMapsOverlay.setMap(googleMap);

    // Save the created Google Map and DeckGL overlay
    // instances into the 'global' state store
    setDeckglOverlayType(DECKGL_OVERLAY_TYPE.GOOGLE_MAPS);
    setDeckglGoogleMapsOverlay(googleMapsOverlay);
    setDeckglMapboxOverlay(null);
    setMapLibraryInstance(googleMap);
    setMapLibraryType(MAP_LIBRARY_TYPE.GOOGLE_MAPS);
    setMapElementReference(mapDivRef);

    // eslint-disable-next-line
  }, []);

  /**
   * Render the Google Map instance on the web page
   */
  return (
    <>
      <div ref={mapDivRef} id={MAP_DIV_ID} />
      {children}
    </>
  );
}

export default GoogleMap;
