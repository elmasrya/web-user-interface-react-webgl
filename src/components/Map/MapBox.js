import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import {useDispatch} from "react-redux";
import {setMap} from "../../hooks/PMDataActions";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";


const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWVsbWFzcnkiLCJhIjoiY2xrMHJvdXdoMDAzZjNncjFwMWxiNTU1YSJ9.HLV5wRCzMxNpZWs6th0j-g'; // Replace this with your actual Mapbox access token

mapboxgl.accessToken = MAPBOX_TOKEN;
function MapBox({ children }) {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const dispatch = useDispatch()
    const map = useRef(null);
    //setMap(map)
    useEffect(() => {
        if (map.current) return; // initialize map only once
        const draw = new MapboxDraw({
            displayControlsDefault: true,
            controls: {
                polygon: true,
                trash: true
            },
            defaultMode: 'draw_polygon'
        });
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        }).addControl(draw).on('draw.create', updateArea).on('draw.delete', updateArea).on('draw.update', updateArea);


        function updateArea(e) {
            const data = draw.getAll();
            const answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                const area = turf.area(data);
// Restrict the area to 2 decimal points.
                const rounded_area = Math.round(area * 100) / 100;
                answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
            } else {
                answer.innerHTML = '';
                if (e.type !== 'draw.delete')
                    alert('Click the map to draw a polygon.');
            }
        }
    });



    return(
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default MapBox;
