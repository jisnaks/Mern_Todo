import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const App = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")
  const [editId, setEditId] = useState("");


  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  }
  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (editId) {
      const res = await axios.put(`http://localhost:5000/todos/${editId}`, { text });
      setTodos((todos.map((item) => item._id === editId ? res.data : item)));
      setEditId("")
      setText('')
    } else {
      const res = await axios.post("http://localhost:5000/todos", { text });
      setTodos([...todos, res.data]);
      setText("")
    }

  }

  const handleEdit = (id,currentText) => {
    setEditId(id);
    setText(currentText)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`); // Delete the item from the server
    setTodos(todos.filter((todo) => todo._id !== id)); // Update the state to exclude the deleted item
  };

  const handleToggle = async (id,completed) => {
    const res = await axios.put(`http://localhost:5000/todos/${id}`,{completed : !completed});
    setTodos(todos.map((todo)=> todo._id === id ? res.data : todo))
  }
  


  return (
    <div onSubmit={addTodo}>
      <h2 className="my-5">Todo App</h2>
      <div className="d-flex flex-column align-items-center">
        <form className="d-flex justify-content-center">
          <input type="text" className="form-control" value={text} placeholder="Add task" onChange={(e) => setText(e.target.value)} />
          <button className="btn btn-primary ms-2">{editId ? "Update" : "Add"}</button>
        </form>

        <ul>
          {
            todos.map((todo) => (
              <>
                <li className="my-4 bg-info-subtle px-4 py-2 rounded-2" key={todo._id} style={{ listStyle: 'none' }}>
                  <input type="checkbox"  checked={todo.completed} className="me-5" onChange={()=>handleToggle(todo._id,todo.completed)}/>
                  <span style={{textDecoration :  todo.completed ? 'line-through' : 'none'}}>{todo.text}</span>
                  <CiEdit className="ms-5" onClick={()=>handleEdit(todo._id, todo.text)} />
                  <MdDeleteOutline className="ms-3" onClick={()=>handleDelete(todo._id)} />
                </li>
              </>
            ))
          }
        </ul>

      </div>

    </div>

  );
};

export default App;
