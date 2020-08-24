import React from 'react'
import { render, fireEvent, screen, cleanup, act } from '../utilities/test-utils'
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect'
import App from '../containers/App'
expect.extend(toHaveNoViolations)



describe('App - Integration Test', () => {
  const getAppWrapper = () => render(<App />)
  let app;

  beforeEach(() => {
    // arrange
    app = getAppWrapper()
  })

  afterEach(cleanup)

  it('should pass base accessability standards', async () => {
      const { container } = app
      const results = await axe(container, { 
        rules: {
          'aria-allowed-role': { enabled: false }
        }
      })

      expect(results).toHaveNoViolations()
  })

  it('should render without crashing', async () => {
    expect(screen.getByTestId('app-container')).toBeTruthy()
  })

  it('should render the connected app with initialState', () => {
    expect(screen.getAllByTestId('topic-container').length).toBeTruthy()
  })

  it('should add a topic item to the Incomplete tab when the add item button is clicked', async () => {
      const previousCount = screen.getAllByTestId('topic-container').length
      const addItemButton = screen.getByTestId('add-item-button')
      
      fireEvent.click(addItemButton, { button: 0 })

      expect(screen.getAllByTestId('topic-container').length).toEqual(previousCount + 1)
  })
  
  it("should add a subtopic to a listed item when a topic's add subtopic button is clicked", () => {
      const previousCount = screen.getAllByTestId('subtopic-text-input').length
      const addSubtopicButtonNode = screen.getAllByTestId('topic-subtopic-button')[0]

      fireEvent.click(addSubtopicButtonNode, { button: 0 })
      
      expect(screen.getAllByTestId('subtopic-text-input').length).toEqual(previousCount + 1)
  })
})
