import { useEffect, useRef, useState } from "react";
import "./App.css";
import { type User } from "./types";
import UsersList from "./components/UsersList";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showColor, setShowColor] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = "https://randomuser.me/api?results=100";
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.results);
        originalUsers.current = data.results;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const toggleColor = () => {
    setShowColor(!showColor);
  };

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry);
  };

  const sortUsers = sortByCountry
    ? [...users].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : users;

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.login.uuid !== id));
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsers(
      originalUsers.current.filter((user) =>
        user.location.country
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <header
        style={{
          marginBlock: "2em",
          display: "flex",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        <button onClick={toggleColor}>
          {showColor ? "Ocultar Color" : "Mostrar Color"}
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "Revertir orden" : "Ordenar por pais"}
        </button>
        <button onClick={handleReset}>Revertir Borrados</button>
        <input
          type="text"
          placeholder="Filtrar por pais"
          onChange={handleChange}
        />
      </header>
      <main>
        <UsersList
          users={sortUsers}
          showColor={showColor}
          deleteUser={deleteUser}
        />
      </main>
    </div>
  );
};

export default App;
