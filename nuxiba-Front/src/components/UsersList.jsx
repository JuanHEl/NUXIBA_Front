import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser, setTodoResponse } from "../store/user/userSlice";
import Modal from "./Modal";
import UserDetails from "./UsersDetails";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    dispatch(setTodoResponse(null));
    setIsUserModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: "5px",
        margin: "5px",
        border: "1px solid gray",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1",
      }}
    >
      <h2>Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
            style={{
              padding: "10px",
              margin: "5px 0",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "18px",
              color: "#333",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
          >
            {user.name}
          </li>
        ))}
      </ul>

      <Modal isOpen={isUserModalOpen} onClose={handleCloseUserModal}>
        <UserDetails />
      </Modal>
    </div>
  );
};

export default UsersList;
