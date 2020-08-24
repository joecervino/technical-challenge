import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import sortBy from 'lodash/sortBy'

import '../styles/App.css';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TopicsList from '../components/TopicsList/index.jsx';
import AddItemForm from '../components/AddItemForm/index.jsx';
import Logo from '../static/white-logo.png';
import { addItem, updateItem, deleteItem, addSubItem, updateSubItem } from '../actions/items.js';



const App = () => {
  const [newItemText, setNewItemText] = useState('');
  const { items } = useSelector(state => state);
  const dispatch = useDispatch();

  const onAddItem = () => dispatch(addItem(newItemText));
  const onCompleteClick = (uuid, complete) => dispatch(updateItem(uuid, { complete, completionTime: complete ? new Date().getTime() : 0 }));
  const onItemTextChange = (uuid, text) => dispatch(updateItem(uuid, { text }));
  const onDeleteClick = (uuid) => dispatch(deleteItem(uuid));
  const onAddSubtopic = (parentUuid) => dispatch(addSubItem(parentUuid));
  const onSubtopicCompleteClick = (parentUuid, uuid, complete) => dispatch(updateSubItem(parentUuid, uuid, { complete }));
  const onSubtopicTextChange = (parentUuid, uuid, text) => dispatch(updateSubItem(parentUuid, uuid, { text }));
  const onDeleteSubtopic = (uuid, parentUuid) => dispatch(deleteItem(uuid, parentUuid));

  return (
    <div 
      className="App" 
      aria-label="app-container" 
      data-testid="app-container"
    >
      <img 
        src={Logo} 
        alt="WorkPatterns" 
        className="Logo"
        data-testid="WorkPatterns-logo"
      />
      <Container className="bg-white px-4 py-3 mb-3 rounded shadow-lg">
        <AddItemForm 
          newItemText={newItemText}
          setNewItemText={setNewItemText}
          onAddItem={onAddItem}
        />
      </Container>

      <Container className="bg-white px-4 py-3 rounded shadow-lg">
        <Tabs defaultActiveKey="incomplete" id="discussion-tabs" aria-label="discussion-tabs">
          <Tab eventKey="incomplete" title="Incomplete" aria-label="incomplete-tab">
            <TopicsList
              topics={sortBy(items.filter((item) => !item.complete), ['completionTime'])}
              onCompleteClick={onCompleteClick}
              onItemTextChange={onItemTextChange}
              onDeleteClick={onDeleteClick}
              onAddSubtopic={onAddSubtopic}
              onSubtopicCompleteClick={onSubtopicCompleteClick}
              onSubtopicTextChange={onSubtopicTextChange}
              onDeleteSubtopic={onDeleteSubtopic}
            />
          </Tab>
          <Tab eventKey="complete" title="Complete" aria-label="complete-tab">
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