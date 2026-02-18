import React, { useState, useEffect } from 'react'
import { getEmployees, getAllEmployees, updateEmployeeDetails } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');

    const [allEmployees, setAllEmployees] = useState([]);
    const [errors, setErrors] = useState({});

    const navigator = useNavigate();
    const { id } = useParams();

    // Fetch all employees once for validation
    useEffect(() => {
        getAllEmployees()
            .then(res => setAllEmployees(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch current employee for pre-filling
    useEffect(() => {
        if (id) {
            getEmployees(id)
                .then(response => {
                    const emp = response.data;
                    setFirstName(emp.firstName);
                    setLastName(emp.lastName);
                    setEmail(emp.email);
                    setSalary(emp.salary);
                })
                .catch(error => console.error(error));
        }
    }, [id]);

    // Validation
    const validateForm = () => {
        const errorsCopy = {};
        let valid = true;

        if (!firstName.trim()) { errorsCopy.firstName = 'First Name is required'; valid = false; }
        if (!lastName.trim()) { errorsCopy.lastName = 'Last Name is required'; valid = false; }
        if (!email.trim()) { errorsCopy.email = 'Email is required'; valid = false; }
        else {
            const duplicate = allEmployees.some(emp => emp.email === email && emp.id !== Number(id));
            if (duplicate) { errorsCopy.email = 'Email already exists'; valid = false; }
        }

        if (salary === '' || isNaN(salary)) { errorsCopy.salary = 'Salary is required and must be a number'; valid = false; }

        setErrors(errorsCopy);
        return valid;
    };

    const editEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employee = {
                firstName,
                lastName,
                email,
                salary: Number(salary)
            };

            updateEmployeeDetails(id, employee)
                .then(() => navigator('/employees'))
                .catch(err => console.error(err));
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 mt-5 shadow'>
                    <h2 className='text-center mt-3'>Update Employee</h2>
                    <div className='card-body'>
                        <form onSubmit={editEmployee}>
                            {/* First Name */}
                            <div className='mb-3'>
                                <label className='form-label'>First Name</label>
                                <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    value={firstName} onChange={e => setFirstName(e.target.value)} />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            {/* Last Name */}
                            <div className='mb-3'>
                                <label className='form-label'>Last Name</label>
                                <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    value={lastName} onChange={e => setLastName(e.target.value)} />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            {/* Email */}
                            <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email} onChange={e => setEmail(e.target.value)} />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            {/* Salary */}
                            <div className='mb-3'>
                                <label className='form-label'>Salary</label>
                                <input type="number" className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                    value={salary} onChange={e => setSalary(e.target.value)} />
                                {errors.salary && <div className='invalid-feedback'>{errors.salary}</div>}
                            </div>

                            <div className='text-center'>
                                <button type="submit" className='btn btn-success px-5'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee;
