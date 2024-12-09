import React from "react";
import { useUserDetailsLogic } from "./UserDetails.logic";
import { duvUserDetail } from "./UserDetailsStyle";
import AddTodoForm from "../Forms/AddTodoForm";

const UserDetails = () => {
  const { posts, todos, selectedUser, selectedOption, setSelectedOption } =
    useUserDetailsLogic();

  if (!selectedUser) {
    return <div>Selecciona un usuario</div>;
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h3>Detalles del Usuario</h3>
        <p>Name: {selectedUser.name}</p>
        <p>Username: {selectedUser.username}</p>
        <p>Email: {selectedUser.email}</p>
      </div>

      <div style={duvUserDetail}>
        <button onClick={() => setSelectedOption("Todo")}>Todo</button>
        <button onClick={() => setSelectedOption("Post")}>Post</button>
        <button onClick={() => setSelectedOption("Tarea")}>
          Agregar Tarea
        </button>
      </div>

      {selectedOption == "Post" ? (
        <div>
          <h4>Posts</h4>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h5>{post.title}</h5>
                <ul>
                  {post.comments &&
                    post.comments.map((comment) => (
                      <li key={comment.id}>{comment.body}</li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : selectedOption == "Todo" ? (
        <div>
          <h4>Todos</h4>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.title} - {todo.completed ? "Completada" : "Pendiente"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        selectedOption == "Tarea" && <AddTodoForm />
      )}
    </div>
  );
};

export default UserDetails;
