import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setSelectedUser,
  setTodoResponse,
} from "../../store/user/userSlice";

export const useUserListLogic = () => {
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

  const getFetchUsers = async () => dispatch(fetchUsers());


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return {
    users,
    handleUserClick,
    isUserModalOpen,
    handleCloseUserModal,
    loading,
    getFetchUsers
  };
};
