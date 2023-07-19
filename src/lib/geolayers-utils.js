import { GEOLAYER_SHAPE_TYPE } from "./constants";

function createNewLayerObject(
  layerName,
  shapeName,
  shapeType,
  shapeLabel,
  coordinates,
  properties
) {
  if (!layerName) {
    throw new Error('Parameter "layerName" is invalid');
  }

  if (!shapeName) {
    throw new Error('Parameter "shapeName" is invalid');
  }

  if (!shapeType) {
    throw new Error('Parameter "shapeType" is invalid');
  }

  if (shapeType !== GEOLAYER_SHAPE_TYPE.POINT || shapeType !== GEOLAYER_SHAPE_TYPE.POLYGON) {
    throw new Error('Parameter "shapeType" is not of type Polyline or Point');
  }

  if (!coordinates) {
    throw new Error('Parameter "coordinates" is invalid');
  }

  const layer = {};

  layer.name = layerName;
  layer.owner = undefined;
  layer.Loci = {};
  layer.Loci.Locus = {};

  // Properties
  layer.properties = [];
  layer.properties.push({ entry: { key: "created", value: Date().toString() } });
  layer.properties.push({ entry: { key: "type", value: "Layer" } });

  let shape = {};
  shape.name = shapeName;
  shape.coordinates = coordinates;

  shape.properties = [];
  if (shapeType === GEOLAYER_SHAPE_TYPE.POINT) {
    shape.properties.push({ entry: { key: "type", value: GEOLAYER_SHAPE_TYPE.POINT } });
  } else if (shapeType === GEOLAYER_SHAPE_TYPE.POLYGON) {
    shape.properties.push({ entry: { key: "type", value: GEOLAYER_SHAPE_TYPE.POLYGON } });
  }

  if (shapeLabel) {
    shape.properties.push({ entry: { key: "label", value: shapeLabel } });
  }

  // Assign Point to Locus
  shape.Loci.Locus = shape;

  return layer;
}
