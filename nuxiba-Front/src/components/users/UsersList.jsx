import React from "react";
import Modal from "../Modals/Modal";
import UserDetails from "./UsersDetails";
import { useUserListLogic } from "./UserList.logic";
import { divUserList, liUserList } from "./UserListStyle";

const UsersList = () => {
  const {
    users,
    isUserModalOpen,
    handleUserClick,
    handleCloseUserModal,
    loading,
  } = useUserListLogic();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={divUserList}>
      <h2>Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
            style={liUserList}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
          >
            {user.id} - {user.name}
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
