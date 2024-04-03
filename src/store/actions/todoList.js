export const addTodo = element => {
    return {
        type: 'ADD_TODO',
        payload: element
    }
}

export const deleteTodo = id => {
    return {
        type: 'DELETE_TODO',
        payload: id
    }
}

export const editTodo = (id, newContent) => {
    return {
        type: 'EDIT_TODO',
        payload: {id,newContent}
    }
}
export const clearTodo = (id, newContent) => {
    return {
        type: 'CLEAR_TODO',
        payload: {id, newContent}
    }
}