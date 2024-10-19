import React from 'react'
import { Link } from 'react-router-dom'
import AppRoute from "../../../routes/routes"

const Authors = () => {
  return (
    <div>
      <>
        <div className='d-flex justify-content-between mb-2'>
          <h2>Author list</h2>
          <div>
            <Link to={`${AppRoute.ADMIN.AUTHORS.ADD}`} className="btn btn-primary">Add Author</Link>
          </div>
        </div>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <td>Id</td>
              <td>user name</td>
              <td>Order</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>lorem122</td>
              <td>2</td>
              <td>active</td>
              <td><Link to={`${AppRoute.ADMIN.AUTHORS.VIEW(1)}`}>view</Link> <button>dlete</button></td>
            </tr>
          </tbody>
        </table>

      </>

    </div>
  )
}

export default Authors
