import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsCheck, BsChat } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SubtopicsList from '../SubtopicsList/index.jsx'
import MenuDropdown from '../MenuDropdown/index.jsx'



const Topic = ({ 
  topic,
  onCompleteClick,
  onItemTextChange,
  onDeleteClick,
  onAddSubtopic,
  onSubtopicTextChange,
  onDeleteSubtopic,
  onSubtopicCompleteClick,
}) => {
  if (!topic) return null
  
  const options = { delete: { onClick: () => onDeleteClick(topic.uuid) } }
  
  return (
    <Col data-testid="topic-container">
      <Row className="mt-3 bg-white">
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Enter text here"
            aria-label="form-control"
            data-testid="form-control"
            value={topic.text}
            onChange={(e) => onItemTextChange(topic.uuid, e.target.value)}
          />
        </Col>
        <Col md="auto">
          <ButtonGroup>
            <Button
              onClick={() => onCompleteClick(topic.uuid, !topic.complete)}
              variant={topic.complete ? "success" : "outline-secondary"}
              size="sm"
              data-testid="topic-complete-button"
              aria-label="topic-complete-button"
            >
              <BsCheck />
            </Button>
            <Button
              onClick={() => onAddSubtopic(topic.uuid)}
              variant="outline-warning"
              size="sm"
              data-testid="topic-subtopic-button"
              aria-label="topic-subtopic-button"
            >
              <BsChat />
            </Button>
            <MenuDropdown uuid={topic.uuid} options={options} />
          </ButtonGroup>
        </Col>
      </Row>
      <SubtopicsList
        parentUuid={topic.uuid}
        subtopics={topic.subtopics}
        onDeleteClick={onDeleteClick}
        onSubtopicTextChange={onSubtopicTextChange}
        onDeleteSubtopic={onDeleteSubtopic}
        onSubtopicCompleteClick={onSubtopicCompleteClick}
      />
    </Col>
)};



export default Topic;