import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/style.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Register from './components/Register/Register.jsx'
import Exam from './components/Exam/Exam.jsx'
import ExamPage from './components/ExamPage/ExamPage.jsx'

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/home', element: <Home /> },
	{ path: '/exam', element: <Exam /> },
	{ path: '/exam/:exam_id', element: <ExamPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
