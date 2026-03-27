// import React, { createContext, useReducer, useContext, ReactNode, useEffect, AnyActionArg } from 'react';
// import { Filter, Todo } from '../types/todo.types';


// interface TodoContextType {
//   todos: Todo[];
//   filter: Filter;
//   addTodo: (text: string) => void;
//   toggleTodo: (id: string) => void;
//   deleteTodo: (id: string) => void;
//   setFilter: (filter: Filter) => void;
//   filteredTodos: Todo[];
// }

// const TodoContext = createContext<TodoContextType | undefined>(undefined);

// interface TodoProviderProps {
//   children: ReactNode;
// }

// export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
//   const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', []);
//   const [todos, dispatch] = useReducer(todoReducer, storedTodos);
//   const [filter, setFilter] = React.useState<Filter>('all');

//   useEffect(() => {
//     setStoredTodos(todos);
//   }, [todos, setStoredTodos]);

//   const addTodo = (text: string) => {
//     dispatch({ type: 'ADD', payload: text });
//   };

//   const toggleTodo = (id: string) => {
//     dispatch({ type: 'TOGGLE', payload: id });
//   };

//   const deleteTodo = (id: string) => {
//     dispatch({ type: 'DELETE', payload: id });
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === 'active') return !todo.completed;
//     if (filter === 'completed') return todo.completed;
//     return true;
//   });

//   return (
//     <TodoContext.Provider
//       value={{
//         todos,
//         filter,
//         addTodo,
//         toggleTodo,
//         deleteTodo,
//         setFilter,
//         filteredTodos,
//       }}
//     >
//       {children}
//     </TodoContext.Provider>
//   );
// };

// export const useTodos = () => {
//   const context = useContext(TodoContext);
//   if (context === undefined) {
//     throw new Error('useTodos must be used within a TodoProvider');
//   }
//   return context;
// };

// function todoReducer(prevState: any, ...args: AnyActionArg) {
//   throw new Error('Function not implemented.');
// }

export function TodoContext() {

}