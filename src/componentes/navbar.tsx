import { Link } from 'react-router-dom';
import Logo from '../componentes/Imagenes/logo.png';

export function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#00BFFF', fontStyle: 'italic' }}>
                <img src={Logo} style={{ width: '175px', height: '90px' }} alt="Logo de la clínica dental" />
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/citas" style={{ color: '#fff', fontWeight: 'bold', marginRight: '20px', borderBottom: '2px solid #fff' }}>
                                    Citas
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
