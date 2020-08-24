import React from 'react';
import { render, fireEvent, screen, cleanup, act } from '@testing-library/react';
import MenuDropdown from './index.jsx';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);



describe('MenuDropdown', () => {
    const uuid = '1234'
    const onDeleteClick = jest.fn()
    const mockOptions = {
        delete: {
            onClick: onDeleteClick
        }
    }

    afterEach(cleanup)  

    it('should pass base accessability standards', async () => {
        const { container } = render(
            <MenuDropdown
                uuid={uuid}
                options={mockOptions}
            />
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it('should render clickable a dropdown toggle', () => {
        render(
          <MenuDropdown
            uuid={uuid}
            options={mockOptions}
          />
        )
      
        expect(screen.getByTestId("dropdown-toggle")).toBeTruthy()
    })

    it('should render a dropdown menu onClick', async () => {
        const { getByTestId } = (
            render(
                <MenuDropdown
                    uuid={uuid}
                    options={mockOptions}
                />
            )
        )

        await act(async () => {
            fireEvent.click(getByTestId('dropdown-toggle'), { button: 1 })
        })

        expect(getByTestId('dropdown-toggle')).toBeTruthy()
    })

    it('should render a delete option', async () => {
        const { getByTestId } = (
            render(
                <MenuDropdown
                    uuid={uuid}
                    options={mockOptions}
                />
            )
        )

        await act(async () => {
            fireEvent.click(getByTestId('dropdown-toggle'), { button: 1 })
        })

        expect(screen.getByTestId('delete-dropdown-option')).toBeTruthy()
    })

    it('should not render options if no supported options are passed', async () => {
        const { getByTestId } = (
            render(
                <MenuDropdown
                    uuid={uuid}
                    options={{}}
                />
            )
        )

        await act(async () => {
            fireEvent.click(getByTestId('dropdown-toggle'), { button: 1 })
        })

        expect(getByTestId('dropdown-menu').children.length).toBeFalsy()
    })
})