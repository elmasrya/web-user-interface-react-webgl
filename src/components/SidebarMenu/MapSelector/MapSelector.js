import "./MapSelector.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAP_TYPE } from "../../../lib/constants";



function MapSelector(props) {
    const dispatch = useDispatch();
    const [mapType, setMapType] = useState(MAP_TYPE.MAPLIBRE);


    function getOptionsList() {

        let mapList = []
        let mapOptions = ["MapBox", "Google Maps", "Maps Libre"];

        mapOptions.forEach((option, index) => {
            mapList.push(
                <option key={index} onSelect={handleSelect()} value={option}>{option}</option>
            )
        });

        return mapList;
    }

    return (
        <select className="mapSelections" id="selections">{getOptionsList()}

        </select>
    );

    function handleSelect(event) {
       //
    }

}

export default MapSelector;