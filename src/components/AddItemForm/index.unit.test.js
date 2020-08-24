import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import AddItemForm from './index.jsx';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations)



describe('AddItemForm', () => {
    const mockOnAddItem = jest.fn()
    const mockSetNewItemText = jest.fn()
    let mockNewItemText = ''

    afterEach(cleanup)

    it('should pass base accessability standards', async () => {
        const { container } = render(
            <AddItemForm
                newItemText={mockNewItemText}
                onAddItem={mockOnAddItem}
                setNewItemText={mockSetNewItemText}
            />
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it('should call onAddItem if addItem button is clicked', () => {
        const { getByTestId } = render(
          <AddItemForm
            newItemText={mockNewItemText}
            onAddItem={mockOnAddItem}
            setNewItemText={mockSetNewItemText}
          />
        )
      
        fireEvent.click(getByTestId('add-item-button'), { button: 1 })
      
        expect(mockOnAddItem).toHaveBeenCalledTimes(1)
    })

    it('should call setNewItemText if form input value changes', () => {
        const { getByTestId, rerender } = render(
            <AddItemForm
                newItemText={mockNewItemText}
                onAddItem={mockOnAddItem}
                setNewItemText={mockSetNewItemText}
            />
        )
      
        fireEvent.focusIn(getByTestId('add-item-input'))
        fireEvent.keyDown(getByTestId('add-item-input'), { charCode: 65 })

        rerender(          
            <AddItemForm
                newItemText={mockNewItemText}
                onAddItem={mockOnAddItem}
                setNewItemText={mockSetNewItemText}
            />
        )
      
        expect(mockSetNewItemText).toHaveBeenCalledTimes(1)
    })
})