import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [users, setUser] = useState([]);

  const loadUsers = async () => {
    const response = await axios.get("#");
    setUser(response.data);
  };

  useEffect(() => {
    loadUsers();
  });

  return (
    <div data-testid="user-page">
      {users.map((user) => (
        <Link to={`/user/${user.id}`} key={user.id} data-testid="user-item">
          {user.name}
        </Link>
      ))}
    </div>
  );
};

export default User;
