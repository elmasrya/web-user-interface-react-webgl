import { config } from "../Configuration";
import { MAP_LIBRARY_TYPE } from "./constants";

function getMapLibrary() {
  if (!config.mapLibraryInstance) return;
  if (!config.mapLibraryType) return;

  return {
    instance: config.mapLibraryInstance,
    type: config.mapLibraryType,
  };
}

/**
 * Pan the map to the specified latitude, longitude, and zoom level.
 *
 * Wrapper around the Google Map "panTo" function and the
 * MapLibre "flyTo" function.
 * @param latitude
 * @param longitude
 * @param [zoom = 8]
 */
function panTo(latitude, longitude, zoom = 8) {
  const mapLibrary = getMapLibrary();
  if (!mapLibrary) {
    console.error(`Unable to get javascript library for map`);
    return;
  }

  if (mapLibrary.type === MAP_LIBRARY_TYPE.GOOGLE_MAPS) {
    mapLibrary.instance.panTo({
      lat: latitude,
      lng: longitude,
    });
    mapLibrary.instance.setZoom(zoom);
  } else if (mapLibrary.type === MAP_LIBRARY_TYPE.MAPLIBRE_GL_JS) {
    mapLibrary.instance.flyTo({
      center: {
        lon: longitude,
        lat: latitude,
      },
      zoom: zoom + 2,
    });
  }
}

function getBounds() {
  const mapLibrary = getMapLibrary();

  if (!mapLibrary) {
    console.error(`Unable to get javascript library for map`);
    return;
  }

  let bounds = mapLibrary.instance.getBounds();
  return bounds;
}
function fitBounds(nw, se) {
  //TODO: Add all bounds
  let bounds = null;

  let southwest = {
    "lat": se?.latitude,
    "lng": nw?.longitude
  }

  let northeast = {
    "lat": nw?.latitude,
    "lng": se?.longitude
  }

  const mapLibrary = getMapLibrary();

  if (!mapLibrary) {
    console.error(`Unable to get javascript library for map`);
    return;
  }

  if (mapLibrary.type === MAP_LIBRARY_TYPE.MAPLIBRE_GL_JS) {

    bounds = new mapLibrary.instance.LngLatBounds(
        new mapLibrary.instance.LngLat(southwest?.lng, southwest.lat),
        new mapLibrary.instance.LngLat(northeast?.lng, northeast.lat),
    );
  } else {
    bounds = new window.google.maps.LatLngBounds(southwest, northeast)
  }

  mapLibrary.instance.fitBounds(bounds);
}

/**
 * Add a map click handler.
 *
 * Wrapper around the Google Map "click" event and MapLibre "click" event.
 *
 * @param callbackFn(event, {lat, lon})
 * @returns {eventListener, removeListenerFn()}
 */
function mapClickHandler(callbackFn) {
  const mapLibrary = getMapLibrary();

  if (!mapLibrary) {
    console.error(`Unable to get javascript library for map`);
    throw new Error("Unable to get javascript library for map");
  }

  // Forward ref to use when removing listeners
  let clickListener;
  let mapLibreClickListener;

  if (mapLibrary.type === MAP_LIBRARY_TYPE.GOOGLE_MAPS) {
    clickListener = mapLibrary.instance.addListener("click", (e) => {
      callbackFn(e, e.latLng.toJSON());
    });
  } else {
    mapLibreClickListener = (e) => {
      callbackFn(e, {lat: e.lngLat.wrap().lat, lng: e.lngLat.wrap().lng} );
    };

    clickListener = mapLibrary.instance.on("click", mapLibreClickListener);
  }

  return {
    eventListener: clickListener,
    removeListenerFn: function() {
      if (mapLibrary.type === MAP_LIBRARY_TYPE.GOOGLE_MAPS) {
        if (clickListener) {
          console.log("Removing Google Maps click listener");
          window.google.maps.event.removeListener(clickListener);
        }
      } else {
        if (clickListener) {
          console.log("Removing MapLibre click listener");
          mapLibrary.instance.off("click", mapLibreClickListener);
        }
      }
    },
  };
}

/**
 * Add a map mousemove handler.
 *
 * Wrapper around the Google Map "mousemove" event and MapLibre "mousemove" event.
 *
 * @param callbackFn(event, {lat, lon})
 * @returns {eventListener, removeListenerFn()}
 */
function mapMouseMoveHandler(callbackFn) {
  const mapLibrary = getMapLibrary();

  if (!mapLibrary) {
    console.error(`Unable to get javascript library for map`);
    throw new Error("Unable to get javascript library for map");
  }

  // Forward ref to use when removing listeners
  let mouseMoveListener;
  let mapLibreMouseMoveListener;

  if (mapLibrary.type === MAP_LIBRARY_TYPE.GOOGLE_MAPS) {
    mouseMoveListener = mapLibrary.instance.addListener("mousemove", (e) => {
      callbackFn(e, {lat:e.latLng.lat(), lng:e.latLng.lng()});
    });
  } else {
    mapLibreMouseMoveListener = (e) => {
      callbackFn(e, {lat: e.lngLat.wrap().lat, lng: e.lngLat.wrap().lng} );
    };

    mouseMoveListener = mapLibrary.instance.on("mousemove", mapLibreMouseMoveListener);
  }

  return {
    eventListener: mouseMoveListener,
    removeListenerFn: function() {
      if (mapLibrary.type === MAP_LIBRARY_TYPE.GOOGLE_MAPS) {
        if (mouseMoveListener) {
          console.log("Removing Google Maps mousemove listener");
          window.google.maps.event.removeListener(mouseMoveListener);
        }
      } else {
        if (mouseMoveListener) {
          console.log("Removing MapLibre mousemove listener");
          mapLibrary.instance.off("mousemove", mapLibreMouseMoveListener);
        }
      }
    },
  };
}

export { panTo, mapClickHandler, fitBounds, getBounds, mapMouseMoveHandler };
