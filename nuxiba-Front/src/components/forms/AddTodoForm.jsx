import React from "react";
import {
  divAddTodo,
  formAddTodo,
  inputAddTodo,
  labelAddTodo,
} from "./AddTodoFormStyle";
import { useAddTodoFormLogic } from "./AddTodoForm.logic";

const AddTodoForm = () => {
  const {
    handleSubmit,
    todoResponse,
    selectedUser,
    completed,
    title,
    setTitle,
    setCompleted,
  } = useAddTodoFormLogic();

  if (!selectedUser) return null;

  return (
    <div style={divAddTodo}>
      {todoResponse && (
        <div>
          <h3>La respuesta es: </h3>
          <p style={{ textAlign: "center" }}>{JSON.stringify(todoResponse)}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} style={formAddTodo}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputAddTodo}
        />
        <label style={labelAddTodo}>
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
