import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

const Home = () => {
    const user = useSelector(state => state?.auth?.login?.currentUser?.user?.name)
    const [test, setTest] = useState(user === null || user === undefined ? "xxx" : user)
    console.log(test);
    console.log('====================================');
    return (
        <div>
            {/* {
                !user === null ? (<div>{user}</div>) : (<div>{"chưa có"}</div>)
            } */}
        </div>

    )
}

export default Home