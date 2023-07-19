import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./PMModal.css"

const PMModal = ({ showModal,
                     message,
                     primaryBtnText,
                     primaryBtnValue,
                     secondaryBtnText,
                     secondaryBtnValue,
                     callbackFn,
                     data,
                   }) => {

  const [show, setShow] = useState(showModal);

  // The root element is the outermost React div defined src/index.js
  const rootEl = document.getElementById("root");

  const handlePrimaryButton = () => {
    setShow(false);
    const retVal = {
      btnText: primaryBtnText,
      btnValue: primaryBtnValue,
      btnClicked: "primary",
      data
    };
    callbackFn(retVal);
  };

  const handleSecondaryButton = () => {
    setShow(false);
    const retVal = {
      btnText: secondaryBtnText,
      btnValue: secondaryBtnValue,
      btnClicked: "secondary",
      data
    };
    callbackFn(retVal);
  };

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    console.log("handleShow");
  }

  return (
    <>
      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        onShow={handleShow}
        container={rootEl}
        dialogClassName="pm-modal"
      >
        <Modal.Header className="bg-light"></Modal.Header>
        <Modal.Body className="bg-light">
          <p>{message}</p>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="primary" onClick={handlePrimaryButton}>
            {primaryBtnText}
          </Button>
          <Button variant="secondary" onClick={handleSecondaryButton}>
            {secondaryBtnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PMModal;