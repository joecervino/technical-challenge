import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"



const MenuDropdown = ({ 
    uuid, 
    options 
}) => {
    const menuOptions = Object.entries(options).map((optionEntry) => {
        const key = optionEntry[0]
        const config = optionEntry[1]

        switch(key) {
            case 'delete':
                return (<Dropdown.Item key={`${uuid}-delete`} onClick={config.onClick}>Delete</Dropdown.Item>)
            default:
                return null
        }
    })

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => {
        return (
            <Button 
                ref={ref} 
                size="sm" 
                variant="outline-danger" 
                style={{ borderRadius: '0px .2rem .2rem 0px' }}
                onClick={onClick}
            >
                <BsThreeDotsVertical />
                {children}
            </Button>
        )
    })
    
    return (
        <Dropdown size="sm">
            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
            <Dropdown.Menu>
                {menuOptions}
            </Dropdown.Menu>
        </Dropdown>
    )
};



export default MenuDropdown