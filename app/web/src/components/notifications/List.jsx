import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from "date-fns"
const List = ({ notifcation }) => {

    let [allUpdates, setAllUpdates] = useState([]);
    useEffect(() => {
        if (notifcation) {
            setAllUpdates((prev) => [
                ...prev,
                ...notifcation,
            ]);
        }
    }, [notifcation])

    return (
        <>
            {
                allUpdates.length > 0 ? (


                    <>
                        {allUpdates.map((noti) => (
                            <li className="dropdown-item">
                                <div className='d-flex '>
                                    <div className='pe-2'>
                                        <img className='small-img' src={`${import.meta.env.VITE_SERVER_MAIN_URL}author/${noti?.profile_img}`} alt={noti.name} />
                                    </div>
                                    <div className='w-100 '>
                                        <div className='d-flex justify-content-between mb-1'>
                                            <strong style={{ width: "100px" }}>{noti.name}</strong>
                                            <span className='noti-time'>

                                                {
                                                    formatDistanceToNow(
                                                        new Date(noti.created_at),
                                                        { addSuffix: true }
                                                    )
                                                }
                                            </span>
                                        </div>
                                        <p>{noti.message}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </>
                ) : (
                    <li className="no-records text-center mt-5">
                        No notifications
                    </li>
                )
            }
        </>
    )
}

export default List
