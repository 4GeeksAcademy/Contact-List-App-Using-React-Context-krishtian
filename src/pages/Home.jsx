import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  console.log("🏠 Home.jsx cargado correctamente");

  
  const getContacts = async () => {
    try {
      const resp = await fetch("https://playground.4geeks.com/contact/agendas/York/contacts");
      if (!resp.ok) throw new Error("Error al obtener contactos");

      const data = await resp.json();

      console.log("Datos de contactos desde la API:", data);

      
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  
  useEffect(() => {
    getContacts();
  }, []);

  
  const handleRefresh = () => getContacts();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contact List</h2>
        <Link to="/add" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} onDelete={handleRefresh} />
        ))
      ) : (
        <p className="text-center text-muted">No contacts found.</p>
      )}
    </div>
  );
};
