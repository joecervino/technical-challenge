import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { BsPlus } from 'react-icons/bs';



const AddItemForm = ({ 
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
      data-testid="add-item-input"
    />
    <InputGroup.Append>
      <Button 
        aria-label="add-item-button"
        data-testid="add-item-button"
        onClick={() => {
          onAddItem()
          setNewItemText('')
        }}
      >
        <BsPlus/>
      </Button>
    </InputGroup.Append>
  </InputGroup>

);



export default AddItemForm;