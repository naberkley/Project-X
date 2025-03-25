import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOrderImagesContext } from "../_OrderImagesContext";

const OrderConfirmationStep: React.FC = () => {
  const {
    clientName,
    jobName,
    creditCardInfo,
    pricePerImage,
    totalPrice,
    uploadedFiles,
  } = useOrderImagesContext();
  const navigate = useNavigate();

  const downloadLink = "http://www.dropbox.com/yourfiles";

  return (
    <div className="container-sm text-center">
      <h3 className="text-success mb-4">Order Confirmed!</h3>
      <p className="fs-5">
        Thank you, <strong>(logged in user here)</strong>, for your order!
      </p>
      <p className="fs-5">
        Your card ending in{" "}
        <strong>{creditCardInfo.cardNumber.slice(-4)}</strong> has been charged{" "}
        <strong>${totalPrice}</strong>.
      </p>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Order Details</Card.Title>
          <p>
            <strong>Order ID:</strong> #{Math.floor(Math.random() * 1000000)}
          </p>
          <p>
            <strong>Client Name:</strong> {clientName}
          </p>
          <p>
            <strong>Job Name:</strong> {jobName}
          </p>
          <p>
            <strong>Number of Images:</strong> {uploadedFiles.length}
          </p>
          <p>
            <strong>Price Per Image:</strong> ${pricePerImage}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>
          <p>
            <strong>Payment Method:</strong> Credit Card ending in{" "}
            {creditCardInfo.cardNumber.slice(-4)}
          </p>
        </Card.Body>
      </Card>
      <p>
        <strong>Your download link is:</strong>{" "}
        <a href={downloadLink}>{downloadLink}</a>
      </p>
      <p>
        You can expect your images to be delivered at that location within 3
        business days. If you have any questions, please{" "}
        <a href="mailto:support@us.com">Contact Us</a>.
      </p>
      <p>
        A confirmation e-mail has been sent to{" "}
        <strong>(users email here)</strong> with a copy of this page.
      </p>
      <Button
        className="btn btn-secondary mt-3 me-2"
        onClick={() => window.print()}
      >
        Print This Page
      </Button>
      <Button
        className="btn btn-secondary mt-3 me-2"
        onClick={() => {
          const orderID = "000000"; // temp for testing
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Format timestamp
          const fileName =
            `${clientName}_${jobName}_${orderID}_${timestamp}_receipt`.replace(
              /[^\w-]/g,
              "_"
            ); // Replace invalid characters with underscores

          const receipt = `
            Order Confirmation
            ------------------
            Order ID: #${orderID}
            Client Name: ${clientName}
            Job Name: ${jobName}
            Number of Images: ${uploadedFiles.length}
            Price Per Image: $${pricePerImage}
            Total Price: $${totalPrice}
            Payment Method: Credit Card ending in ${creditCardInfo.cardNumber.slice(
              -4
            )}
            Download Link: ${downloadLink}
          `;
          const blob = new Blob([receipt], { type: "text/plain" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
        }}
      >
        Download Receipt
      </Button>
      <Button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </div>
  );
};

export default OrderConfirmationStep;
