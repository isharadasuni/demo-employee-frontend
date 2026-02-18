import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [salary, setSalary] = useState('')

    const navigator = useNavigate()


    function saveEmployee(e) {
        e.preventDefault();
        const employee = { firstName, lastName, email, salary }
        console.log(employee);

        createEmployee(employee).then((response) => {
            console.log(response.data);
            navigator('/employees')
        }).catch(error => {
            console.error(error);
        })
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h1>Add Employee</h1>
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

                            <button type="submit" className='btn btn-success' onClick={saveEmployee}>Submit</button>


                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CreateEmployee