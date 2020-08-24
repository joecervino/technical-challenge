import React from "react"
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { BsCheck, BsArrowReturnRight } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MenuDropdown from "../MenuDropdown/index.jsx"



const Subtopic = ({
    parentUuid,
    subtopic,
    onSubtopicTextChange,
    onDeleteSubtopic,
    onSubtopicCompleteClick
}) => {
    const options = { delete: { onClick: () => onDeleteSubtopic(subtopic.uuid, parentUuid, !subtopic.complete) } }

    return (
        <Row className="mt-2 pl-6" key={subtopic.uuid} data-testid="subtopic-container">
            <Col md="auto" className="pr-0">
                <BsArrowReturnRight style={{ width: 32 }} />
            </Col>
            <Col className="pl-1">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text here"
                    aria-label="subtopic-text-input"
                    data-testid="subtopic-text-input"
                    value={subtopic.text}
                    onChange={(e) => onSubtopicTextChange(parentUuid, subtopic.uuid, e.target.value)}
                />
            </Col>
            <Col md="auto">
                <ButtonGroup>
                    <div style={{ width: 32 }} />
                    <Button
                        onClick={() => onSubtopicCompleteClick(parentUuid, subtopic.uuid, !subtopic.complete)}
                        variant={subtopic.complete ? "success" : "outline-secondary"}
                        style={{ borderRadius: '.2rem 0px 0px .2rem' }}
                        size="sm"
                        data-testid="topic-complete-button"
                        aria-label="topic-complete-button"
                    >
                        <BsCheck />
                    </Button>
                    <MenuDropdown uuid={subtopic.uuid} options={options} />
                </ButtonGroup>
            </Col>
        </Row>
    )
}


export default Subtopic;