import { Key, useState } from "react";
interface TodoItem {
  id: Key | null | undefined;
  todo: string;
}


const Todo = () => {
  const [input, setInput] = useState("");

  const [list, setList] = useState<TodoItem[]>([]);

  const addTodo = (newItem: string) => {
    const newTodo: TodoItem = {
      id: Math.random(),
      todo: newItem,
    };
    setList([...list,newTodo]);
    setInput("");
  };

  return (
    <>
      <div className="myContainer">
        <div className="row">
          <h1>Todo List</h1>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="addButton" onClick={() => addTodo(input)}>
            Add
          </button>
        </div>

        <ul>
          {list.map((item) => (
            <li key={item.id}>
              {item.todo}
              <button>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
