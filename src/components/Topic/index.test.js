import React from 'react'
import { render, fireEvent, cleanup, act, screen } from '@testing-library/react'
import Topic from './index.jsx'
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);



describe('Topic', () => {
    const mockOnCompleteClick = jest.fn()
    const mockOnItemTextChange = jest.fn()
    const mockOnDeleteClick = jest.fn()
    const mockOnAddSubtopic = jest.fn()
    const mockOnSubtopicTextChange = jest.fn()
    const mockOnDeleteSubtopic = jest.fn()
    const mockOnSubtopicCompleteClick = jest.fn()
    const mockTopic = {
        text: '1',
        uuid: '1234',
        complete: false,
        subtopics: []
    }

    afterEach(cleanup)  
    
    it('should pass base accessability standards', async () => {
        const { container } = render(
            <Topic
                topic={mockTopic}
                onCompleteClick={mockOnCompleteClick}
                onItemTextChange={mockOnItemTextChange}
                onDeleteClick={mockOnDeleteClick}
                onAddSubtopic={mockOnAddSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
        const results = await axe(container)
    
        expect(results).toHaveNoViolations()
    })

    it('should render without crashing', () => {
        const { getByTestId } = render(
            <Topic
                topic={mockTopic}
                onCompleteClick={mockOnCompleteClick}
                onItemTextChange={mockOnItemTextChange}
                onDeleteClick={mockOnDeleteClick}
                onAddSubtopic={mockOnAddSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
    
        expect(getByTestId('topic-container')).toBeTruthy()
    })

    it('should call onItemTextChange on text input change', async () => {
        render(
            <Topic
                topic={mockTopic}
                onCompleteClick={mockOnCompleteClick}
                onItemTextChange={mockOnItemTextChange}
                onDeleteClick={mockOnDeleteClick}
                onAddSubtopic={mockOnAddSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )

        await act(async () => {
            fireEvent.change(screen.getByTestId('form-control'), { target: { value: 'test' } })
        })

        expect(mockOnItemTextChange).toHaveBeenCalledTimes(1)
    })

    it('should call onCompleteClick on complete button click', async () => {
        render(
            <Topic
                topic={mockTopic}
                onCompleteClick={mockOnCompleteClick}
                onItemTextChange={mockOnItemTextChange}
                onDeleteClick={mockOnDeleteClick}
                onAddSubtopic={mockOnAddSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )

        await act(async () => {
            // console.log(screen.getByTestId("topic-complete-button"))
            fireEvent.click(screen.getByTestId('topic-complete-button'), { button: 1 })
        })

        expect(mockOnCompleteClick).toHaveBeenCalledTimes(1)
    })

    it('should call onAddSubtopic on subtopic button click', async () => {
        render(
            <Topic
                topic={mockTopic}
                onCompleteClick={mockOnCompleteClick}
                onItemTextChange={mockOnItemTextChange}
                onDeleteClick={mockOnDeleteClick}
                onAddSubtopic={mockOnAddSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )

        await act(async () => {
            fireEvent.click(screen.getByTestId('topic-subtopic-button'), { button: 1 })
        })

        expect(mockOnAddSubtopic).toHaveBeenCalledTimes(1)
    })
})