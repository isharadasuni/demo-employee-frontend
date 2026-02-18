import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
      <div className="container text-center">
        
        <div className="card shadow-lg p-5 border-0">
          
          <h1 className="display-4 fw-bold text-primary mb-3">
            Employee Management System
          </h1>

          <p className="lead text-muted mb-4">
            Manage your employees efficiently and securely.
            Add, update, delete and search employees with ease.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/employees" className="btn btn-primary btn-lg px-4">
              View Employees
            </Link>

            <Link to="/add-employee" className="btn btn-success btn-lg px-4">
              Add Employee
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home
