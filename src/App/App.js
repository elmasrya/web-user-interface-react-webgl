import { ToastContainer } from "react-toastify";

import Map from "../components/Map/Map";
import MapBox from "../components/Map/MapBox";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";

/**
 * Main entry point into the Application
 */
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWVsbWFzcnkiLCJhIjoiY2xrMHJvdXdoMDAzZjNncjFwMWxiNTU1YSJ9.HLV5wRCzMxNpZWs6th0j-g'; // Replace this with your actual Mapbox access token

mapboxgl.accessToken = MAPBOX_TOKEN;

function App() {

    let page = (
            <>
                <MapBox></MapBox>
                <SidebarMenu />
            </>

        );


    return (

        <div>
            <ToastContainer />
            {page}
        </div>
    );
}

export default App;
