import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import store from '../../redux/store.js';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addTodo, removeTodo } from './todoSlicer.js';

const Todo = () => {
    console.log('todo')
    const [input, setInput] = useState('')
    const count = useSelector( (state) => state.todo.count )
    const todos = useSelector( (state) => state.todo.todos)
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        console.log(addTodo);
        dispatch(addTodo(input));
        setInput('')
        console.log(count);
        console.log(todos)        
    }
    
    function removeItem(id) {
        dispatch(removeTodo(id));
        console.log("function removeItem");
    }

    const TodoItem = (props) => {
        const deleteItem = () => {
            props.onCheck(props.id)
        }
        return(
            <div onClick={deleteItem}>
                <label> {props.text} </label>
            </div>
        )
    }

    return(
        <>
            <h1> todo </h1>
            <form onSubmit={handleSubmit} >
                <input 
                    type="text" 
                    name="text-input"
                    value={input}
                    onInput={ (e) => setInput(e.target.value)}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                >
                    Add todo
                </Button>
            </form>
            <div>  
                <h2>List of todos</h2> 
                {todos.map( (item) => (
                    <TodoItem 
                        key={item.id}
                        text={item.text}
                        id={item.id}
                        onCheck={removeItem}
                    />
                    )
                )}
                
            </div>
        </>
    ) 
}

export default Todo