import Spinner from 'react-bootstrap/Spinner';
import {createPortal} from 'react-dom';

import "./Loader.css";
import {useEffect, useState} from "react";

function Loader(props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (props.visible) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [props.visible]);


    if (!isVisible) {
        return null;
    }

    return (
        <>
            {
                createPortal(
                    <div className="pm-loader-backdrop">
                        <Spinner className="pm-loader" animation="border"></Spinner>
                    </div>, window.document.body
                )
            }
        </>
    )
}

export default Loader;