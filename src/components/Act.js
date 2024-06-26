import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodo, clearTodo, deleteTodo, editTodo, updateTodosOrder} from "../store/actions/todoList";
import './styles.css'


const List = ({ onCheckChange }) => {
    const dispatch = useDispatch();
    const [newTodoText, setNewTodoText] = useState("");
    const todos = useSelector(state => state.todo.todos);
    const [editItemId, setEditItemId] = useState(null);
    const [editText, setEditText] = useState("");
    const [currentItem, setCurrentItem] = useState(null);

    const handleAddNewTodo = () => {

        if (!newTodoText.trim()) return;
        const newTodo = {
            title: newTodoText,
            id: Date.now() + Math.random(),
            value: newTodoText.toLowerCase(),
            name: newTodoText.toLowerCase(),
        };
        dispatch(addTodo(newTodo));
        setNewTodoText("")
    }


    const handleEditTodo = (id) => {
        setEditItemId(id);
    }

    const handleSaveTodo = (id) => {
        dispatch(editTodo(id, editText));
        setEditItemId(null);
        setEditText("");
    }

    const saveWithEnter = (event, id) => {
        if (event.keyCode === 13) {
            dispatch(editTodo(id, editText));
            setEditItemId(null);
            setEditText("");
        }
    }



    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    }




    return (
        <>
            <input type="text" value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
            <button className={'btnList'} onClick={handleAddNewTodo}>+</button>
            {todos.map((item) =>
                <div className={'cartTask'}

                >

                    <input type="checkbox" checked={item.checked} id={item.id} onChange={() => onCheckChange(item.id)} />
                    {editItemId === item.id ? (
                        <>
                            <input type="text" onChange={(e) => setEditText(e.target.value)} onKeyDown={(e) => saveWithEnter(e, item.id)} />

                            <button className={'btnList'} onClick={() => handleSaveTodo(item.id)}>Save</button>

                        </>
                    ) : (
                        <>
                            <label htmlFor={item.id}>{item.title}</label>
                            <button className={'btnList'} onClick={() => handleEditTodo(item.id)}>Edit</button>
                        </>
                    )}
                    <button className={'btnList'} onClick={() => handleDeleteTodo(item.id)}>Delete</button>
                </div>
            )}
        </>
    );
}


const Login= (item) => {
    const [inputValue,setInputValue] = useState("")
    const dispatch = useDispatch()


    const handleClearTodo = (e) => {
        e.preventDefault()
        dispatch(clearTodo(item.id,{title: ''}))
        setInputValue(''); // Установка значения input
        localStorage.removeItem("message");

    }
const onChange = event => {
    const message = event.target.value
    localStorage.setItem("message",message)
    setInputValue(message)
}
    return (
        <form action="" id={"form1"}>
        <div  className={'cartTask'}>
            <input type="text" id ={item.id} value={inputValue} name={"login"} onChange={onChange}/>
            <label  htmlFor={item.id}>{item.title}</label>
            <button className={'btnList'} onClick={handleClearTodo} >Clear</button>
        </div>
        </form>
    );
}


function Act()  {
    const dispatch = useDispatch()
    const [checkedItems, setCheckedItems] = useState(JSON.parse(localStorage.getItem('checkedItems')) || {});


    useEffect(() => {
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    }, [checkedItems]);


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
        <div>
        <List
            onCheckChange={onCheckChange}/>
            <div>
                <Login />
            </div>
        </div>
    );
}

export default Act;