import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, fetchUserTodos } from "../store/user/userSlice";
import AddTodoForm from "./AddTodoForm";

const UserDetails = () => {
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
