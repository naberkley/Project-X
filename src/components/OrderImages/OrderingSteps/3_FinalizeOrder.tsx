import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useOrderImagesContext } from "../_OrderImagesContext";

const FinalizeOrderStep: React.FC = () => {
  const {
    pricePerImage,
    uploadedFiles,
    totalPrice,
    handleFileUpload,
    clientName,
    jobName,
    imageWidth,
    imageHeight,
    currentPadding,
    colorState,
    selectedCroppingOption,
    imageType,
  } = useOrderImagesContext();

  return (
    <div className="container-sm">
      <h3 className="text-center mb-4">Finalize Your Order</h3>

      {/* Order Summary and Example Prices */}
      <Row className="mb-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <i className="bi bi-card-list"></i> Order Summary
              </Card.Title>
              <Row className="mb-2 align-items-center">
                <Col xs={1} className="text-center">
                  <i className="bi bi-person-circle"></i>
                </Col>
                <Col xs={5} sm={4} className="text-start text-nowrap">
                  <strong>Client Name:</strong>
                </Col>
                <Col xs={6} sm={7} className="text-start text-wrap">
                  {clientName || "N/A"}
                </Col>
              </Row>
              <Row className="mb-2 align-items-center">
                <Col xs={1} className="text-center">
                  <i className="bi bi-briefcase"></i>
                </Col>
                <Col xs={5} sm={4} className="text-start text-nowrap">
                  <strong>Job Name:</strong>
                </Col>
                <Col xs={6} sm={7} className="text-start text-wrap">
                  {jobName || "N/A"}
                </Col>
              </Row>
              <Row className="mb-2 align-items-center">
                <Col xs={1} className="text-center">
                  <i className="bi bi-images"></i>
                </Col>
                <Col xs={5} sm={4} className="text-start text-nowrap">
                  <strong>Image Count:</strong>
                </Col>
                <Col xs={6} sm={7} className="text-start text-wrap">
                  {uploadedFiles.length}
                </Col>
              </Row>
              <Row className="mb-2 align-items-center">
                <Col xs={1} className="text-center">
                  <i className="bi bi-currency-dollar"></i>
                </Col>
                <Col xs={5} sm={4} className="text-start text-nowrap">
                  <strong>Price Per Image:</strong>
                </Col>
                <Col xs={6} sm={7} className="text-start text-wrap">
                  ${pricePerImage.toFixed(2)}
                </Col>
              </Row>
              <Row className="align-items-center mt-4">
                <Col xs={2} className="text-center">
                  <i
                    className="bi bi-cash-stack text-success"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </Col>
                <Col xs={10} className="text-start">
                  <strong
                    className="text-success"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Total Price: ${totalPrice.toFixed(2)}
                  </strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <i className="bi bi-table"></i> Example Total Prices
              </Card.Title>
              <p className="text-muted">
                Below are example total prices based on your price per image:
              </p>
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Number of Images</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10</td>
                    <td>${(10 * pricePerImage).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>50</td>
                    <td>${(50 * pricePerImage).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>800</td>
                    <td>${(800 * pricePerImage).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Uploaded Files and Image Details */}
      <Row className="mb-3">
        {/* Image Details Section */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <i className="bi bi-info-circle"></i> Image Details
              </Card.Title>
              <Row className="mb-2">
                <Col xs={6} className="text-start text-nowrap">
                  <strong>Image Width:</strong>
                </Col>
                <Col className="text-start">{imageWidth || "N/A"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} className="text-start text-nowrap">
                  <strong>Image Height:</strong>
                </Col>
                <Col className="text-start">{imageHeight || "N/A"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} className="text-start text-nowrap">
                  <strong>Padding Top:</strong>
                </Col>
                <Col className="text-start">{currentPadding.top || "N/A"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} className="text-start text-nowrap">
                  <strong>Padding Bottom:</strong>
                </Col>
                <Col className="text-start">
                  {currentPadding.bottom || "N/A"}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} className="text-start text-nowrap">
                  <strong>Padding Sides:</strong>
                </Col>
                <Col className="text-start">
                  {currentPadding.sides || "N/A"}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} className="text-start text-nowrap">
                  <strong>Background:</strong>
                </Col>
                <Col className="text-start">
                  <div>
                    <strong>RGB:</strong> {colorState.rgb.r}, {colorState.rgb.g}
                    , {colorState.rgb.b}
                  </div>
                  <div>
                    <strong>CMYK:</strong> {colorState.cmyk.c},{" "}
                    {colorState.cmyk.m}, {colorState.cmyk.y},{" "}
                    {colorState.cmyk.k}
                  </div>
                  <div>
                    <strong>Hex:</strong> {colorState.backgroundColor}
                  </div>
                </Col>
              </Row>
              {imageType === "model" && (
                <Row className="mb-2">
                  <Col xs={6} className="text-start text-nowrap">
                    <strong>Cropping:</strong>
                  </Col>
                  <Col className="text-start">
                    {selectedCroppingOption || "N/A"}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Uploaded Files Section */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <i className="bi bi-upload"></i> Uploaded Files
              </Card.Title>
              <input
                type="file"
                id="fileUpload"
                className="form-control mb-3"
                multiple
                onChange={handleFileUpload}
              />
              <ul className="list-unstyled">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="d-flex align-items-center mb-2">
                    <i className="bi bi-file-earmark me-2"></i>
                    <span className="text-nowrap">
                      {file.name.length > 28
                        ? `${file.name.slice(0, 23)}...${file.name.slice(-5)}`
                        : file.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FinalizeOrderStep;
