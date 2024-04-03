import React, {Component, useEffect, useState} from 'react';
import './styles.css'
import {deleteTodo, editTodo} from "../store/actions/todoList";
import {useDispatch, useSelector} from "react-redux";


const newAct = [
    {title:"Walk with a dog",id:"walking",value:"walking",name: "walk"},
    {title:"Swimming",id:"Swimming",value:"Swimming",name: "swim"}
]

function TodoList()  {
    const todos = useSelector(state => state.todo.todos)
    const dispatch = useDispatch()
    const [checkedItems, setCheckedItems] = useState(JSON.parse(localStorage.getItem('checkedItems')) || {});

    useEffect(() => {
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    }, [checkedItems]);


        const handleDeleteTodo = (id) => {
            dispatch(deleteTodo(id))
        }
        const onCheckChange = (id) => {
            const isCheckedItem = checkedItems[id]
            const updatedItems = {
                ...checkedItems,
                [id]: !isCheckedItem
            }
            setCheckedItems(updatedItems)
            localStorage.setItem('checkedItems',JSON.stringify(updatedItems))
        }

        return (
            <>
                {todos.map((item) =>
                    <div className={'cartTask'}>
                        <input type="checkbox" checked={item.checked} id ={item.id} value={item.value} name={item.name} onChange={() => onCheckChange(item.id)}/>
                        <label htmlFor={item.id}>{item.title}</label>
                        <button className={'btnList'} >Edit</button>
                        <button className={'btnList'} onClick={() =>handleDeleteTodo(item.id)}>Delete</button>
                    </div>
                )}
            </>
        );

}


export default TodoList;
