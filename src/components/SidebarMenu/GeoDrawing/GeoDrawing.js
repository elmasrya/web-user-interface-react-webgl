import Button from "react-bootstrap/Button";

import "./GeoDrawing.css";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import {useState} from "react";
function GeoDrawing(props) {
    const [messageOpen, setShowMessage] = useState(false);


    function drawOnMap() {
      const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/satellite-v9', // style URL
          center: [-91.874, 42.76], // starting position [lng, lat]
          zoom: 12 // starting zoom
      });

      const draw = new MapboxDraw({
          displayControlsDefault: true,
          controls: {
              polygon: true,
              trash: true
          },
          defaultMode: 'draw_polygon'
      });
      map.addControl(draw);

      map.on('draw.create', updateArea);
      map.on('draw.delete', updateArea);
      map.on('draw.update', updateArea);

      function updateArea(e) {
          const data = draw.getAll();
          const answer = document.getElementById('calculated-area');
          if (data.features.length > 0) {
              const area = turf.area(data);
              const rounded_area = Math.round(area * 100) / 100;
              answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
          } else {
              answer.innerHTML = '';
              if (e.type !== 'draw.delete')
                  alert('Click the map to draw a polygon.');
          }
      }
  }

  function showMessage() {
        drawOnMap();
      setShowMessage(true);
  }

  return (
    <>

        <center>
          <Button name={"Draw on Map"} onClick={showMessage}>
           Draw on Map
          </Button>
            { messageOpen && (
            <div>
                Place cursor over map and click to begin
            </div>
            )}
            <div id="calculated-area"></div>
        </center>
      </>
  );
}

export default GeoDrawing;