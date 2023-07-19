import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import { MapDisplayOptions } from "./MapDisplayOptions/MapDisplayOptions";
import GeoDrawing from "./GeoDrawing/GeoDrawing";
import MapBookmarks from "./MapBookmarks/MapBookmarks";
import GeoLayers from "./GeoLayers/GeoLayers";

import { uiActions } from "../../store/ui-slice";
import { SIDEBAR_ITEM } from "../../lib/constants";

import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import "./SidebarMenu.css";

export default function SidebarMenu(props) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const openSidebar = useSelector((state) => state.ui.openSidebar);

  const handleOpen = () => setShow(true);
  const toggle = () => setShow(!show);

  useEffect(() => {
    if (!openSidebar) {
      return;
    }

    if (openSidebar.show) {
      handleOpen();
    }

    // Open the accordion item
    switch (openSidebar.item) {
      case SIDEBAR_ITEM.GEO_DRAWING:
        setEventKey("1");
        break;

      case SIDEBAR_ITEM.MAP_BOOKMARKS:
        setEventKey("2");
        break;

      case SIDEBAR_ITEM.GEOLAYERS:
        setEventKey("3");
        break;

      case SIDEBAR_ITEM.MAP_SELECTOR:
        setEventKey("0");
        break;

      default:
        setEventKey("1");
    }

    dispatch(uiActions.openSidebar(null));
  }, [openSidebar, dispatch]);

  // To enable programmatic opening of accordion items, two properties on the
  // <Accordion> component are used.
  //
  // The "activeKey" prop will open the accordion to the item assigned.
  //
  // The "onSelect" event will capture an accordion item that is clicked.
  // When the item is clicked, the event handler will set the eventKey which
  // will be assigned to the "activeKey" to open the item section.
  const [eventKey, setEventKey] = useState("0");

  const sidebarButtonClassname = show
    ? "button-sidebar button-sidebar-open"
    : "button-sidebar button-sidebar-closed";

  return (
    <div className="sidebar-container">
      <Button onClick={toggle} className={sidebarButtonClassname}>
        {show ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
      </Button>
      <Offcanvas
        show={show}
        placement={"end"}
        backdrop={false}
        autoFocus={false}
        enforceFocus={false}
      >
        <Offcanvas.Body className="offcanvas-customize">
          <Accordion
            activeKey={eventKey}
            onSelect={(eventKey) => {
              setEventKey(eventKey);
            }}
          >
            <Accordion.Item className="accordion-item" eventKey="0">
              <Accordion.Header className="accordion-header">
                {"Select Map"}
              </Accordion.Header>
              <Accordion.Body>
                <MapDisplayOptions />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className="accordion-item" eventKey="1">
              <Accordion.Header className="accordion-header">
                {"Geo Drawing"}
              </Accordion.Header>
              <Accordion.Body>
                <GeoDrawing />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className="accordion-item" eventKey="2">
              <Accordion.Header className="accordion-header">
                {"MaP Views"}
              </Accordion.Header>
              <Accordion.Body>
                <MapBookmarks />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className="accordion-item" eventKey="3">
              <Accordion.Header className="accordion-header">
                {"GEOLAYERS"}
              </Accordion.Header>
              <Accordion.Body>
                <GeoLayers />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
