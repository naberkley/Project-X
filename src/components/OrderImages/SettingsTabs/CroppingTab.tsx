import React from "react";
import { Form } from "react-bootstrap";

interface CroppingTabProps {
  selectedCroppingOption: string;
  setSelectedCroppingOption: (value: string) => void;
}

const CroppingTab: React.FC<CroppingTabProps> = ({
  selectedCroppingOption,
  setSelectedCroppingOption,
}) => {
  const handleChange = (value: string) => {
    setSelectedCroppingOption(value);
  };

  return (
    <>
      <Form>
        <Form.Group controlId="croppingOptions" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              margin: "0 auto",
              width: "fit-content",
            }}
          >
            {/* Option 1: Recognizable */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Form.Check
                type="radio"
                id="crop-recognizable"
                name="croppingOption"
                value="Recognizable"
                checked={selectedCroppingOption === "Recognizable"}
                onChange={(e) => handleChange(e.target.value)}
              />
              <label htmlFor="crop-recognizable" style={{ margin: 0 }}>
                Recognizable
              </label>
            </div>

            {/* Option 2: Nose Bridge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Form.Check
                type="radio"
                id="crop-noseBridge"
                name="croppingOption"
                value="Nose Bridge"
                checked={selectedCroppingOption === "Nose Bridge"}
                onChange={(e) => handleChange(e.target.value)}
              />
              <label htmlFor="crop-noseBridge" style={{ margin: 0 }}>
                Nose Bridge
              </label>
            </div>

            {/* Option 3: Mustache */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Form.Check
                type="radio"
                id="crop-mustache"
                name="croppingOption"
                value="Mustache"
                checked={selectedCroppingOption === "Mustache"}
                onChange={(e) => handleChange(e.target.value)}
              />
              <label htmlFor="crop-mustache" style={{ margin: 0 }}>
                Mustache
              </label>
            </div>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

export default CroppingTab;
