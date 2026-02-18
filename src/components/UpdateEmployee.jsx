import React, { useState, useEffect } from 'react'
import { getAllEmployees, getEmployees, updateEmployeeDetails } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateEmployee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [salary, setSalary] = useState('')

    const navigator = useNavigate()
    const { id } = useParams();
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        if (id) {
            getEmployees(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setSalary(response.data.salary);

            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    // Fetch employees on mount
    useEffect(() => {
        getAllEmployees()
            .then(res => setEmployees(res.data))
            .catch(err => console.error("Failed to fetch employees:", err))
    }, [])


    function editEmployee(e) {
        e.preventDefault();
        const employee = { firstName, lastName, email, salary }
        console.log(employee);

        updateEmployeeDetails(id, employee).then((reponse) => {
            console.log(reponse.data);
            navigator('/employees')
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h1>Update Employee</h1>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>

                                <label className='form-label'>First Name</label>
                                <input type="text" className='form-control'
                                    placeholder='Enter first name here' name='firstName'
                                    value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>

                                <label className='form-label'>Last Name</label>
                                <input type="text" className='form-control'
                                    placeholder='Enter last name here' name='lastName'
                                    value={lastName} onChange={(e) => setLastName(e.target.value)}></input>

                                <label className='form-label'>Email</label>
                                <input type="text" className='form-control'
                                    placeholder='Enter email here' name='email'
                                    value={email} onChange={(e) => setEmail(e.target.value)}></input>

                                <label className='form-label'>Salary</label>
                                <input type="number" className='form-control'
                                    placeholder='Enter salary here' name='salary'
                                    value={salary} onChange={(e) => setSalary(e.target.value)}></input>
                            </div>

                            <button type="submit" className='btn btn-success' onClick={editEmployee}>Update</button>


                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UpdateEmployee