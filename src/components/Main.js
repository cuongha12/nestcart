import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './NavRouter'

const Main = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default Main