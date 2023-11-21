
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import "../routes/Registro.modules.css";
import { TitleBar } from "../components/TitleBar";

export function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate(); // Usar useHistory en lugar de navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'repeatPassword') {
      setRepeatPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validación de nombre
    if (!name) {
      newErrors.name = 'El nombre es obligatorio';
    }

    // Validación de email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validación de contraseña
    if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Validación de repetir contraseña
    if (password !== repeatPassword) {
      newErrors.repeatPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(newErrors).length === 0) {
      // Simula un registro exitoso; en una aplicación real, registrarías al usuario en el servidor.
      // Aquí mostramos un mensaje de éxito y redirigimos al usuario a la página "Home" después de un registro exitoso.
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate('/'); // Utilizar history para la redirección
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container">
      <TitleBar titulo="Crear cuenta" />
      <Form className="registerForm" onSubmit={handleSubmit}>
        {registrationSuccess && (
          <div className="alert alert-success">¡Registro exitoso! Redirigiendo...</div>
        )}

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Ingresa tu nombre completo"
            value={name}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            No compartiremos tus datos con nadie.
          </Form.Text>
          <Form.Text className={`alert alert-danger p-1 ${errors.name ? 'd-block' : 'd-none'}`}>
  {errors.name}
</Form.Text>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dirección Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            No compartiremos tu mail con nadie.
          </Form.Text>
          <Form.Text className={`alert alert-danger p-1 ${errors.email ? 'd-block' : 'd-none'}`}>
            {errors.email}
          </Form.Text>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={handleChange}
          />
          <Form.Text className={`alert alert-danger p-1 ${errors.password ? 'd-block' : 'd-none'}`}>
            {errors.password}
          </Form.Text>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formRepeatBasicPassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="repeatPassword"
            placeholder="Repetir Contraseña"
            value={repeatPassword}
            onChange={handleChange}
          />
          <Form.Text className={`alert alert-danger p-1 ${errors.repeatPassword ? 'd-block' : 'd-none'}`}>
  {errors.repeatPassword}
</Form.Text>

        </Form.Group>

        <Button className='color-primario' variant="primary" type="submit">
          Registrarme
        </Button>
      </Form>
    </div>
  );
}