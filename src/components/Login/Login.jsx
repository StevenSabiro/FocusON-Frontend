// src/components/Login.js
import React, { useState } from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { login_avatar } from '../../assets/img'

function Login() {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const navigate = useNavigate()

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		axios
			.post('https://hikamoru.pythonanywhere.com/dj-rest-auth/login/', formData)
			.then(response => {
				localStorage.setItem('token', response.data.key)
				navigate('/home')
			})
			.catch(error => {
				console.error('Login error', error)
			})
	}

	return (
		<div className='login'>
			<img src={login_avatar} alt='' />
			<h2>Login</h2>
			<form className='login__form' onSubmit={handleSubmit}>
				<label className='username__label'>Username</label>
				<input
					placeholder='Enter Username'
					className='username__input'
					type='text'
					name='username'
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<label className='password__label'>Password</label>
				<input
					placeholder='Enter Password'
					className='password__input'
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button className='login__btn' type='submit'>
					Log In
				</button>
			</form>
		</div>
	)
}

export default Login
