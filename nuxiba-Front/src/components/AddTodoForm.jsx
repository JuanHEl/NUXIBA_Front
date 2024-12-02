import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/user/userSlice";

const AddTodoForm = () => {
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

  if (!selectedUser) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      {todoResponse&&
      <div>
        <h3>La respuesta es: </h3>
        <p style={{textAlign: "center"}}>{JSON.stringify(todoResponse)}</p>
      </div>
      }
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            width: "100%",
          }}
        />
        <label
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          Completada
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            style={{
              transform: "scale(1.2)",
            }}
          />
        </label>
        <button
          type="submit"
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Guardar tarea
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
