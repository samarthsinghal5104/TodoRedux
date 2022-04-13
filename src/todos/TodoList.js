import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";
import { loadTodos, removeTodoRequest, markAsCompletedRequest } from "./thunks";
import {
  getIsLoading,
  getTodos,
  getCompletedTodos,
  getInCompleteTodos,
} from "./selectors";

const TodoList = ({
  Completedtodos,
  InCompletetodos,
  isLoading,
  startLoadingTodos,
  onRemovePressed,
  onCompletePressed,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const isLoadingMessage = <div>Loading todos..</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      <h3>InComplete Todos</h3>
      {InCompletetodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
      <h3>Completed Todos</h3>
      {Completedtodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
    </div>
  );
  return isLoading ? isLoadingMessage : content;
};

const mapStateToProps = (state) => ({
  Completedtodos: getCompletedTodos(state),
  InCompletetodos: getInCompleteTodos(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletePressed: (id) => dispatch(markAsCompletedRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
