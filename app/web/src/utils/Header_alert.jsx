import React from 'react'

const Header_alert = ({ userrole }) => {
    return (
        <div className='mb-4'>
            <div>
                <h2 className='text-decoration-underline'>Login info of {userrole} </h2>
                <p><b>email:</b> admin1@gmail.com</p>
                <p><b>password:</b>admin1</p>
            </div>
        </div>
    )
}

export default Header_alert
