import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye, faShoppingCart, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BookAnalytics = () => {
    const [timeRange, setTimeRange] = useState('30 Days');

    // Dummy data for charts and analytics
    const stats = {
        views: 1500,
        sales: 450,
        rating: 4.5,
        income: 7000,
    };

    const ratingsDistribution = [100, 50, 30, 10, 5]; // For 5-star to 1-star ratings

    const reviews = [
        { id: 1, reader: 'John Doe', rating: 5, comment: 'Absolutely loved it!', date: '2024-11-08' },
        { id: 2, reader: 'Jane Smith', rating: 4, comment: 'Great read with some minor issues.', date: '2024-11-07' },
    ];

    const salesData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Sales',
                data: [50, 100, 120, 180],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const viewsData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Views',
                data: [300, 400, 350, 450],
                fill: true,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
            },
        ],
    };

    return (
        <div className="p-4 bg-white rounded-2">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                <h4 className="section-title m-0">Book Analytics</h4>
                <select
                    className="form-select w-auto"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="7 Days">Last 7 Days</option>
                    <option value="30 Days">Last 30 Days</option>
                    <option value="6 Months">Last 6 Months</option>
                    <option value="1 Year">Last 1 Year</option>
                </select>
            </div>

            {/* Overview Statistics */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="stat-box text-center p-3 bg-light rounded">
                        <FontAwesomeIcon icon={faEye} size="2x" className="text-primary" />
                        <h5 className="mt-2">{stats.views}</h5>
                        <p>Views</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-box text-center p-3 bg-light rounded">
                        <FontAwesomeIcon icon={faShoppingCart} size="2x" className="text-success" />
                        <h5 className="mt-2">{stats.sales}</h5>
                        <p>Sales</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-box text-center p-3 bg-light rounded">
                        <FontAwesomeIcon icon={faStar} size="2x" className="text-warning" />
                        <h5 className="mt-2">{stats.rating}</h5>
                        <p>Average Rating</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-box text-center p-3 bg-light rounded">
                        <FontAwesomeIcon icon={faDollarSign} size="2x" className="text-danger" />
                        <h5 className="mt-2">${stats.income}</h5>
                        <p>Total Income</p>
                    </div>
                </div>
            </div>

            {/* Sales and Views Chart */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <h5>Sales Over Time</h5>
                    <Line data={salesData} />
                </div>
                <div className="col-md-6">
                    <h5>Views Over Time</h5>
                    <Line data={viewsData} />
                </div>
            </div>

            {/* Ratings Distribution */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <h5>Ratings Distribution</h5>
                    <Bar
                        data={{
                            labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
                            datasets: [
                                {
                                    label: 'Number of Ratings',
                                    data: ratingsDistribution,
                                    backgroundColor: [
                                        '#4caf50',
                                        '#8bc34a',
                                        '#cddc39',
                                        '#ffeb3b',
                                        '#ffc107',
                                    ],
                                },
                            ],
                        }}
                    />
                </div>
            </div>

            {/* Recent Reviews */}
            <div className="mb-4">
                <h5>Recent Reviews</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Reader</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.reader}</td>
                                <td>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />
                                    ))}
                                </td>
                                <td>{review.comment}</td>
                                <td>{review.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookAnalytics;
