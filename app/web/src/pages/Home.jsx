import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Main_Header } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faCartFlatbed, faCartPlus, faChevronCircleDown, faChevronDown, faEye } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
    const scrollBtm = useRef();
    const handelScroll = () => {
        // let scrollHeight = document.documentElement.scrollHeight / 2;
        // window.scrollTo({
        //     top: scrollHeight,
        //     behavior: "smooth"
        // })
    }
    useGSAP(() => {
        gsap.from(".word", {
            y: 10,
            opacity: 0,
            stagger: {
                each: .2,
                ease: "none",
            },
        })
    })


    return (
        <>
            <section className='banner uni-padding'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner-content">
                                <h1 className='d-flex flex-wrap'>
                                    {
                                        "Buy and sell your textbooks for the best price".split(" ").map((word, index) => (
                                            <span className='word' key={index}>{word}&nbsp;</span>
                                        ))
                                    }
                                </h1>
                                <div className=''>
                                    <div className='my-4'>
                                        <p className='text-gray'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus perferendis possimus maiores animi nisi ipsum!</p>
                                    </div>
                                    <div className='banner-search'>
                                        <form>
                                            <div className='position-relative'>
                                                <input placeholder='Search Book or Author name' className='form-control rounded-1' type="text" />
                                                <button className='position-absolute rounded-1' type='submit'>Search</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='banner-slider'>
                                <Swiper
                                    modules={[EffectCreative, Autoplay]}
                                    className="mySwiper"
                                    effect={'creative'}
                                    autoplay={{ delay: 3000 }}
                                    loop={true}
                                    speed={1000}
                                    noSwiping={true}
                                    noSwipingClass='swiper-slide'
                                    creativeEffect={{
                                        prev: {
                                            translate: ["-10%", 0, 0],
                                            opacity: 0,
                                        },
                                        next: {
                                            translate: ["20%", 0, 0],
                                            opacity: 0,

                                        },
                                    }}

                                >
                                    {
                                        [0, 0, 0, 0].map((slide, index) => (
                                            <SwiperSlide key={index}>
                                                <div className='slider-items'>
                                                    <img className='img-fluid' src="https://images.pexels.com/photos/30309178/pexels-photo-30309178/free-photo-of-vibrant-parrot-perched-on-a-balcony-railing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                                </div>
                                                <div className='item-information pt-3'>
                                                    <strong>Lorem, ipsum.</strong>
                                                    <p>Lorem, ipsum dolor.</p>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={handelScroll} ref={scrollBtm} className='down-arrow text-center position-absolute translate-middle-x rounded-5 d-flex align-items-center justify-content-center' role='button'>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </section>

            <section className='best-books uni-padding'>
                <div className="container">
                    <div className="text-center">
                        <h2 className='heading d-flex justify-content-center'>
                            {
                                "Best Sellers Books".split(" ").map((word, index) => (
                                    <span className='word' key={index}>{word}&nbsp;</span>
                                ))
                            }
                        </h2>
                    </div>
                    <div className='row pt-3 mt-5'>
                        {
                            [0, 0, 0, 0].map((book, index) => (
                                <div className="col-md-3" key={index}>
                                    <div className="card">
                                        <div className='m-1 position-relative card-imgs rounded-1'>
                                            <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMV9jdXRlXzNkX2lsbHVzdHJhdGlvbl9vZl9hX3N0YWNrX29mX2Jvb2tzX2lzb2xhdF81MjhhNmU5Ni0zZjllLTRlOGQtYmEyNy1lZGU3OWU0NTg0YTAucG5n.png" className="rounded-1 card-img-top img-fluid" alt="" />

                                            <div className="discount position-absolute top-0 bg-white rounded-1">
                                                <p>10% Off</p>
                                            </div>

                                            <div className='d-flex gap-2 on-hover position-absolute  w-100 h-100 align-items-center justify-content-center'>
                                                <FontAwesomeIcon icon={faEye} className='rounded-1' />
                                                <FontAwesomeIcon icon={faCartFlatbed} className='rounded-1' />
                                            </div>
                                        </div>
                                        <div className="card-body py-4 px-3">
                                            <div className='d-flex justify-content-between'>
                                                <h5 className="card-title">Lorem, ipsum.</h5>
                                                <p className='item-price'>$40.00</p>
                                            </div>
                                            <p className="author-name">David william</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section >

            <section className='find-your-books uni-padding'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className='d-flex flex-wrap gap-5'>
                                {[0, 0, 0, 0].map((img, index) => (
                                    <img key={index} className='book-img rounded-1 img-fluid ' src="https://grimoakpress.com/cdn/shop/files/cover-notw-fc.jpg?v=1706902909" alt="" />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div style={{ maxWidth: "600px" }}>
                                <div>
                                    <h2 className='heading '>Find Your Favourite Books Here</h2>
                                    <p className='text-gray'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, cumque! Beatae vero recusandae est enim quo nostrum autem ex vitae.</p>
                                </div>

                                <div className='d-flex gap-5 my-5'>
                                    <div className='text-center'>
                                        <h2 className='heading'>70</h2>
                                        <p className='text-gray'>Recently Published</p>
                                    </div>
                                    <div className='text-center'>
                                        <h2 className='heading'>70</h2>
                                        <p className='text-gray'>Active Coupons</p>
                                    </div>
                                    <div className='text-center'>
                                        <h2 className='heading'>70</h2>
                                        <p className='text-gray'>Total Authors</p>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <button className='btn btn-primary'>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home