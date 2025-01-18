import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppRoute from "@/routes/routes"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format, formatDate } from "date-fns";
import ConfirmModal from '@/utils/ConfirmModal';

const OrderList = () => {
    const [Orders, setOrders] = useState([]);
    const { user_id } = useSelector((state) => state.authors.user)
    const [ModalInfo, setModalInfo] = useState({
        type: "",
        api_url: "",
        id: "",
        page_target: {

        },
    })
    const GetOrders = async () => {
        try {

            let response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}${AppRoute.AUTHOR.ORDER}`, {
                params: {
                    userID: user_id
                }
            })
            if (response.data.status) {
                setOrders(response.data?.orders)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        GetOrders();
    }, [])
    console.log(Orders)
    return (
        <div className="p-4 bg-white rounded-2">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                <h4 className="section-title m-0">Order List</h4>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "40px" }}>No</th>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Book Title</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Total Price</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Orders && Orders.length > 0 ? (
                            <>
                                {
                                    Orders.map((order, i) => (
                                        <tr key={`${order.order_id}-${i}`}>
                                            <td>{i + 1}</td>
                                            <td>{order.order_id}</td>
                                            <td>{order.username}</td>
                                            <td>{order.book_title}</td>
                                            <td align='center'>{order.order_quantity}</td>
                                            <td align='center'>${order.total_price}</td>
                                            <td>
                                                {
                                                    format(order.order_date, 'dd-MM-yyyy')
                                                }
                                            </td>
                                            <td className='text-capitalize'>{order.status}</td>
                                            <td>
                                                <div className="item-actions d-flex gap-2">
                                                    <Link to={AppRoute.AUTHOR.SINGLE_ORDER(order.order_id)} role="button" className="act view" title="View Details">
                                                        <FontAwesomeIcon icon={faEye} /> View
                                                    </Link>
                                                    <span role="button" className="act delete" data-bs-toggle="modal" data-bs-target="#deleteOrderModal" title="Delete Order"
                                                        onClick={() => setModalInfo(
                                                            { type: 'delete', api_url: AppRoute.AUTHOR.SINGLE_ORDER(order.order_id) }
                                                        )}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>
                        ) : (
                            <tr>
                                <td colSpan={9} align='center'>No Orders found</td>
                            </tr>
                        )
                    }

                    {/* More orders */}
                </tbody>
            </table>

            {/* Delete Order Modal */}
            <ConfirmModal modal={ModalInfo} onSuccess={GetOrders} />
        </div>
    );
};

export default OrderList;
