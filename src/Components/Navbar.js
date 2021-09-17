import React, { useContext } from 'react'
import NavLink from './NavLink'
import styled from 'styled-components'
import UserContext from '../Contexts/User/UserContext'
const Navbar = () => {
    const NavbarContainer = styled.div`
        height: 50px;
        background-color: #ffe268;
        display: flex;
        flex-direction: row;
        border: none;
        padding: 10px;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
    `
    const NavItemContainer = styled.div`
        backgroud-Color: rgb(55,58,64);
        text-align: center;
        margin: auto;
        font-size: xx-large;
    
    `

    const user = useContext(UserContext)

    return (
        user._id  ?
        <NavbarContainer>
            
            <NavItemContainer>
                <NavLink target='/home' text='Home'></NavLink>
            </NavItemContainer>
            <NavItemContainer>
                <NavLink target='/profile' text='Profile'></NavLink>
            </NavItemContainer>
            <NavItemContainer>
                <NavLink target='/search' text='Search'></NavLink>
            </NavItemContainer>
            {
                user.name ?
                <NavItemContainer>
                    <NavLink target='/loginOrRegister' text={`Welcome ${user.name}`} />
                </NavItemContainer> :
                
                <NavItemContainer>
                    <NavLink target='/loginOrRegister' text='SignIn/SignUp'></NavLink>
                </NavItemContainer>
            }
        </NavbarContainer> :

        <NavbarContainer>
            <NavItemContainer>
                <NavLink target='/loginOrRegister' text='SignIn/SignUp'></NavLink>
            </NavItemContainer>
        </NavbarContainer>
    )
}

export default Navbar;