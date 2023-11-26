
import { useState } from 'react';
import { useForm } from './UseForm';
import { useNavigate } from 'react-router-dom';
import "../LogIn/Login.modules.css";
import {useAccount} from '../../components/Context/accountContext';

export const Login = () => {
	const API_URL= import.meta.env.VITE_API_URL

	const url = `${API_URL}auth/login`
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

	const { updateUserData } = useAccount();

	const onLogin = async (e) => {
		e.preventDefault();
		setLoginError(null);
		setIsTyping(false);

		try {
			const response = await fetch(url, settings)
			console.log("response: " + response)
			if (response.status === 200) {
				// Autenticación exitosa, obtener el token del cuerpo de la respuesta
				const data = await response.json();
				const { token } = data;
				sessionStorage.setItem('token', token);
				const userEmail = email; // Obtener el correo electrónico del formulario

				const settings = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				}
				const url = `${API_URL}user/perfil/${userEmail}`
				const profileDataResponse = await fetch(url, settings)




				if (profileDataResponse.status === 200) {
					const profileData = await profileDataResponse.json();
					sessionStorage.setItem('userData', JSON.stringify(profileData));
					updateUserData(profileData);
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
				setLoginError("Credenciales incorrectas. Inténtelo de nuevo.");
			}
		} catch (error) {
			console.log(error)
			setLoginError("Ocurrió un error al iniciar sesión. Inténtelo de nuevo más tarde.");
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
							placeholder=' '
						/>
						<label className="label" htmlFor='email'>Email</label>
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
							placeholder=' '
						/>
						<label className="label" htmlFor='password'>Contraseña</label>
					</div>
					{!isTyping && loginError && <p className="error-message">{loginError}</p>}
					<button className='btn-lr'>Iniciar Sesion</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

