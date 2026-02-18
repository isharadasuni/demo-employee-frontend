import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [salary, setSalary] = useState('')

    const [errors, setErrors] = useState({

        firstName: '',
        lastName: '',
        email: '',
        salary: ''

    })

    const navigator = useNavigate()


    function saveEmployee(e) {
        e.preventDefault();

        if (validationFrom()) {
            const employee = { firstName, lastName, email, salary }
            console.log(employee);

            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator('/employees')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function validationFrom() {

        let valid = true;

        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }


        if (salary.toString().trim()) {
            errorsCopy.salary = '';
        } else {
            errorsCopy.salary = 'Salary is required';
            valid = false;
        }

        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        } else {
            errorsCopy.email = '';
        }



        setErrors(errorsCopy);
        return valid;
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
                                <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    placeholder='Enter first name here' name='firstName'
                                    value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}

                                <label className='form-label'>Last Name</label>
                                <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    placeholder='Enter last name here' name='lastName'
                                    value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

                                <label className='form-label'>Email</label>
                                <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder='Enter email here' name='email'
                                    value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                                <label className='form-label'>Salary</label>
                                <input type="number" className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                    placeholder='Enter salary here' name='salary'
                                    value={salary} onChange={(e) => setSalary(e.target.value)}></input>
                                {errors.salary && <div className='invalid-feedback'>{errors.salary}</div>}
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