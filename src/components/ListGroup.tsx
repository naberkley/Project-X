import React from "react";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function CustomListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items</p>}
      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item
            active={selectedIndex === index}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default CustomListGroup;
