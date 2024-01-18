import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoItem({todo}) {
    const {updateTodo,toggleComplete,deleteTodo}=useTodo()
    const [todoMsg,setTodoMsg]=useState(todo.todo);
    const [todoEditable,setTodoEditable]=useState(false)

    const editTodo=()=>{
        updateTodo(todo.id,{...todo, todo: todoMsg})
        setTodoEditable(false)
    }

    const toggleCompleted=()=>{
        toggleComplete(todo.id)
    }
  return (
    <div className={`d-flex py-2 px-2 gap-3 rounded-2 ${todo.completed?'bg-success':'bg-light' }`}>
        <input type="checkbox" name="" id="" checked={todo.completed} onChange={toggleCompleted} />
        <input type="text"
         className={`form-control ${todo.completed ? "text-decoration-line-through":""}`}
         readOnly={!todoEditable}
         value={todoMsg}
         onChange={(e)=>setTodoMsg(e.target.value)}
        />
        <button
        className='btn btn-primary btn-sm '
        onClick={()=>{
            if(todo.completed) return
            if(todoEditable){
                editTodo();
            }else{
                setTodoEditable((prev)=>!prev);
            }
        }}
        disabled={todo.completed}
        >
            {todoEditable?'Update':'Edit'}
        </button>

        <button
        className='btn btn-danger btn-sm '
        onClick={()=>deleteTodo(todo.id)}
        >Delete</button>
    
    </div>
  )
}

export default TodoItem