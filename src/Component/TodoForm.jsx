import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoForm() {
    const [todo,setTodo]=useState('');
    const [isEmpty,setIsEmpty]=useState(false);
    const {addTodo}=useTodo()

    const add=(e)=>{
        e.preventDefault()
        if(!todo){
            setIsEmpty(true)
            return
        } 
        addTodo({todo:todo,completed:false})
        setTodo('')
        e.target.reset();
    }
  return (
    <form onSubmit={add} action="">
        <div className="d-flex mb-2 py-1">
            <input type="text" className={`form-control ${isEmpty?'border  border-3 border-danger':''}`}  onChange={(e)=>setTodo(e.target.value)} />
            <button type='submit' className='btn btn-primary '>Add</button>
        </div>
    </form>
  )
}

export default TodoForm