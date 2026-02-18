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
    const [errors, setErrors] = useState({});

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

        if (validationFrom()) {
            const employee = { firstName, lastName, email, salary }
            console.log(employee);

            updateEmployeeDetails(id, employee).then((reponse) => {
                console.log(reponse.data);
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



        // email
        if (!email.trim()) { errorsCopy.email = 'Email is required'; valid = false; }
        else {
            const duplicate = employees.some(emp => emp.email === email && (!id || emp.id !== Number(id)));

            if (duplicate) { errorsCopy.email = 'Email already exists'; valid = false; }
            else errorsCopy.email = '';
        }


        setErrors(errorsCopy);
        return valid;
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
                            <button type="submit" className='btn btn-success' onClick={editEmployee}>Update</button>


                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UpdateEmployee