import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container mt-4 text-center">
            <h2>Employee Management System</h2>

            <div className="mt-4">
                <Link to="/employees" className="btn btn-primary m-2">
                    View Employees
                </Link>

                <Link to="/add-employee" className="btn btn-success m-2">
                    Add Employee
                </Link>


            </div>
        </div>
  )
}

export default Home