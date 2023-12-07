import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from './Hook/UseForm';
import './Login.css';
import { useAccount } from '../../Context/accountContext';

export const LoginPage = () => {
	const API_URL= import.meta.env.VITE_API_URL

	const url = `http://localhost:8090/auth/login`
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState(null);
	const [isTyping, setIsTyping] = useState(false);

	const { email, password, onInputChange, onResetForm } = useForm({
		email: '',
		password: '',
	});

	const settings = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	}

	const { updateUsersData } = useAccount();

	const onLogin = async (e) => {
		e.preventDefault();
		setLoginError(null);
		setIsTyping(false);

		try {
			const response = await fetch(url, settings)
			console.log("response: " + response)
			if (response.status === 200) {
				const data = await response.json();
				const { token } = data;
				localStorage.setItem('token', token);
				const usersEmail = email;

				const settings = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
				const url = `http://localhost:8090/users/usuario/${usersEmail}`
				const profileDataResponse = await fetch(url, settings)

				if (profileDataResponse.status === 200) {
					const profileData = await profileDataResponse.json();
					localStorage.setItem('userData', JSON.stringify(profileData));
					updateUsersData(profileData);
					console.log('profileData: ' + profileData);

					const { name, email } = profileData;
					console.log('Nombre: ', name);
					console.log('Correo electrónico: ', email);

					navigate('/', {
						replace: true,
						state: {
							logged: true
						},
					});
					window.location.reload()
				}
			} else if (response.status === 403) {
				setLoginError("Datos Incorrectos.");
			}
		} catch (error) {
			console.log(error)
			setLoginError("Error al iniciar sesión.");
		}
		onResetForm();
	};

	return (
		<div className='login-container'>
			<div className='wrapper'>
				<form onSubmit={onLogin}>
					<h2 id='h2-form'>Iniciar Sesión</h2>

					<div className='input-group'>
						<input
							type='email'
							name='email'
							id='email'
							className="input"
							value={email}
							onChange={(e) => {
								onInputChange(e);
								setIsTyping(true);
							}}
							required
							autoComplete='off'
							placeholder='Email'
						/>
					</div>
					<div className='input-group'>
						<input
							type='password'
							name='password'
							id='password'
							className="input"
							value={password}
							onChange={(e) => {
								onInputChange(e);
								setIsTyping(true);
							}}
							required
							autoComplete='off'
							placeholder='Contraseña'
						/>
					</div>
					{!isTyping && loginError && <p className="error-message">{loginError}</p>}
					<button className='btn-lr'>Iniciar Sesion</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;

