import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../store/user/userSlice";

export const useAddTodoFormLogic = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const todoResponse = useSelector((state) => state.users.todoResponse);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && selectedUser) {
      dispatch(
        addTodo({
          userId: selectedUser.id,
          title,
          completed,
        })
      );
      setTitle("");
      setCompleted(false);
    }
  };
  return {
    handleSubmit,
    todoResponse,
    selectedUser,
    completed,
    title,
    setTitle,
    setCompleted,
  };
};
