import React from 'react'
import { Link } from 'react-router-dom'
import AppUrl from "../routes/routes";

const Home = () => {
    return (
        <div>
            <h1>This is index pages for users / admin  / author</h1>
            <Link to={AppUrl.ADMIN.BASE}>Admin</Link>
        </div>
    )
}

export default Home