import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import AppRoute from "../../../routes/routes"
import AppRoute from "@/routes/routes"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ConfirmModal from "@/utils/ConfirmModal";



const Category = () => {
    const [Catgories, setCatgories] = useState([]);
    const [ModalInfo, setModalInfo] = useState({
        type: "",
        api_url: "",
        id: "",
        page_target: {

        },
    })


    const getCategories = () => {
        axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.ADMIN.CATEGORY.LIST}`)
            .then((response) => {
                console.log(response);
                setCatgories(response.data?.result)
            }).catch((error) => {
                console.log(error)
            })

    }
    useEffect(() => {
        getCategories()
    }, []);

    return (
        <>

            <div className='p-4 bg-white rounded-2'>
                <div className='d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom'>
                    <h4 className='section-title m-0'>
                        Category Lists
                    </h4>
                    <div>
                        <Link to={`${AppRoute.ADMIN.CATEGORY.ADD}`} className="btn btn-primary align-content-center">Add Category</Link>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>no</th>
                            <th style={{ width: "20%" }}>name</th>
                            <th style={{ width: "40%" }}>Description</th>
                            <th className='text-center' style={{ width: "15%" }}>No of Book</th>
                            <th style={{ width: "15%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Catgories.length > 0 ? (

                                Catgories.map((item, index) => (

                                    <tr key={item.id}>
                                        <td valign='top'>{index + 1}</td>

                                        <td valign='top'>{item.name}</td>
                                        <td valign='top'>
                                            {item.description}
                                        </td>
                                        <td valign='top' align='center'>{item.total_book}</td>
                                        <td valign='top'>
                                            <div className='d-flex gap-2 item-actions'>
                                                <Link className='act edit' to={`${AppRoute.ADMIN.AUTHORS.VIEW(1)}`}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>

                                                <span role='button' className='act delete' data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                    onClick={() => setModalInfo({
                                                        type: 'delete',
                                                        api_url: AppRoute.ADMIN.CATEGORY.SINGLE(item.id),
                                                    })}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                ))) : (
                                <>
                                    <tr>
                                        <td className="no-records" align="center" colSpan="5">No records found</td>
                                    </tr>
                                </>
                            )
                        }


                    </tbody>
                </table>

                <ConfirmModal modal={ModalInfo} onSuccess={getCategories} />

            </div>
        </>
    )
}

export default Category