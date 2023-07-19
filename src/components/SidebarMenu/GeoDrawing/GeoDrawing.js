import Button from "react-bootstrap/Button";

import "./GeoDrawing.css";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
function GeoDrawing(props) {
  const dispatch = useDispatch();
  const mapBookmarksData = useSelector((state) => state?.configuration?.preferences?.map?.views);

  function getRows() {
    if (!mapBookmarksData) {
      return null;
    }

    let rows = [];

    return rows;
  }

  return (
    <>

        <center>
          <Button name={"Draw on Map"}>
            Create Map Bookmark
          </Button>
        </center>
      </>
  );


}

export default GeoDrawing;