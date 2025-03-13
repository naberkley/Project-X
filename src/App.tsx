import ListGroup from "./components/ListGroup";
import CustomAlert from "./components/Alert";
import CustomButton from "./components/Button";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  let items = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      {alertVisible && (
        <CustomAlert onClose={() => setAlertVisibility(false)}>
          Select a city
        </CustomAlert>
      )}
      <CustomButton color="danger" onClick={() => setAlertVisibility(true)}>
        my button
      </CustomButton>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
