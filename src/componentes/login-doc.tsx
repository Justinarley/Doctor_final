import React, { useState } from 'react';
import Fond from './Imagenes/login2.jpg';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLoginDoctor = async () => {
    try {
      const response = await fetch('http://localhost:3000/login-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: usuario, clave: contrasena }),
        mode: 'cors',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`¡Bienvenido, Dr. ${usuario}! ${result.message}`);
        // Redirigir a la página de citas después del inicio de sesión exitoso
        navigate('/citas');
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6" style={{ backgroundColor: '#87CEEB', padding: '50px' }}>
          <img src={Fond} alt="Imagen Consultorio Dental" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="col-md-6" style={{ backgroundColor: '#F0F8FF', padding: '50px', fontStyle: 'italic' }}>
          <h2>Iniciar Sesión</h2>
          <div className="mb-3">
            <label className="form-label">Doctor:</label>
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          <button className="btn btn-primary ms-2" onClick={handleLoginDoctor}>
            Iniciar Sesión (Doctor)
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
