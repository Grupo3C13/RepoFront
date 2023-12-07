import React, { useState, useRef } from 'react';
import { useForm } from './Hook/UseForm'
import './Login.css'
import emailjs from '@emailjs/browser';

export const RegisterPage = () => {
	const [passwordError, setPasswordError] = useState('')
	const [emailError, setEmailError] = useState('')
	// const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	// const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	// const userId = import.meta.env.VITE_EMAILJS_USER_ID;
	const [accountCreated, setAccountCreated] = useState(false);
	const [emailSentText, setEmailSentText] = useState('');

	const API_URL= import.meta.env.VITE_API_URL

	const url = `http://localhost:8090/auth/register`

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

	function validatePassword(password) {
		const samePassword = password == repeatPassword ? true : false
		return passwordRegex.test(password) && samePassword
	}

	const { name, lastname, email, password, repeatPassword, onInputChange, onResetForm } =
		useForm({
			name: '',
			lastname: '',
			email: '',
			password: '',
			repeatPassword: '',
		});

	const settings = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			lastname: lastname,
			email: email,
			password: password,
			rol: 'USER'
		})
	}

	const onResendConfirmationEmail = () => {
		setEmailSentText('Mail Enviado!!');
		sendConfirmationEmail();

		setTimeout(() => {
			setEmailSentText('');
		}, 4000);
	};

	const sendConfirmationEmail = async () => {
		try {
			const templateParams = {
				to_email: email,
				name: name,
				email: email, 
				message: 'Cuenta creada',
			};
			console.log("Send email: " + email)
			const response = await emailjs.send(
				serviceId,
				templateId,
				templateParams,
				usersId
			);
			if (response.status === 200) {
				console.log('.');
			}
		} catch (error) {
			console.error('Error al enviar el correo:', error);
		}
	};


	const onRegister = async (e) => {
		e.preventDefault();
		if (validatePassword(password)) {
			setPasswordError('')
			try {
				const response = await fetch(url, settings)
				console.log(response)
				if (response.status == 200) {
					setAccountCreated(true);
					sendConfirmationEmail();
				}
				if (response.status == 500) {
					setEmailError('Existe un usuario con ese email');
					console.log("Usuario existente");
				}
				if (response.status == 403) {
					console.log("Error");
				}
			} catch {
				(error) => {
					console.log(error)
				}
			}
		} else {
			setPasswordError("No cumple los requisitos")
		}
	}


	return (
		<div className='login-container'>
			<div className='wrapper'>
				<form className='loginForm' onSubmit={onRegister} >
					<h2>Nuevo Usuario</h2>

					<div className="input-group">
						<input
							placeholder='Nombre'
							type='text'
							name='name'
							id='name'
							className="input"
							value={name}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>

					</div>
					<div className='input-group'>

						<input
							placeholder='Apellido'
							type='text'
							name='lastname'
							id='lastname'
							className='input'
							value={lastname}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
					</div>
					<div className='input-group'>

						<input
							placeholder='Email'
							type='email'
							name='email'
							id='email'
							className='input'
							value={email}
							onChange={(e) => { onInputChange(e), setEmailError('') }}
							required
							autoComplete='off'
						/>

					</div>
					<div className='input-group'>

						<input
							placeholder='Contraseña'
							type='password'
							name='password'
							id='password'
							className='input'
							value={password}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
					</div>
					<div className='input-group'>

						<input
							placeholder='Repetir Contraseña'
							type='password'
							name='repeatPassword'
							id='repeatPassword'
							className='input'
							value={repeatPassword}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
					</div>

					<div className='passwordError'>{passwordError}</div>
					<div className='passwordError'>{emailError}</div>

					<button className='btn-lr'>Registrarse</button>
					{accountCreated ? (
						<div className="success-message">
							Cuenta creada
						</div>
					) : null}
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;