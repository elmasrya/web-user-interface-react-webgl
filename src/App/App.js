import { ToastContainer } from "react-toastify";

import Map from "../components/Map/Map";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import Layers from "../components/Layers/Layers";

/**
 * Main entry point into the Application
 */

function App() {
    let page = (
            <>
                <Map>
                </Map>
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
