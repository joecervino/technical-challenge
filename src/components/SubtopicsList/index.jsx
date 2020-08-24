import React from 'react';
import Subtopic from "../Subtopic/index.jsx";



const SubtopicsList = ({
    parentUuid,
    subtopics, 
    onSubtopicTextChange,
    onDeleteSubtopic,
    onSubtopicCompleteClick,
}) => {
    if (!subtopics.length) return null

    return (<>
        {subtopics.map((subtopic) => (
            <Subtopic
                key={subtopic.uuid}
                parentUuid={parentUuid}
                subtopic={subtopic}
                onSubtopicTextChange={onSubtopicTextChange}
                onDeleteSubtopic={onDeleteSubtopic}
                onSubtopicCompleteClick={onSubtopicCompleteClick}
            />
        ))}
    </>)
}



export default SubtopicsList;