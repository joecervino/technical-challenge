import React from 'react';
import { render, fireEvent, cleanup, screen, act } from '@testing-library/react';
import Subtopic from './index.jsx';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);



describe('Subtopic', () => {
    const mockParentUuid = '1234'
    const mockOnSubtopicTextChange = jest.fn()
    const mockOnDeleteSubtopic = jest.fn()
    const mockOnSubtopicCompleteClick = jest.fn()
    const mockSubtopic = {
        text: '',
        uuid: 'ABCD',
        complete: false,
    }

    afterEach(cleanup)  

    it('should pass base accessability standards', async () => {
        const { container } = render(
            <Subtopic
                parentUuid={mockParentUuid}
                subtopic={mockSubtopic}
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
            <Subtopic
                parentUuid={mockParentUuid}
                subtopic={mockSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
      
      
        expect(getByTestId('subtopic-container')).toBeTruthy()
    })

    it('should call onSubtopicTextChange on text input change', async () => {
        render(
            <Subtopic
                parentUuid={mockParentUuid}
                subtopic={mockSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
      
        await act(async () => {
            fireEvent.change(screen.getByTestId('subtopic-text-input'), { target: { value: 'test' }})
        })
      
        expect(mockOnSubtopicTextChange).toHaveBeenCalledTimes(1)
    })

    it('should call onSubtopicCompleteClick on complete button click', () => {
        render(
            <Subtopic
                parentUuid={mockParentUuid}
                subtopic={mockSubtopic}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
      
        fireEvent.click(screen.getByTestId('topic-complete-button'), { button: 1 })
      
        expect(mockOnSubtopicCompleteClick).toHaveBeenCalledTimes(1)
    })
})