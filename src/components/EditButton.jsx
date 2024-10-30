import React from "react";
import { useNavigate } from "react-router-dom";

const EditButton = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // Redirige a la ruta que pasemos como prop
  };

  return (
    <button onClick={handleClick} className="edit-button">
      Edit
    </button>
  );
};

export default EditButton;
