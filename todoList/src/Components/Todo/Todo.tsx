// Import necessary components from React library
import { Key, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { FaRegTrashCan } from "react-icons/fa6";
import { TfiPencilAlt } from "react-icons/tfi";

// ------------- TodoItem Interface START-----------------------
// Define interface for TodoItem objects
// Interface specifies the structure of each todo item with its properties
interface TodoItem {
  id: Key; // Unique identifier for the todo item
  todo: string; // The text content of the todo item
  isCompleted: boolean; // Flag indicating if the todo item is completed or not
}
// --------------TodoItem Interface END-----------------------

// ------------------Todo Component -----------------------
// Create a React functional component named Todo
const Todo = () => {

  // ------------ State Variables START----------------------
  // Initialize state variables using useState hook
  // Variables used to manage the component's internal state
  const [input, setInput] = useState(""); // Stores the current text entered in the input field
  const [list, setList] = useState<TodoItem[]>([]); // Stores the list of todo items
  // New state variables for editing functionality
  const [editingId, setEditingId] = useState<Key>("");
  const [editingText, setEditingText] = useState("");  // Stores the current text for the todo item being edited
  // ------------ State Variables END------------------------

  // -------------Functions START -----------------------
  // Function to add a new todo item
  const addTodo = (newItem: string) => {
    // Create a new todo item object with a random ID, the new todo text, and a 'false' isCompleted flag
    const newTodo: TodoItem = {
      id: Math.random(),
      todo: newItem,
      isCompleted: false,
    };

     // Update the list state by adding the new todo item to the existing list using spread operator (...)
    setList([...list,newTodo]);

    setInput(""); // Clear the input field after adding the todo
  };

// Function to delete a todo item
const deleteTodo = (id: Key) => {
  // Filter the existing list to keep only items where the ID doesn't match the one to be deleted
  const updatedList = list.filter((item) => item.id !== id);

 // Update the list state with the filtered list (without the deleted item)
setList(updatedList);
};

// Function to toggle the completion state of a todo item
const toggleComplete = (id: Key) => {

  // Map over the existing list to create a new list with updated completion flags
  const updatedList = list.map((item) =>

     // If item's ID matches the one for completion toggle, update its isCompleted flag to the opposite value
      // If not, keep the item the same
    item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
  );

  // Update the list state with the newly created list containing the updated completion flag
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
// ----------------------- Functions END -----------------------

  // Return the JSX representing the Todo component's UI
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
          <button className="addButton" onClick={() => input ? addTodo(input) : null}>
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

