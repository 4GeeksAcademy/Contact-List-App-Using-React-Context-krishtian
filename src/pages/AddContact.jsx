import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    agenda_slug: "York",
  });

  useEffect(() => {
  if (id) {
    fetch("https://playground.4geeks.com/contact/agendas/York/contacts")
      .then((res) => res.json())
      .then((data) => {
        const found = data.contacts.find((c) => c.id === parseInt(id));
        if (found) {
          setContact({
            name: found.name || "",
            email: found.email || "",
            phone: found.phone || "",
            address: found.address || "",
            agenda_slug: "York",
          });
        } else {
          console.error("❌ Contacto no encontrado en la agenda York");
        }
      })
      .catch((err) => console.error("❌ Error al cargar contacto:", err));
  }
}, [id]);
 
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = id
        ? `https://playground.4geeks.com/contact/agendas/York/contacts/${id}`
        : "https://playground.4geeks.com/contact/agendas/York/contacts";

      const method = id ? "PUT" : "POST";

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (!resp.ok) throw new Error("Error al guardar contacto");

      dispatch({ type: "refresh_contacts" });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Contact" : "Add New Contact"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={contact.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update Contact" : "Save Contact"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate("/")}
        >
          Back to Contacts
        </button>
      </form>
    </div>
  );
};
