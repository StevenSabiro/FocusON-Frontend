import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [activeExamId, setActiveExamId] = useState(false) // State to track the active exam
	const [card, setCard] = useState('')

	useEffect(() => {
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

	const openStats = e => {
		setActiveExamId(true)
		let obj = data.find(elem => elem.exam_id == e.target.id)
		console.log(obj)
		if (!activeExamId) {
			let card = document.querySelector('.stats')
			card.classList.add('active')
			console.log(card)
		} else {
			card.classList.remove('active')
		}
		setCard(
			<div className='card__content'>
				<h3 className='card__title'>{obj.exam_name}</h3>
				<div className='card__info'>
					<p className='card__name'>
						Name: <strong>{obj.student_name}</strong>
					</p>
					<p className='card__duration'>
						Exam Duration: <strong>{obj.exam_duration} mins</strong>
					</p>
					<p className='card__duration'>
						Exam Date:{' '}
						<strong>
							{obj.exam_startdate.substr(0, 10)} {obj.exam_startdate.substr(11)}
						</strong>
					</p>
				</div>
				<p className='card__mark'>
					Score:{' '}
					<strong>
						{obj.student_mark} | 100
					</strong>
				</p>
			</div>
		)
	}

	const closeStats = () => {
		setActiveExamId(false)
		let card = document.querySelector('.stats')
		card.classList.remove('active')
	}

	return (
		<div>
			<div className='btns'>
				<Link to='/' onClick={handleLogout} className='logout'>
					Log Out
				</Link>
				<Link to='/exam' className='logout'>
					Join Exam
				</Link>
			</div>
			<div className='dashboard'>
				<h1 className='dashboard__title'>Exams</h1>
				<div className='dashboard__cards'>
					{data.map(elem => {
						return (
							<div key={elem.exam_id}>
								<div
									className='dashboard__card'
									id={elem.exam_id}
									onClick={e => openStats(e)}
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
				<div className='stats'>
					{card}
					<button
						className='close__btn'
						onClick={() => {
							closeStats()
						}}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}

export default Home
