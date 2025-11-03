export const initialStore = () => {
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ],
    contacts: []
  };
};

export function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_task": {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        )
      };
    }

    case "set_contacts":
      return { ...store, contacts: action.payload };

    case "refresh_contacts":
      (async () => {
        try {
          const resp = await fetch(
            "https://playground.4geeks.com/contact/agendas/York/contacts"
          );
          if (!resp.ok) throw new Error("Error al refrescar contactos");
          const data = await resp.json();
          store.contacts = data.contacts;
        } catch (err) {
          console.error(err);
        }
      })();
      return { ...store };

    default:
      throw Error("Unknown action type.");
  }
}
