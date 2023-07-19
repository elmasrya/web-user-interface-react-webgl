import { useState } from "react";
import { useSelector } from "react-redux";

import "./GeoLayers.css";
import Button from "react-bootstrap/Button";

function GeoLayers(props) {
  const layers = useSelector((state)=>state?.geoLayers?.layers)

  function getLayerNames() {
    let layerName = layers.map(layer=>{

      let locusNames;
      if(Array.isArray(layer.Loci.Locus)) {
        locusNames = layer.Loci.Locus.map(l => {
          if(l?.Polygon) {
            return l.Polygon.name;
          } else if(l?.Point) {
            return l.Point.name;
          }
        })
      } else {
        locusNames = [];
        if(layer.Loci.Locus?.Polygon) {
          locusNames[0] = layer.Loci.Locus.Polygon.name;
        } else if(layer.Loci.Locus?.Point) {
          locusNames[0] = layer.Loci.Locus.Point.name;
        }
      }
      
      return (
        <div key={layer.name}>
          {layer.name}
          {locusNames && locusNames.map(ln=>(<div>{'\u00A0\u00A0\u00A0\u00A0'}{ln}</div>))}
        </div>)
    });

    return layerName;
  }


  return (
    <div>
      <Button size="sm" className="geolayers-btn">
        {("NEW")}
      </Button>
      <Button size="sm" className="geolayers-btn">
        {("IMPORT")}
      </Button>
      <div>{getLayerNames()}</div>
    </div>
  );

}

export default GeoLayers;