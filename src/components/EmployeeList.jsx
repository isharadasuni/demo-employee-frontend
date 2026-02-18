import React, { useState, useEffect } from 'react'
import { deleteEmployee, getAllEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigator = useNavigate();

    useEffect(() => {

        getAllEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console(error);
        })
    }, [])


    //move to employee adding page
    function addNewEmployee() {
        navigator('/add-employee');

    }

    function updateEmployeeInfo(id) {
        navigator(`/update-employee/${id}`);

    }

    function removeEmployee(id) {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id)
                .then(() => {
                    // Use functional update to ensure latest state
                    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
                })
                .catch(err => console.error(err));
        }
    }

    return (

        <div className='container'>

            <h1 className='text-center'>Employee List</h1>
            <br />
            <button type='button' className="btn btn-secondary" onClick={addNewEmployee}>Add Employee</button>

            <br /><br />
            <input
                type="text"
                placeholder="Search employee..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees
                            .filter(employee =>
                                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                employee.email.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(employee =>
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.salary}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='btn btn-outline-primary me-2'
                                            onClick={() => updateEmployeeInfo(employee.id)}
                                        >
                                            Update
                                        </button>

                                        <button
                                            type='button'
                                            className='btn btn-outline-danger'
                                            onClick={() => removeEmployee(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList 
