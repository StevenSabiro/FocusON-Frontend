import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './exam.css'
import { Link, useNavigate } from 'react-router-dom'
import { login_avatar } from '../../assets/img'

const EnterExam = () => {
	const [data, setData] = useState([])
	const [studentName, setStudentName] = useState('')
	const [error, setError] = useState(null)
	const [inputValue, setInputValue] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem('token')

			if (!token) {
				setError('No token found in local storage')
				return
			}

			try {
				const response = await axios.get(
					'https://hikamoru.pythonanywhere.com/student/dashboard/',
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				)

				setData(response.data)
				if (response.data.length > 0) {
					setStudentName(response.data[0].student_name)
				}
			} catch (error) {
				setError('Error fetching data')
			}
		}

		fetchData()
	}, [])

	const handleSubmit = async event => {
		event.preventDefault()
		const token = localStorage.getItem('token')

		if (!token) {
			setError('No token found in local storage')
			return
		}

		try {
			const response = await axios.get(
				`https://hikamoru.pythonanywhere.com/exam/${inputValue}/start/`,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			)
			navigate(`/exam/${inputValue}`, { state: { examData: response.data } })
		} catch (error) {
			setError('Error fetching exam data')
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		alert('Tokens have been removed')
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!data.length) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className='enter__content'>
				<div className='enter__btns'>
					<Link to='/home' className=''>
						Back
					</Link>
					<Link to='/' onClick={handleLogout} className=''>
						Log Out
					</Link>
				</div>
				<div className='enter__info'>
					<img src={login_avatar} alt='' className='enter__img' />
					<p className='enter__luck'>
						Good luck
						<strong> {studentName} !</strong>
					</p>
				</div>
				<form className='enter__form' onSubmit={handleSubmit}>
					<label className='enter__label'>
						Input ID which given by teacher
					</label>
					<input
						placeholder='Input ID'
						className='enter__input'
						type='text'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					<button className='enter__btn' type='submit'>
						Enter
					</button>
				</form>
			</div>
		</>
	)
}

export default EnterExam
