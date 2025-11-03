import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import avatar from "../assets/img/rigo-baby.jpg";

export const ContactCard = ({ contact, onDelete }) => {
  const { dispatch } = useGlobalReducer();

  const deleteContact = async () => {
  const confirmDelete = window.confirm("¿Seguro que deseas eliminar este contacto?");
  if (!confirmDelete) return;
  try {
    const resp = await fetch(
      `https://playground.4geeks.com/contact/agendas/York/contacts/${contact.id}`,
      {
        method: "DELETE",
      }
    );
    if (!resp.ok) throw new Error("Error al eliminar contacto");
    onDelete(); 
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="card mb-3 p-3">
      <div className="d-flex align-items-center">
        <img src={avatar} alt="avatar" className="rounded-circle me-3" width="100" />
        <div className="flex-grow-1">
          <h5>{contact.name || contact.full_name}</h5>
          <p className="mb-1"><i className="fa-solid fa-location-dot me-2"></i>{contact.address}</p>
          <p className="mb-1"><i className="fa-solid fa-phone me-2"></i>{contact.phone}</p>
          <p className="mb-1"><i className="fa-solid fa-envelope me-2"></i>{contact.email}</p>
        </div>
        <div>
          <Link to={`/edit/${contact.id}`}>
            <i className="fa-solid fa-pen-to-square me-3"></i>
          </Link>
          <i className="fa-solid fa-trash text-danger" role="button" onClick={deleteContact}></i>
        </div>
      </div>
    </div>
  );
};
