import React from 'react';
import { useAuth } from "../hooks/UseAuth";
import { FaUserCircle } from "react-icons/fa";

const Account = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-md shadow-sm">
          <p className="text-center text-gray-600">No estás logueado</p>
        </div>
      </div>
    );
  }

  return (
<div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-2rem)]">
  <div className="flex flex-col items-center p-6 bg-white rounded-md shadow-sm">
    <FaUserCircle size={60} className="text-gray-400 mb-4" />

    <h2 className="text-xl font-medium text-gray-800">
      {`${user.firstname} ${user.lastname}`}
    </h2>

    <p className="text-sm text-gray-500">{user.email}</p>
  </div>
</div>

  );
};

export default Account;
