import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/York/contacts");
        if (!resp.ok) throw new Error("Error al cargar contactos");
        const data = await resp.json();
        dispatch({ type: "set_contacts", payload: data.contacts });
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add">
          <button className="btn btn-success">Add new contact</button>
        </Link>
      </div>
      {store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      ) : (
        <p>No hay contactos disponibles.</p>
      )}
    </div>
  );
};
