import { Key, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { FaRegTrashCan } from "react-icons/fa6";
import { TfiPencilAlt } from "react-icons/tfi";
interface TodoItem {
  id: Key;
  todo: string;
  isCompleted: boolean;
}


const Todo = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<TodoItem[]>([]);
  const [editingId, setEditingId] = useState<Key>("");
  const [editingText, setEditingText] = useState("");

  const addTodo = (newItem: string) => {
    const newTodo: TodoItem = {
      id: Math.random(),
      todo: newItem,
      isCompleted: false,
    };

    setList([...list,newTodo]);
    setInput("");
  };

// Function to delete a todo item
const deleteTodo = (id: Key) => {
  const updatedList = list.filter((item) => item.id !== id);
setList(updatedList);
};


// Function to toggle the completion state of a todo item
const toggleComplete = (id: Key) => {
  const updatedList = list.map((item) =>
    item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
  );
  setList(updatedList);
};


const startEditing = (id: Key, text: string) => {
  setEditingId(id);
  setEditingText(text);
};

const stopEditing = () => {
  setEditingId("");
  setEditingText("");
};

const updateTodo = (id: Key) => {
  const updatedList = list.map((item) =>
  item.id === id ? { ...item, todo: editingText } : item
);
  
// Update the list state with the newly created list containing the updated todo text
setList(updatedList);
stopEditing();
};

  return (
    <>
      <div className="myContainer">
        <div className="row">
          <div className="col-1"></div>
          <h1>Todo List</h1>
          <input
            type="text"
            placeholder="Enter a task...."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="addButton" onClick={() => addTodo(input)}>
          <FcPlus size={15} />  Add
          </button>
        </div>
        <ul>
          
          {list.map((item) => (
            <li key={item.id}
            style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>     
            <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => toggleComplete(item.id)}
          />
          {editingId === item.id ? (
                <input
                  type="text"
                  width={50}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => stopEditing()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo(item.id);
                    } else if (e.key === "Escape") {
                      stopEditing();
                    }
                  }}
                />
              ) : (
                item.todo
              )}
              {/* <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => toggleComplete(item.id)}
              /> */}
              <button onClick={() => startEditing(item.id, item.todo)}>
              <TfiPencilAlt color="blue" size={20}/>
              </button>
              <button onClick={() => deleteTodo(item.id)}>
                <FaRegTrashCan color="red" size={20} />
                </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;

