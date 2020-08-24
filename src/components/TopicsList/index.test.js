import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import TopicsList from './index.jsx'
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);



describe('TopicsList', () => {
    const mockOnItemTextChange = jest.fn()
    const mockOnDeleteClick = jest.fn()
    const mockOnCompleteClick = jest.fn()
    const mockOnSubtopicTextChange = jest.fn()
    const mockOnDeleteSubtopic = jest.fn()
    const mockOnSubtopicCompleteClick = jest.fn()
    const mockTopics = [
        {
            text: '1',
            uuid: '1234',
            completionTime: 0,
            complete: false,
            subtopics: []
        },
        {
            text: '2',
            uuid: '5678',
            completionTime: 0,
            complete: true,
            subtopics: []
        }
    ]

    afterEach(cleanup)  

    it('should pass base accessability standards', async () => {
        const { container } = render(
            <TopicsList
                topics={mockTopics}
                mockOnItemTextChange={mockOnItemTextChange}
                mockOnDeleteClick={mockOnDeleteClick}
                mockOnCompleteClick={mockOnCompleteClick}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it('should render without crashing', () => {
        const { queryAllByTestId } = render(
            <TopicsList
                topics={mockTopics}
                mockOnItemTextChange={mockOnItemTextChange}
                mockOnDeleteClick={mockOnDeleteClick}
                mockOnCompleteClick={mockOnCompleteClick}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
      
        expect(queryAllByTestId('topic-complete-button').length).toBeTruthy()
    })

    it('should render no UI components if no topics are present', () => {
        render(
            <TopicsList
                topics={[]}
                mockOnItemTextChange={mockOnItemTextChange}
                mockOnDeleteClick={mockOnDeleteClick}
                mockOnCompleteClick={mockOnCompleteClick}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )
      
        expect(screen.getByText("You don't have any discussion topics yet")).toBeTruthy()
    })

    it('should be capable of rendering multiple topics', () => {
        const { queryAllByTestId } = render(
            <TopicsList
                topics={mockTopics}
                mockOnItemTextChange={mockOnItemTextChange}
                mockOnDeleteClick={mockOnDeleteClick}
                mockOnCompleteClick={mockOnCompleteClick}
                onSubtopicTextChange={mockOnSubtopicTextChange}
                onDeleteSubtopic={mockOnDeleteSubtopic}
                onSubtopicCompleteClick={mockOnSubtopicCompleteClick}
            />
        )

        expect(queryAllByTestId('topic-complete-button').length).toBeTruthy()
    })
})