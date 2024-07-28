// src/components/Register.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
	const [formData, setFormData] = useState({
		username: '',
		password1: '',
		password2: '',
		email: '',
		user_type: '',
	})
	const navigate = useNavigate()

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		axios
			.post(
				'https://hikamoru.pythonanywhere.com/dj-rest-auth/registration/',
				formData
			)
			.then(response => {
				localStorage.setItem('token', response.data.key)
				navigate('/home')
			})
			.catch(error => {
				console.error('Registration error', error)
			})
	}

	return (
		<div className='auth-container'>
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<label>Username</label>
				<input
					placeholder='Enter Username'
					type='text'
					name='username'
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<label>Password</label>
				<input
					placeholder='Enter Password'
					type='password'
					name='password1'
					value={formData.password1}
					onChange={handleChange}
					required
				/>
				<label>Confirm Password</label>
				<input
					type='password'
					name='password2'
					value={formData.password2}
					onChange={handleChange}
					required
				/>
				<label>Email</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<label>User Type</label>
				<select
					name='user_type'
					value={formData.user_type}
					onChange={handleChange}
					required
				>
					<option value=''>Select...</option>
					<option value='1'>Teacher</option>
					<option value='2'>Student</option>
					<option value='3'>Supervisor</option>
				</select>
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	)
}

export default Register
