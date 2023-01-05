import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    // const user = useSelector(state => state.user)
    let navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : ''
    useEffect(() => {
    }, [user,navigate])
    return (
        <div>
            {user ? (<div>{user.name}</div>) : (<div>{'chua co'}</div>)}
        </div>

    )
}

export default Home