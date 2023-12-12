import { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Asegúrate de tener instalada la librería react-modal
import { Navbar } from "./navbar";
import '../componentes/style.css';

type Cita = {
  id: number;
  paciente_ci: string; 
  nombre_paciente: string;
  apellido_paciente: string;
  fecha_hora: string;
  nombre_doctor: string;
  apellido_doctor: string;
  cedula_doctor: string;
  id_doctor: number;
  especialidad: string;
};

export function Citas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [observaciones, setObservaciones] = useState("");
  const [receta, setReceta] = useState("");

  useEffect(() => {
    async function obtenerCitas() {
      try {
        const response = await fetch('http://localhost:3000/obtener-citas');
        if (response.ok) {
          const data = await response.json();
          setCitas(data);
        } else {
          console.error('Error al obtener la lista de citas');
        }
      } catch (error) {
        console.error('Error en la conexión:', error);
      }
    }

    obtenerCitas();
  }, []);

  const formatearFechaHora = (fechaHora: string) => {
    const fecha = new Date(fechaHora);
    const fechaFormateada = fecha.toLocaleDateString('es-ES');
    const horaFormateada = fecha.toLocaleTimeString('es-ES');
    return `${fechaFormateada} ${horaFormateada}`;
  };

  const handleOpenModal = (cita: Cita) => {
    setSelectedCita(cita);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCita(null);
    setModalOpen(false);
    setObservaciones("");
    setReceta("");
  };

  const handleGuardar = async () => {
    try {
      const responseCita = await fetch('http://localhost:3000/guardar-obs-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paciente_ci: selectedCita?.paciente_ci,
          fecha_hora: selectedCita?.fecha_hora,
          nombre_paciente: selectedCita?.nombre_paciente,
          apellido_paciente: selectedCita?.apellido_paciente,
          nombre_doctor: selectedCita?.nombre_doctor,
          apellido_doctor: selectedCita?.apellido_doctor,
          cedula_doctor: selectedCita?.cedula_doctor,
          id_doctor: selectedCita?.id_doctor,
          especialidad: selectedCita?.especialidad,
          observaciones,
          receta,
        }),
      });

      if (responseCita.ok) {
        console.log('Cita guardada exitosamente');
        handleCloseModal();
      } else {
        console.error('Error al guardar cita:', responseCita.status, responseCita.statusText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className=" text-center">Horario de Citas</h2>
        <div className="row">
          {citas.map(cita => (
            <div key={cita.id} className="col-md-4 mb-4">
              <div className="card bg-primary text-white" onClick={() => handleOpenModal(cita)}>
                <div className="card-body">
                  <h5 className="card-title">{cita.nombre_paciente} {cita.apellido_paciente}</h5>
                  <p className="card-text">Fecha y Hora: {formatearFechaHora(cita.fecha_hora)}</p>
                  <p className="card-text">Doctor: {cita.nombre_doctor} {cita.apellido_doctor}</p>
                  <p className="card-text">Especialidad: {cita.especialidad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCita && (
        <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Detalles de la Cita"
        className="custom-modal" // Aplica estilos personalizados al modal
        overlayClassName="custom-overlay" // Aplica estilos personalizados al fondo del modal
      >
          {/* Contenido de la ventana emergente */}
          <h2>Detalles de la Cita</h2>
          <table>
            <tbody>
              <tr>
                <td>Nombre Paciente:</td>
                <td>{selectedCita.nombre_paciente} {selectedCita.apellido_paciente}</td>
              </tr>
              <tr>
                <td>Fecha y Hora:</td>
                <td>{formatearFechaHora(selectedCita.fecha_hora)}</td>
              </tr>
              <tr>
                <td>Doctor:</td>
                <td>{selectedCita.nombre_doctor} {selectedCita.apellido_doctor}</td>
              </tr>
              <tr>
                <td>Especialidad:</td>
                <td>{selectedCita.especialidad}</td>
              </tr>
            </tbody>
          </table>

          <h2>Observaciones y Receta</h2>
          <label>Observaciones:</label>
          <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />

          <label>Receta:</label>
          <textarea value={receta} onChange={(e) => setReceta(e.target.value)} />

          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={handleCloseModal}>Cerrar</button>
        </Modal>
      )}
    </>
  );
}
