import React from "react";
import { Todo } from "../types/todo.types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onStartEdit,
}: TodoItemProps) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#696969",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          e.stopPropagation();
          onToggle(todo.id);
        }}
        style={{ cursor: "pointer" }}
      />
      <div
        style={{ flexGrow: 1, textAlign: "left", cursor: "pointer" }}
        onClick={() => onStartEdit(todo.id)}
      >
        <span
          style={{
            fontWeight: "bold",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.title}
        </span>
        <span style={{ marginLeft: "10px", color: "#DCDCDC" }}>
          {todo.date}
        </span>
      </div>
      <span
        style={{
          backgroundColor: "#343a40",
          color: "white",
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "0.8em",
          whiteSpace: "nowrap",
        }}
      >
        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
        style={{
          border: "1px solid red",
          backgroundColor: "white",
          color: "red",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex", // Added to align icon and text
          alignItems: "center", // Added to align icon and text
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={{ marginRight: "5px" }}
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
        Usuń
      </button>
    </li>
  );
}
