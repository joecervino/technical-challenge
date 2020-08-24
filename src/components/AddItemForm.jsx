import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { BsPlus } from 'react-icons/bs';

const AddItemButton = ({ 
  newItemText,
  onAddItem, 
  setNewItemText,
}) => (
  <InputGroup className="align-items-center">
    <FormControl
      value={newItemText}
      placeholder="Add a topic to discuss..."
      aria-label="Add a topic to discuss"
      onChange={(e) => setNewItemText(e.target.value)}
    />
    <InputGroup.Append>
      <Button onClick={() => {
          onAddItem()
          setNewItemText('')
        }}
      >
        <BsPlus/>
      </Button>
    </InputGroup.Append>
  </InputGroup>

);

export default AddItemButton;
