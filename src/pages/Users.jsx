// src/pages/UsersPage.jsx
import "./Users.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nombre: '', apellido: '', estado: 'nuevo' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      setMessage('Error al obtener los usuarios.');
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    if (!newUser.nombre || !newUser.apellido) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users`, {
        ...newUser,
        fechaCreacion: new Date().toISOString().split('T')[0],
      });
      setUsers([...users, response.data]);
      setMessage('Usuario creado exitosamente.');
      setNewUser({ nombre: '', apellido: '', estado: 'nuevo' });
    } catch (error) {
      setMessage('Error al crear el usuario.');
      console.error('Error creating user:', error);
    }
  };

  const updateUserStatus = async (id, newStatus) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      setMessage('Usuario no encontrado.');
      return;
    }

    try {
      await axios.put(`${API_URL}/users/${id}`, { ...user, estado: newStatus });
      setUsers(users.map((user) => (user.id === id ? { ...user, estado: newStatus } : user)));
      setMessage('Estado del usuario actualizado.');
    } catch (error) {
      setMessage('Error al actualizar el estado.');
      console.error('Error updating user status:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setMessage('Usuario eliminado.');
    } catch (error) {
      setMessage('Error al eliminar el usuario.');
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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

  return (
    <div className="app-container bg-light">
      <header className="bg-secondary text-white text-center py-4">
        <h1>Gestión de Usuarios</h1>
      </header>

      <div className="container mt-5">
        <CreateUserForm
          newUser={newUser}
          onInputChange={handleInputChange}
          onCreateUser={createUser}
        />

        {message && (
          <div className="alert alert-info" role="alert">
            {message}
          </div>
        )}

        <h2>Lista de Usuarios</h2>
        <UserList
          users={users}
          onUpdateStatus={updateUserStatus}
          onDeleteUser={deleteUser}
          getColorByStatus={getColorByStatus}
        />
      </div>
    </div>
  );
};

const CreateUserForm = ({ newUser, onInputChange, onCreateUser }) => (
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card p-4">
        <h2>Crear Usuario</h2>
        <form className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Nombre"
              value={newUser.nombre}
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="apellido"
              className="form-control"
              placeholder="Apellido"
              value={newUser.apellido}
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-6">
            <select
              name="estado"
              className="form-select"
              value={newUser.estado}
              onChange={onInputChange}
            >
              <option value="nuevo">Nuevo</option>
              <option value="pendiente">Pendiente</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </div>
          <div className="col-md-6">
            <button type="button" className="btn btn-primary" onClick={onCreateUser}>
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const UserList = ({ users, onUpdateStatus, onDeleteUser, getColorByStatus }) => (
  <>
    {users.length > 0 ? (
      <div className="list-group mt-3">
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
                onClick={() => onUpdateStatus(user.id, 'pendiente')}
              >
                Pendiente
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={() => onUpdateStatus(user.id, 'bloqueado')}
              >
                Bloqueado
              </button>
              <button className="btn btn-danger" onClick={() => onDeleteUser(user.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No hay usuarios disponibles.</p>
    )}
  </>
);

export default UsersPage;
