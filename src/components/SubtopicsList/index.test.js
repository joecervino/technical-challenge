import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import SubtopicsList from './index.jsx'
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);



describe('SubtopicList', () => {
    const mockParentUuid = '1234'
    const mockOnSubtopicTextChange = jest.fn()
    const mockOnDeleteSubtopic = jest.fn()
    const mockOnSubtopicCompleteClick = jest.fn()
    const mockSubtopics = [
        {
            text: '1',
            uuid: 'ABCD',
            complete: false,
        },
        {
            text: '2',
            uuid: 'EFGH',
            complete: true,
        }
    ]

    afterEach(cleanup)  

    it('should pass base accessability standards', async () => {
        const { container } = render(
            <SubtopicsList
                parentUuid={mockParentUuid}
                subtopics={mockSubtopics}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it('should render without crashing', () => {
        const { getAllByTestId } = render(
            <SubtopicsList
                parentUuid={mockParentUuid}
                subtopics={mockSubtopics}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
      
        expect(getAllByTestId('subtopic-container')).toBeTruthy()
    })

    it('should render no UI components if no subtopics are present', () => {
        const { queryAllByTestId } = render(
            <SubtopicsList
                parentUuid={mockParentUuid}
                subtopics={[]}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
      
        expect(queryAllByTestId('subtopic-container').length).toBeFalsy()
    })

    it('should be capable of rendering multiple subtopics', () => {
        const { queryAllByTestId } = render(
            <SubtopicsList
                parentUuid={mockParentUuid}
                subtopics={mockSubtopics}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )

        expect(queryAllByTestId('subtopic-container').length).toBeTruthy()
    })
})