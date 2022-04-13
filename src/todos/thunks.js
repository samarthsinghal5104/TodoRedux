import {
  completeTodo,
  createTodo,
  loadTodosFailure,
  loadTodosInProgress,
  loadTodosSuccess,
  removeTodo,
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();
    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodosRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: { "Content-type": "application/json" },
      method: "post",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};
export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete",
    });
    const deleteTodo = await response.json();
    dispatch(removeTodo(deleteTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const markAsCompletedRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      {
        method: "post",
      }
    );
    const completedTodo = await response.json();
    dispatch(completeTodo(completedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};
export const displayAlert = (text) => () => {
  alert(`${text}`);
};
