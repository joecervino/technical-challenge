import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../styles/App.css';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TopicsList from '../components/TopicsList.jsx';
import AddItemForm from '../components/AddItemForm.jsx';
import Logo from '../static/white-logo.png';
import { addItem, updateItem, deleteItem, addSubItem, updateSubItem } from '../actions/items.js';



const App = () => {
  const [newItemText, setNewItemText] = useState('');
  const { items } = useSelector(state => state);
  const dispatch = useDispatch();

  const onAddItem = () => dispatch(addItem(newItemText));
  const onCompleteClick = (uuid, complete) => dispatch(updateItem(uuid, { complete }));
  const onItemTextChange = (uuid, text) => dispatch(updateItem(uuid, { text }));
  const onDeleteClick = (uuid) => dispatch(deleteItem(uuid));
  const onAddSubtopic = (parentUuid) => dispatch(addSubItem(parentUuid));
  const onSubtopicCompleteClick = (parentUuid, uuid, complete) => dispatch(updateSubItem(parentUuid, uuid, { complete }));
  const onSubtopicTextChange = (parentUuid, uuid, text) => dispatch(updateSubItem(parentUuid, uuid, { text }));
  const onDeleteSubtopic = (uuid, parentUuid) => dispatch(deleteItem(uuid, parentUuid));

  return (
    <div className="App">
      <img src={Logo} alt="WorkPatterns" className="Logo" />
      <Container className="bg-white px-4 py-3 mb-3 rounded shadow-lg">
        <AddItemForm 
          newItemText={newItemText}
          setNewItemText={setNewItemText}
          onAddItem={onAddItem}
        />
      </Container>

      <Container className="bg-white px-4 py-3 rounded shadow-lg">
        <Tabs defaultActiveKey="complete" id="discussion-tabs">
          <Tab eventKey="complete" title="Complete">
            <TopicsList
              topics={items.filter((item) => !item.complete)}
              onCompleteClick={onCompleteClick}
              onItemTextChange={onItemTextChange}
              onDeleteClick={onDeleteClick}
              onAddSubtopic={onAddSubtopic}
              onSubtopicCompleteClick={onSubtopicCompleteClick}
              onSubtopicTextChange={onSubtopicTextChange}
              onDeleteSubtopic={onDeleteSubtopic}
            />
          </Tab>
          <Tab eventKey="incomplete" title="Incomplete">
            <TopicsList 
              topics={items.filter((item) => item.complete)}
              onCompleteClick={onCompleteClick} 
              onItemTextChange={onItemTextChange}
              onDeleteClick={onDeleteClick}
              onAddSubtopic={onAddSubtopic}
              onSubtopicCompleteClick={onSubtopicCompleteClick}
              onSubtopicTextChange={onSubtopicTextChange}
              onDeleteSubtopic={onDeleteSubtopic}
            />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}



export default App;