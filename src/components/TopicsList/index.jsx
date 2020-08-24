import React from 'react';
import Topic from '../Topic/index.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const TopicsList = ({ 
  topics,
  onCompleteClick,
  onItemTextChange,
  onDeleteClick,
  onAddSubtopic,
  onSubtopicTextChange,
  onDeleteSubtopic,
  onSubtopicCompleteClick,
}) => {
  return (<>
    {topics.length === 0 && (
      <Row className="p-4 text-center" aria-label="no-topics-message">
        <Col className="text-muted">
          You don't have any discussion topics yet
        </Col>
      </Row>
    )}
    {topics.map((topic, i) => (
      <Topic
        aria-label="topic-item"
        key={topic.uuid}
        topic={topic}
        onCompleteClick={onCompleteClick}
        onDeleteClick={onDeleteClick}
        onItemTextChange={onItemTextChange}
        onAddSubtopic={onAddSubtopic}
        onSubtopicTextChange={onSubtopicTextChange}
        onDeleteSubtopic={onDeleteSubtopic}
        onSubtopicCompleteClick={onSubtopicCompleteClick}
      />
    ))}
  </>);
};



export default TopicsList;