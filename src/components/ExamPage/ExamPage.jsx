import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const ExamPage = () => {
	const { exam_id } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	const [examData, setExamData] = useState(null)
	const [answers, setAnswers] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!exam_id) {
			console.error('Exam ID is undefined')
			return
		}

		const fetchExamData = async () => {
			const token = localStorage.getItem('token')
			try {
				const response = await fetch(
					`https://hikamoru.pythonanywhere.com/exam/${exam_id}/start/`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				)

				if (!response.ok) {
					throw new Error('Failed to fetch exam data')
				}

				const data = await response.json()
				setExamData(data)
			} catch (error) {
				console.error('Error fetching exam data:', error)
			}
		}

		fetchExamData()
	}, [exam_id])

	const handleAnswerChange = (questionId, answer) => {
		setAnswers(prevAnswers => ({
			...prevAnswers,
			[questionId]: answer,
		}))
	}

	const handleSubmit = async () => {
		setIsSubmitting(true)
		const token = localStorage.getItem('token')
		try {
			const response = await fetch(
				`https://hikamoru.pythonanywhere.com/exam/${exam_id}/submit/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${token}`,
					},
					body: JSON.stringify({ student_answers: answers }),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to submit exam')
			}

			alert('Exam submitted successfully!')
			navigate('/') // Redirect to a different page after submission
		} catch (error) {
			console.error('Error submitting exam:', error)
			alert('Error submitting exam')
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!examData) {
		return <div>Loading...</div>
	}

	const { exam_name, questions } = examData

	return (
		<div className='exam__content'>
			<h1>{exam_name}</h1>
			<div className='questions'>
				{Object.entries(questions).map(([questionId, questionDetails]) => (
					<div key={questionId} className='question'>
						<p>{questionDetails.text}</p>
						<input
							type='text'
							onChange={e => handleAnswerChange(questionId, e.target.value)}
							placeholder='Write your answer here'
						/>
					</div>
				))}
			</div>
			<button onClick={handleSubmit} disabled={isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Submit Exam'}
			</button>
		</div>
	)
}

export default ExamPage
