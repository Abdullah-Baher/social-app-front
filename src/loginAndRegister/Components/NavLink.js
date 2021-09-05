import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = ({ target, text }) => {
    return (
        <Link style={{textDecoration: 'none'}} to={target}>{text}</Link>
    )
}

export default NavLink;