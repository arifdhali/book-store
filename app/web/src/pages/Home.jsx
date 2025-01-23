import React from 'react'
import { Main_Header } from '@/components';
const Home = () => {
    return (
        <>
            <Main_Header />
            <section className='banner'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner-content">
                                <h1>Buy and sell your
                                    textbooks for the best price</h1>
                                <div className='my-3'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus perferendis possimus maiores animi nisi ipsum!</p>
                                    <div className='mt-3'>
                                        <input className='form-control' type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home