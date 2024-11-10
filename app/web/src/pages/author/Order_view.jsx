import React from 'react';

const SingleOrderView = () => {
    return (
        <div className="p-4 bg-white rounded-2">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                <h4 className="section-title m-0">Order Details</h4>
            </div>

            <div className="row">
                {/* Customer Information */}
                <div className="col-md-6 mb-4">
                    <h5>Customer Information</h5>
                    <ul className="list-unstyled">
                        <li><strong>Name:</strong> John Doe</li>
                        <li><strong>Email:</strong> john.doe@example.com</li>
                        <li><strong>Phone:</strong> (123) 456-7890</li>
                        <li><strong>Address:</strong> 123 Main St, City, Country</li>
                    </ul>
                </div>

                {/* Order Summary */}
                <div className="col-md-6 mb-4">
                    <h5>Order Summary</h5>
                    <ul className="list-unstyled">
                        <li><strong>Order ID:</strong> ORD12345</li>
                        <li><strong>Order Date:</strong> 2024-11-08</li>
                        <li><strong>Order Status:</strong> Completed</li>
                        <li><strong>Payment Method:</strong> Credit Card</li>
                    </ul>
                </div>
            </div>

            {/* Book Details */}
            <h5 className="mt-4">Book Details</h5>
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th style={{ width: "40px" }}>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Some Book Title</td>
                        <td>Author Name</td>
                        <td>2</td>
                        <td>$19.99</td>
                        <td>$39.98</td>
                    </tr>
                    {/* More book items if applicable */}
                </tbody>
            </table>

            {/* Order Total */}
            <div className="d-flex justify-content-end mt-4">
                <div className="text-end">
                    <p className="mb-1"><strong>Subtotal:</strong> $39.98</p>
                    <p className="mb-1"><strong>Shipping:</strong> $5.00</p>
                    <h5><strong>Total:</strong> $44.98</h5>
                </div>
            </div>
        </div>
    );
};

export default SingleOrderView;
