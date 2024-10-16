import "./Users.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        nombre: '',
        apellido: '',
        estado: 'nuevo',
    });
    const [message, setMessage] = useState('');

    // Fetch users from the mock server
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL + '/users');
            setUsers(response.data);
        } catch (error) {
            setMessage('Error al obtener los usuarios.');
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post(API_URL + '/users', {
                ...newUser,
                fechaCreacion: new Date().toISOString().split('T')[0],
            });
            setUsers([...users, response.data]);
            setMessage('Usuario creado exitosamente.');
        } catch (error) {
            setMessage('Error al crear el usuario.');
        }
    };

    const updateUserStatus = async (id, newStatus) => {
        try {
            const user = users.find((user) => user.id === id);
            await axios.put(API_URL + `/users/${id}`, {
                ...user,
                estado: newStatus,
            });
            setUsers(users.map((user) => (user.id === id ? { ...user, estado: newStatus } : user)));
            setMessage('Estado del usuario actualizado.');
        } catch (error) {
            setMessage('Error al actualizar el estado.');
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
            setMessage('Usuario eliminado.');
        } catch (error) {
            setMessage('Error al eliminar el usuario.');
        }
    };

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    return (
        <div className="app-container bg-light"> {/* Applied the background color to the entire app */}
            <header className="bg-secondary text-white text-center py-4">
                <h1>Gestión de Usuarios</h1>
            </header>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card p-4"> {/* White box for creating user */}
                            <h2>Crear Usuario</h2>
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Nombre"
                                        value={newUser.nombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="apellido"
                                        className="form-control"
                                        placeholder="Apellido"
                                        value={newUser.apellido}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <select
                                        name="estado"
                                        className="form-select"
                                        value={newUser.estado}
                                        onChange={handleInputChange}
                                    >
                                        <option value="nuevo">Nuevo</option>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="bloqueado">Bloqueado</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-primary" onClick={createUser}>
                                        Crear Usuario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* <div className="my-4">
                    <h2>Buscar Usuario por Nombre</h2>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nombre"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-outline-secondary" onClick={searchUsersByName}>
                            Buscar
                        </button>
                    </div>
                </div> */}

                {message && (
                    <div className="alert alert-info" role="alert">
                        {message}
                    </div>
                )}

                <h2>Lista de Usuarios</h2>
                {users.length > 0 ? (
                    <div className="list-group">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                style={{ backgroundColor: getColorByStatus(user.estado) }}
                            >
                                <div>
                                    <p>
                                        <strong>{user.nombre} {user.apellido}</strong> - Estado: {user.estado}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => updateUserStatus(user.id, 'pendiente')}
                                    >
                                        Pendiente
                                    </button>
                                    <button
                                        className="btn btn-danger me-2"
                                        onClick={() => updateUserStatus(user.id, 'bloqueado')}
                                    >
                                        Bloqueado
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay usuarios disponibles.</p>
                )}
            </div>
        </div>
    );
};

const getColorByStatus = (estado) => {
    switch (estado) {
        case 'nuevo':
            return 'lightgreen';
        case 'pendiente':
            return 'lightyellow';
        case 'bloqueado':
            return 'lightcoral';
        default:
            return 'white';
    }
};


export default UsersPage;