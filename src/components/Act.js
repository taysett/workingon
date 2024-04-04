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
    const [newTodo, setNewTodo] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        if (newTodoText.trim()) {
            const order = todos.length + 1;
            setNewTodo({
                title: newTodoText,
                id: Date.now() + Math.random(),
                value: newTodoText.toLowerCase(),
                name: newTodoText.toLowerCase(),
                order: order
            });
        } else {
            setNewTodo(null);
        }
    }, [newTodoText, todos]);

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

    const handleAddNewTodo = () => {
        if (newTodo) {
            dispatch(addTodo(newTodo));
            setNewTodoText("");
        }
    }

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    }

    const handleDragStart = (e, item) => {
        setCurrentItem(item);
    }

    const handleDragEnd = (e) => {
        e.target.style.background = 'white';
        setCurrentItem(null);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.target.style.background = 'lightgrey';
    }

    const handleDrop = (e, droppedItem) => {
        e.preventDefault();
        e.target.style.background = 'white';
        const draggedItemId = currentItem.id;
        const droppedItemId = droppedItem.id;
        const updatedTodos = todos.map(todo => {
            if (todo.id === draggedItemId) {
                return { ...todo, order: droppedItem.order };
            }
            if (todo.id === droppedItemId) {
                return { ...todo, order: currentItem.order };
            }
            return todo;
        });

        dispatch(updateTodosOrder(updatedTodos));
    }

    const sortItems = (a, b) => {
        if (!a || !b) return 0;
        return a.order > b.order ? 1 : -1;
    }

    return (
        <>
            <input type="text" value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
            <button className={'btnList'} onClick={handleAddNewTodo}>+</button>
            {todos.sort(sortItems).map((item) =>
                <div className={'cartTask'}
                     key={item.id}
                     draggable={true}
                     onDragStart={(e) => handleDragStart(e, item)}
                     onDragEnd={handleDragEnd}
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleDrop(e, item)}
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
        setInputValue('')
        localStorage.removeItem("message")
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