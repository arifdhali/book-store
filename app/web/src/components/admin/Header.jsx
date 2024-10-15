import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header p-4 rounded-2 border-1 d-flex justify-content-end align-items-center gap-3'>
            <div>
                <Link to={'/admin/settings'}>
                    <FontAwesomeIcon icon={faGear} className='fs-5 bg-dark p-2 rounded-circle text-white' />
                </Link>
            </div>

            <div class="btn-group">
                <span class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img className='rounded-circle' style={{ width: "50px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" alt="" />
                </span>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">My profile</a></li>
                    <li><a class="dropdown-item" href="#">Menu item</a></li>
                    <li><a class="dropdown-item" href="#">Menu item</a></li>
                </ul>
            </div>


        </div>
    );
}

export default Header;
