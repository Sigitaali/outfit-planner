import React from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import '../styles/RegisterPage.scss'

const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
