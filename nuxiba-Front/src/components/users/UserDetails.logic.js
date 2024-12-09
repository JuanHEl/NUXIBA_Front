import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, fetchUserTodos } from "../../store/user/userSlice";

export const useUserDetailsLogic = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const posts = useSelector((state) => state.users.posts);
  const todos = useSelector((state) => state.users.todos);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchUserPosts(selectedUser.id));
      dispatch(fetchUserTodos(selectedUser.id));
    }
  }, [dispatch, selectedUser]);

  return {
    posts,
    todos,
    selectedUser,
    selectedOption,
    setSelectedOption,
  };
};
