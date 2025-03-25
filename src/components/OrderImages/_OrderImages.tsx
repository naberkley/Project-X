import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useOrderImagesContext } from "./_OrderImagesContext";

import ClientInfoStep from "./OrderingSteps/1_ClientInfo";
import CustomizeImagesStep from "./OrderingSteps/2_CustomizeImages";
import FinalizeOrderStep from "./OrderingSteps/3_FinalizeOrder";
import OrderConfirmationStep from "./OrderingSteps/4_Confirmation";

function OrderImages() {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    pricePerImage,
    uploadedFiles,
    totalPrice,
    creditCardInfo,
    jobName,
    clientName,
    setClientName,
    setJobName,
  } = useOrderImagesContext();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for confirmation popup

  // Load clientName and jobName from localStorage on component mount
  useEffect(() => {
    const storedClientName = localStorage.getItem("clientName");
    const storedJobName = localStorage.getItem("jobName");

    if (storedClientName) setClientName(storedClientName);
    if (storedJobName) setJobName(storedJobName);
  }, [setClientName, setJobName]);

  // Save clientName and jobName to localStorage whenever they change
  useEffect(() => {
    if (clientName) localStorage.setItem("clientName", clientName);
    if (jobName) localStorage.setItem("jobName", jobName);
  }, [clientName, jobName]);

  // Function to handle the "Confirm" button click
  const handleConfirmClick = () => {
    setShowConfirmationModal(true); // Show the confirmation popup
  };

  // Function to handle confirmation in the popup
  const handleConfirmOrder = () => {
    setShowConfirmationModal(false); // Close the popup
    setCurrentStep(4); // Proceed to Step 4
  };

  // Function to handle cancellation in the popup
  const handleCancelOrder = () => {
    setShowConfirmationModal(false); // Close the popup
  };

  return (
    <div
      className="container mt-4"
      style={{
        paddingBottom: "80px",
        minHeight: "100vh",
      }}
    >
      {/* Price Display */}
      {currentStep > 1 && currentStep < 4 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Price Per Image: ${pricePerImage}</h4>
        </div>
      )}

      {/* Step Content */}
      {currentStep === 1 && <ClientInfoStep />}
      {currentStep === 2 && <CustomizeImagesStep />}
      {currentStep === 3 && <FinalizeOrderStep />}
      {currentStep === 4 && <OrderConfirmationStep />}

      {/* Fixed Navigation Buttons */}
      {currentStep < 4 && ( // Hide navigation buttons on Step 4
        <div
          className="d-flex justify-content-between align-items-center gap-2 p-3"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
          }}
        >
          {/* Footer Text */}
          <div>
            <p className="text-muted mb-0">
              Need help? <a href="mailto:us@support.com">Contact Support</a>
            </p>
          </div>

          {/* Navigation Buttons (Aligned Right) */}
          <div className="d-flex gap-2">
            {currentStep > 1 && (
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
            )}
            <OverlayTrigger
              key={currentStep} // Force reinitialization when the step changes
              placement="top"
              overlay={
                <Tooltip id="button-tooltip">
                  {currentStep === 1 && (!clientName || !jobName)
                    ? "Please enter both Client and Job name to proceed."
                    : currentStep === 3 &&
                      (uploadedFiles.length === 0 || totalPrice === 0)
                    ? "Zero images uploaded, cannot proceed. Please upload at least 1 image."
                    : ""}
                </Tooltip>
              }
              container={document.body} // Render the tooltip in the body
              popperConfig={{
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport", // Constrain the tooltip to the viewport
                    },
                  },
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: ["bottom", "right", "left"], // Allow the tooltip to reposition dynamically
                    },
                  },
                ],
              }}
            >
              <span className="d-inline-block">
                <button
                  className="btn btn-primary"
                  style={{ width: "100px" }}
                  onClick={
                    currentStep === 3
                      ? handleConfirmClick
                      : () => setCurrentStep(currentStep + 1)
                  }
                  disabled={
                    (currentStep === 1 &&
                      (!clientName.trim() || !jobName.trim())) ||
                    (currentStep === 3 &&
                      (uploadedFiles.length === 0 || totalPrice === 0))
                  }
                >
                  {currentStep === 3 ? "Confirm" : "Next"}
                </button>
              </span>
            </OverlayTrigger>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleCancelOrder}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your card ending in{" "}
            <strong>{creditCardInfo.cardNumber.slice(-4)}</strong> will be
            charged <strong>${totalPrice}</strong> for{" "}
            <strong>{uploadedFiles.length} images</strong>.
          </p>
          <p>Do you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelOrder}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderImages;
