import React from "react";
import { Card } from "react-bootstrap";
import { useOrderImagesContext } from "../_OrderImagesContext";

const ClientInfoStep: React.FC = () => {
  const { clientName, setClientName, jobName, setJobName } =
    useOrderImagesContext();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <Card style={{ width: "30rem", padding: "1.5rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Client Information
          </Card.Title>
          <div className="mb-3">
            <label htmlFor="clientName" className="form-label">
              Client Name:
            </label>
            <input
              type="text"
              id="clientName"
              className="form-control"
              placeholder="Enter client name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobName" className="form-label">
              Job Name:
            </label>
            <input
              type="text"
              id="jobName"
              className="form-control"
              placeholder="Enter job name"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientInfoStep;
