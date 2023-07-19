export const GOOGLE_MAPS_API_KEY = "AIzaSyA0u-QUfKeTUkHycWYTitgzdgY816no1wY";
export const GOOGLE_MAPS_MAP_ID = "c8e8f420b0840e0c";
export const MAP_DIV_ID = "map";

/**
 * Corresponds to the map preference type set by the user.
 * @type {{GOOGLE_MAPS: string, MAPLIBRE: string, OPENLAYERS: string}}
 */
export const MAP_TYPE = {
  GOOGLE_MAPS: "GoogleMaps",
  OPENLAYERS: "OpenLayers",
  MAPLIBRE: "MapLibre"
};

/**
 * Corresponds to the Map JavaScript API used.
 * @type {{MAPLIBRE_GL_JS: number, GOOGLE_MAPS: number}}
 */
export const MAP_LIBRARY_TYPE = {
  GOOGLE_MAPS: 1,
  MAPLIBRE_GL_JS: 2
};

export const DECKGL_OVERLAY_TYPE = {
  GOOGLE_MAPS: 1,
  MAPBOX: 2
};

export const MAP_DEFAULTS = {
  ZOOM_LEVEL: 6,
  LONGITUDE: -75.135278,
  LATITUDE: 26.991389
};

export const STAMEN = {
  SOURCE: "stamen",
  TONER_TILE_SOURCE_URL: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
  TERRAIN_TILE_SOURCE_URL: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
  TILE_TYPE: {
    TONER: "toner",
    TERRAIN: "terrain"
  }
};

export const SIDEBAR_ITEM = {
  MAP_SELECTOR: "map_display_option",
  GEO_DRAWING: "geo_drawing",
  MAP_BOOKMARKS: "map_bookmarks",
  GEOLAYERS: "geo_layers"
};

export const GEOLAYER_SHAPE_TYPE = {
  POINT: "Point",
  POLYGON: "Polygon",
  LINE: "Line"
}
