import React from 'react'
import { Link } from 'react-router-dom'
import AppUrl from "../routes/routes";
import { Main_Header } from '@/components';
const Home = () => {
    return (
        <>
            <Main_Header />
            <div>
                <h1>This is index pages for users / admin  / author</h1>
            </div>
        </>
    )
}

export default Home