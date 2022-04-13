import {
  CREATE_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  LOAD_TODOS_FAILURE,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
} from "./actions";

const initialState = { isLoading: false, data: [] };

export const tasks = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return { ...state, data: state.data.concat(todo) };
    }
    case REMOVE_TODO: {
      const { todo: deleteTodo } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== deleteTodo.id),
      };
    }
    case COMPLETE_TODO: {
      const { todo: completedTodo } = payload;
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === completedTodo.id ? completedTodo : todo
        ),
      };
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return { ...state, isLoading: false, data: todos };
    }
    case LOAD_TODOS_IN_PROGRESS: {
      return { ...state, isLoading: true };
    }
    case LOAD_TODOS_FAILURE: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
