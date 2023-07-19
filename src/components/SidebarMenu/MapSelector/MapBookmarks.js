import Button from "react-bootstrap/Button";

import "./MapBookmarks.css";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";

import Table from "react-bootstrap/Table";
import { fitBounds, getBounds } from "../../../lib/map-utils";
import { useState } from "react";
import Form from "react-bootstrap/Form";

function MapSelector(props) {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkNameError, setBookmarkNameError] = useState(false);
  const mapBookmarksData = useSelector((state) => state?.configuration?.preferences?.map?.views);

  function getRows() {
    if (!mapBookmarksData) {
      return null;
    }

    let rows = [];

    mapBookmarksData.forEach((view, index) => {
      console.log(view?.name);
      rows.push(
        <tr onClick={(e) => gotoMapBookmark(view?.bounds)}>
          <td>{view?.name}</td>
          <td>Default Status</td>
          <td>
            <div className="mapbookmarks-delete-icon">
              <FaRegTimesCircle onClick={(e) => removeBookmark(index)} />
            </div>
          </td>
        </tr>
      );
    });

    return rows;
  }

  return (
    <>
      {!formOpen && (
        <center>
          <Button name={"createButton"} onClick={showForm}>
            Create Map Bookmark
          </Button>
        </center>
      )}

      {formOpen && (
        <Form onSubmit={handleSubmit}>
          <label>Map Bookmark Name:</label>
          <br />
          <input
            className={`${
              bookmarkNameError ? "mapbookmark-input-error" : "mapbookmark-input-default"
            }`}
            type="text"
            value={bookmarkName}
            hint={"Map Bookmark #" + mapBookmarksData?.length}
            onChange={handleChange}
          />
          <br />
          <br />
          <div>
            <input type="submit" value="Submit" />
            <span>&#160;&#160;&#160;</span>
            <Button type={"button"} onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </Form>
      )}

      <Table bordered hover className="map-bookmarks-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Default</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </Table>
    </>
  );

  function gotoMapBookmark(bounds) {
    fitBounds(bounds?.northwest, bounds?.southeast);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let name = bookmarkName;
    if (!isAlphaNumeric(name) || !name) {
      setBookmarkNameError(true);
      return;
    }
    resetForm();
    createMapBookmark(name);
  }

  function showForm() {
    setFormOpen(true);
  }

  function handleChange(event) {
      if (bookmarkNameError) {
          setBookmarkNameError(false)
      }
      setBookmarkName(event.target.value);
  }

  function resetForm() {
    setFormOpen(false);
    setBookmarkName("");
    setBookmarkNameError(false);
  }

  function isAlphaNumeric(str) {
    let code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }

  function createMapBookmark(name) {
    let bounds = getBounds();
    let northEast = bounds.getNorthEast();
    let southWest = bounds.getSouthWest();
    let mapView = {
      bounds: {
        northwest: {
          latitude: northEast.lat(),
          longitude: southWest.lng(),
        },
        southeast: {
          latitude: southWest.lat(),
          longitude: northEast.lng(),
        },
      },
      name: name,
    };

    let newMapViews = [...mapBookmarksData];
    newMapViews.push(mapView);
    handleMapBookmarksChange(newMapViews);
  }

  function removeBookmark(index) {
    let newMapViews = [...mapBookmarksData];
    newMapViews.splice(index, 1);
    handleMapBookmarksChange(newMapViews);
  }

  function handleMapBookmarksChange(mapViews) {
    //dispatch();
  }
}

export default MapBookmarks;