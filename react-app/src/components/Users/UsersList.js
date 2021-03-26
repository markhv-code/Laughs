import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer"

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink className="text-xl hover:text-blue-joker" to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1 className="text-4xl p-2">User List: </h1>
      <ul className="pl-3">{userComponents}</ul>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

export default UsersList;
