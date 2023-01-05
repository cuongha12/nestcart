import React from 'react'
import '../css/nav.css'
import { NavLink } from 'react-router-dom'
const Nav = () => {

    return (
        <>
            <ul>
                <li>
                    <NavLink to={'/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                        Trang chủ
                    </NavLink>

                </li>
                <li>
                    <NavLink to={'/about'} className={({ isActive }) => (isActive ? 'active' : '')}>
                        About
                    </NavLink>    
                </li>
            </ul>
        </>
    )
}

export default Nav