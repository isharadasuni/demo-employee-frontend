import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">

          {/* Brand */}
          <Link className="navbar-brand fw-bold" to="/">
            Employee Management
          </Link>

          {/* Toggler for mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className="nav-link" 
                  exact="true"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/employees" className="nav-link">
                  Employees
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/add-employee" className="nav-link">
                  Add Employee
                </NavLink>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </header>
  )
}

export default Header
