
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import "../routes/Login.modules.css";
import { TitleBar } from "../components/TitleBar";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

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

    if (Object.keys(newErrors).length === 0) {
      // Simula un inicio de sesión exitoso; en una aplicación real, validarías al usuario en el servidor.
      // Aquí puedes mostrar un mensaje de éxito y redirigir al usuario a la página de inicio después de un inicio de sesión exitoso.
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container">
      <TitleBar titulo="Iniciar sesión" />
      <Form className="loginForm" onSubmit={handleSubmit}>
        {loginSuccess && (
          <div className="alert alert-success">Inicio de sesión exitoso, redirigiendo...</div>
        )}

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

        <Button className='color-primario' variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
}


