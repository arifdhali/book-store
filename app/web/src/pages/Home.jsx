import React from 'react'
import { Link } from 'react-router-dom'
import AppUrl from "../routes/routes";
import { Main_Header } from '@/components';
import "@/style/style.css";
const Home = () => {
    return (
        <>
            <Main_Header />
            <div>
                <h1>Home page</h1>
            </div>
        </>
    )
}

export default Home