import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-dark text-light mt-auto py-4">
            <div className="container text-center">

                <h5 className="fw-bold mb-2">Employee Management System</h5>

                <p className="mb-2 text-muted">
                    Manage employees efficiently and securely.
                </p>

                <div className="mb-3">
                    <a href="#" className="text-light me-3 text-decoration-none">
                        Home
                    </a>
                    <a href="#" className="text-light me-3 text-decoration-none">
                        Employees
                    </a>
                    <a href="#" className="text-light text-decoration-none">
                        Contact
                    </a>
                </div>

                <hr className="border-light" />

                <small className="text-muted">
                    © 2026 DASU | All Rights Reserved
                </small>

            </div>
        </footer>
    )
}

export default Footer
