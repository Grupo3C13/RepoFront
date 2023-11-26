
import { useState } from 'react';
import { useForm } from './UseForm';
import "../LogIn/Registro.modules.css";
import emailjs from '@emailjs/browser';

export const Registro = () => {
	const [passwordError, setPasswordError] = useState('')
	const [emailError, setEmailError] = useState('')
	const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	const userId = import.meta.env.VITE_EMAILJS_USER_ID;
	const [accountCreated, setAccountCreated] = useState(false);
	const [emailSentText, setEmailSentText] = useState('');

	const API_URL= import.meta.env.VITE_API_URL

	const url = `${API_URL}auth/register`


	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

	function validatePassword(password) {
		const samePassword = password == repeatPassword ? true : false
		return passwordRegex.test(password) && samePassword
	}

	const { name, lastname, email, dni, password, repeatPassword, onInputChange } =
		useForm({
			name: '',
			lastname: '',
			email: '',
			dni: '',
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
			dni: dni,
			password: password,
			rol: 'USER'
		})
	}

	const onResendConfirmationEmail = () => {
		setEmailSentText('Mail Enviado!!'); 
		sendConfirmationEmail();

		
		setTimeout(() => {
			setEmailSentText('');
		}, 5000);
	};

	const sendConfirmationEmail = async () => {
		try {
			const templateParams = {
				to_email: email,
				name: name,
				email: email, 
				message: '¡Tu cuenta ha sido creada con éxito!',
			};
			console.log("Send email: " + email)
			const response = await emailjs.send(
				serviceId,
				templateId,
				templateParams,
				userId
			);
			if (response.status === 200) {
				console.log('Correo electrónico de confirmación enviado con éxito.');
			}
		} catch (error) {
			console.error('Error al enviar el correo electrónico de confirmación:', error);
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
					setEmailError('Ya existe un usuario con ese email');
					console.log("Usuario existente");
				}
				if (response.status == 403) {
					console.log("Error al crear la cuenta");
				}
			} catch {
				(error) => {
					console.log(error)
				}
			}
		} else {
			setPasswordError("La contraseña no cumple con los requerimientos")
		}
	}


	return (
		<div className='login-container'>
			<div className='wrapper'>
				<form className='loginForm' onSubmit={onRegister} >
					<h2>Crear cuenta</h2>

					<div className="input-group">
						<input
							type='text'
							name='name'
							id='name'
							className="input"
							value={name}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className="label" htmlFor='name'>Nombre</label>



					</div>
					<div className='input-group'>

						<input
							type='text'
							name='lastname'
							id='lastname'
							className='input'
							value={lastname}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='lastname'>Apellido</label>
					</div>
					<div className='input-group'>

						<input
							type='email'
							name='email'
							id='email'
							className='input'
							value={email}
							onChange={(e) => { onInputChange(e), setEmailError('') }}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='email'>Email</label>

					</div>
					<div className='input-group'>

						<input
							type='dni'
							name='dni'
							id='dni'
							className='input'
							value={dni}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='dni'>D.N.I.</label>

					</div>
					<div className='input-group'>

						<input
							type='password'
							name='password'
							id='password'
							className='input'
							value={password}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='password'>Contraseña</label>
					</div>
					<div className='input-group'>

						<input
							type='password'
							name='repeatPassword'
							id='repeatPassword'
							className='input'
							value={repeatPassword}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='password'>Repetir Contraseña</label>
					</div>

					<div className='passwordError'>{passwordError}</div>
					<div className='passwordError'>{emailError}</div>

					<button className='btn-lr'>Registrarse</button>
					{accountCreated ? (
						<div className="success-message">
							Cuenta creada con éxito. Un correo se enviará a su dirección. Si no lo recibe y desea reenviarlo, haga click aquí.
							<button type='button' className="resend-email-button" onClick={onResendConfirmationEmail}>
								{emailSentText || 'Reenviar Email'} {/* Mostrar 'Mail Enviado!!' o 'Reenviar Email' */}
							</button>
						</div>
					) : null}
				</form>
			</div>
		</div>
	);
}

export default Registro;