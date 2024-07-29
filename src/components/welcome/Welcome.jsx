import React from 'react'
import { hi } from '../../assets/img'
import './welcome.css'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'

const Welcome = () => {
	return (
		<div className='welcome'>
			<img className='welcome__img' src={hi} alt='' />
			<p className='welcome__desc'>
				Unlock the gateway to your dreams with the pioneering platform that
				turns aspirations into reality. - <strong>it’s in FocusON</strong>
			</p>
            <Link className='welcome__btn' to='/login'>Let's Explore</Link>
		</div>
	)
}

export default Welcome
