import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './home.css'

export let global_data

const Home = () => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [activeExamId, setActiveExamId] = useState(null) // State to track the active exam

	useEffect(() => {
		global_data = data
		const getStudentDashboard = async () => {
			const token = localStorage.getItem('token') // Replace 'yourTokenKey' with the key you used to store the token
			if (!token) {
				setError('No token found in local storage')
				return
			}

			try {
				const response = await axios.get(
					'https://hikamoru.pythonanywhere.com/student/dashboard/',
					{
						headers: {
							Authorization: `Token ${token}`, // Add the token to the Authorization header
						},
						maxRedirects: 0, // Prevent Axios from following redirects
					}
				)

				if (response.status === 302) {
					setError(
						'Received 302 Redirect. Check the URL or server configuration.'
					)
					console.log(response.headers.location) // Log the redirection URL for debugging
				} else if (response.headers['content-type'].includes('text/html')) {
					setError(
						'Received HTML instead of JSON. Possible redirection or incorrect URL.'
					)
					console.log(response.data) // Log the HTML content for debugging
				} else {
					setData(response.data) // Set the response data to state
				}
			} catch (error) {
				if (error.response && error.response.status === 302) {
					setError(
						'Received 302 Redirect. Check the URL or server configuration.'
					)
					console.log(error.response.headers.location) // Log the redirection URL for debugging
				} else {
					setError(`Error making the API request: ${error.message}`)
				}
			}
		}

		getStudentDashboard()
	}, [])

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!data) {
		return <div>Loading...</div>
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		alert('Tokens have been removed')
	}

	const openStats = () => {
		setActiveExamId(!activeExamId)
	}
	console.log(data)

	return (
		<div>
			<Link to='/' onClick={handleLogout} className='logout'>
				Log Out
			</Link>
			<div className='dashboard'>
				<h1 className='dashboard__title'>Exams</h1>
				<div className='dashboard__cards'>
					{data.map(elem => {
						return (
							<div key={elem.exam_id}>
								<div
									className='dashboard__card'
									onClick={() => openStats()}
								>
									<img
										className='exam__img'
										src={`https://hikamoru.ru/assets/${elem.exam_name}.png`}
										alt={elem.exam_name}
									/>
									<h2 className='exam__name'>{elem.exam_name}</h2>
								</div>
							</div>
						)
					})}
				</div>
				
			</div>
		</div>
	)
}

export default Home
