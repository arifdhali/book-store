import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import "../style/admin.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';

const AdminLayout = () => {
  const location = useLocation();
  const [locations, setLocations] = useState(location.pathname);

  useEffect(() => {
    setLocations(location.pathname);
  }, [location]);
  const generateBreadcrumb = (pathname) => {
    const pathParts = pathname.split("/").filter((part) => part);
    return pathParts.map((item, i) => {
      let namingConv = item.charAt(0).toUpperCase() + item.slice(1);
      const path = `/${pathParts.slice(0, i + 1).join("/")}`;
      return (
        <span key={i}>
          <Link to={path}>{namingConv}</Link>
          {i < pathParts.length - 1 && " / "}
        </span>
      );
    });
  };

  return (
    <>
      <Header />
      <div className="admin-container px-4 h-100">
        <div className="sidebar">
          <Sidebar />
        </div>
        <section className="dashboard-content position-relative p-4 rounded-3 h-100">
          <div className='p-3 rounded-2 bg-white mb-4 d-flex justify-content-between'>
            <p className='m-0'>Bread crumb</p>
            <div className='breadcrumb-location'>
              <FontAwesomeIcon icon={faHouse} />
              {generateBreadcrumb(locations)}
            </div>
          </div>

          <div className='section-content p-3 rounded-2 bg-white'>
            <Outlet />
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminLayout
